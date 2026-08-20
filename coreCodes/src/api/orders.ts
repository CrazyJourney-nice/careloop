import express, { Request, Response } from 'express';
import { Order } from '../../packages/domain/src/models/Order';
import { OrderStatus } from '../../packages/domain/src/models/OrderStatus';
import { MenuItem } from '../../packages/domain/src/models/MenuItem';
import { Table } from '../../packages/domain/src/models/Table';
import { User } from '../../packages/domain/src/models/User';
import { Preference } from '../../packages/domain/src/models/Preference';
import { KitchenSimulator } from '../kitchen/index';
import { ConveyorSimulator } from '../conveyor/index';
import { IntentParser } from '../../packages/domain/src/voice/index';
import { IntentSchema, ModifierProfileSchema, type VoiceSession, type VoiceSessionStatus, modifiersToProfile, normalizeTranscript } from '../../packages/domain/src/voice/index';
import { broadcast } from './realtime';
import { randomUUID } from 'node:crypto';

export const router = express.Router();
export const users = new Map<string, User>();
export const tables = new Map<string, Table>();
export const menuItems = new Map<string, MenuItem>();
export const orders = new Map<string, Order>();
export const preferences = new Map<string, Preference>();
export const kitchen = new KitchenSimulator();
export const conveyor = new ConveyorSimulator();
export const events: Array<{ type:string; payload:unknown; at:string }> = [];
const staffSessions = new Map<string, { id:string; status:string; transcript:string; claimedBy:string|null; updatedAt:string; voiceSessionId?:string }>();
export const voiceSessions = new Map<string, VoiceSession>();
const idempotentOrders = new Map<string, Order>();
const parser = new IntentParser();

export function emit(type:string,payload:unknown){events.push({type,payload,at:new Date().toISOString()});broadcast(type,payload);}
function seed(){
  const zhang = new User({id:'USR-001',name:'张三',phone:'13800138000',isElder:false});
  const li = new User({id:'USR-002',name:'李阿姨',phone:'13900139000',isElder:true});
  const staff = new User({id:'USR-003',name:'王师傅',phone:'13700137000',isElder:false});
  [zhang,li,staff].forEach(u=>users.set(u.id,u));
  const tableSeed: Array<[string,string]> = [['TBL-A01','A01'],['TBL-A02','A02'],['TBL-A12','A12'],['TBL-B01','B01'],['TBL-B05','B05']];
  tableSeed.forEach(([id,n],i)=>tables.set(id,new Table({id, canteenId:'CAN001',tableNumber:n,capacity:i%2?4:6,area:n[0]})));
  const data:Array<[string,string,string,number,string]>=[['DISH-001','宫保鸡丁','Kung Pao chicken',680,'MAIN'],['DISH-002','清蒸鱼','Steamed fish',920,'MAIN'],['DISH-003','红烧肉','Braised pork',750,'MAIN'],['DISH-004','酸辣土豆丝','Hot-and-sour shredded potatoes',420,'SIDE'],['DISH-005','番茄炒蛋','Tomato and egg',520,'MAIN'],['DISH-006','西兰花炒虾仁','Broccoli with shrimp',890,'MAIN'],['DISH-007','小米粥','Millet congee',300,'DRINK'],['DISH-008','可乐','Cola',380,'DRINK']];
  data.forEach(([id,name,nameEn,price,category])=>menuItems.set(id,new MenuItem({id,canteenId:'CAN001',name,nameEn,description:`${name} Demo 菜品`,descriptionEn:`${nameEn} demo dish`,priceCents:Number(price),category:category as never,supportedModifiers:['少盐','少油','不辣','不加葱','不加姜']})));
  preferences.set('PREF-001',new Preference({id:'PREF-001',userId:'USR-002',type:'HEALTH',name:'少盐',severity:'WARNING',source:'USER'}));
}
seed();

function getOrder(id:string){const order=orders.get(id);if(!order)throw new Error('Order not found');return order;}
function advance(order:Order,status:OrderStatus,notes?:string){order.updateStatus(status,notes);emit('order.status_changed',order.toJSON());return order;}
export function preview(body:any){
  const table=tables.get(body.tableId) || [...tables.values()].find(t=>t.tableNumber===body.tableNumber);
  if(!table || !table.isAvailable()) throw new Error('A valid available table is required');
  const items=(body.items||[]).map((raw:any)=>{
    const dish=menuItems.get(raw.dishId)||[...menuItems.values()].find(d=>d.name===raw.dishName);
    if(!dish||!dish.available)throw new Error('Dish is unavailable');
    const requested=Array.isArray(raw.modifiers)?raw.modifiers:[];
    const unsupported=requested.filter((modifier:unknown)=>typeof modifier!=='string'||!dish.supportedModifiers.includes(modifier));
    if(unsupported.length)throw new Error(`${dish.name} does not support: ${unsupported.join(', ')}`);
    const modifiers=Array.isArray(raw.modifiers)?modifiersToProfile(raw.modifiers):ModifierProfileSchema.parse(raw.modifiers||{});
    const specialInstructions=String(raw.specialInstructions||'').trim();
    if(specialInstructions.length>80)throw new Error('Special instructions must be 80 characters or fewer');
    return {dishId:dish.id,dishNameSnapshot:dish.name,unitPriceCents:dish.priceCents,quantity:Math.max(1,Number(raw.quantity||1)),modifiers,allergenWarnings:raw.allergenWarnings||{},specialInstructions:specialInstructions||undefined};
  });
  if(!items.length)throw new Error('At least one item is required');
  return {tableId:table.id,tableNumber:table.tableNumber,items,totalCents:items.reduce((sum:any,i:any)=>sum+i.unitPriceCents*i.quantity,0),paymentMethods:['WECHAT','ALIPAY','CASH']};
}

router.get('/health',(_req,res)=>res.json({status:'ok',version:'0.1.0'}));
router.post('/auth/request-code',(req,res)=>res.json({phone:req.body.phone,code:'123456',demo:true}));
router.post('/auth/verify-code',(req,res)=>{const user=[...users.values()].find(u=>u.phone===req.body.phone)||[...users.values()][0];res.json({token:`demo-${user.id}`,user:user.toJSON()});});
router.get('/users/me',(_req,res)=>res.json(users.get('USR-002')!.toJSON()));
router.get('/users/me/preferences',(_req,res)=>res.json([...preferences.values()].map(p=>p.toJSON())));
router.get('/canteens',(_req,res)=>res.json([{id:'CAN001',name:'试点食堂 A',address:'Demo 校园社区食堂',status:'OPEN',operatingHours:'11:00-14:00,17:00-21:00'}]));
router.get('/canteens/CAN001',(_req,res)=>res.json({id:'CAN001',name:'试点食堂 A',address:'Demo 校园社区食堂',status:'OPEN',latitude:22.3193,longitude:114.1694}));
router.get('/canteens/CAN001/tables',(_req,res)=>res.json([...tables.values()].map(t=>t.toJSON())));
router.get('/canteens/CAN001/menu',(_req,res)=>res.json([...menuItems.values()].filter(d=>d.available).map(d=>d.toJSON())));
router.get('/canteens/CAN001/dishes/:dishId',(req,res)=>{const dish=menuItems.get(req.params.dishId);if(!dish)return res.status(404).json({error:'Dish not found'});res.json(dish.toJSON());});
router.get('/orders',(_req,res)=>res.json([...orders.values()].map(o=>o.toJSON())));
router.get('/orders/:id',(req,res)=>{try{res.json(getOrder(req.params.id).toJSON());}catch(e:any){res.status(404).json({error:e.message});}});
router.post('/orders/preview',(req,res)=>{try{res.json(preview(req.body));}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders',(req,res)=>{try{const key=String(req.header('Idempotency-Key')||req.body.id||'');if(key&&idempotentOrders.has(key))return res.status(200).json(idempotentOrders.get(key)!.toJSON());const p=preview(req.body);const proxy=Boolean(req.body.forOthers);const order=new Order({id:req.body.id||`ORD-${Date.now()}`,canteenId:'CAN001',createdByUserId:proxy?'USR-001':'USR-002',customerUserId:proxy?'USR-002':'USR-002',payerUserId:req.body.payerUserId||undefined,tableId:p.tableId,source:proxy?'FOR_OTHERS':req.body.source||'SELF',status:proxy?OrderStatus.PENDING_CONFIRMATION:OrderStatus.DRAFT,paymentMethod:req.body.paymentMethod,language:req.body.language||'zh-CN',voiceTranscript:req.body.voiceTranscript,specialInstructions:req.body.specialInstructions,items:p.items});orders.set(order.id,order);if(key)idempotentOrders.set(key,order);emit('order.created',order.toJSON());res.status(201).json(order.toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/confirm',(req,res)=>{try{const o=getOrder(req.params.id);if(o.status===OrderStatus.PENDING_CONFIRMATION||o.status===OrderStatus.DRAFT)advance(o,OrderStatus.CONFIRMED,'User confirmation');if(req.body.paymentMethod==='CASH')advance(o,OrderStatus.PAY_AT_COUNTER);else advance(o,OrderStatus.PAID);advance(o,OrderStatus.SENT_TO_KITCHEN);const task=kitchen.create(o.id);emit('kitchen.task_created',task);res.json({...o.toJSON(),kitchenTask:task});}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/reject',(req,res)=>{try{res.json(advance(getOrder(req.params.id),OrderStatus.REJECTED,'Recipient rejected').toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/cancel',(req,res)=>{try{res.json(advance(getOrder(req.params.id),OrderStatus.CANCELLED,'Cancelled').toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/payment-intent',(req,res)=>{try{const o=getOrder(req.params.id);o.paymentMethod=req.body.paymentMethod;res.json(o.toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/voice-preview',(req,res)=>{const intent=parser.parse(req.body.text||'',req.body.language||'zh-CN',{asrConfidence:req.body.asrConfidence,alternatives:req.body.alternatives,menu:[...menuItems.values()].filter(d=>d.available).map(d=>d.name)});res.json({intent,confirmed:false});});
function getVoiceSession(id:string){const session=voiceSessions.get(id);if(!session)throw new Error('Voice session not found');if(new Date(session.expiresAt).getTime()<Date.now()&&session.status!=='EXPIRED'){session.status='EXPIRED';session.updatedAt=new Date().toISOString();}if(session.status==='EXPIRED')throw new Error('VOICE_SESSION_EXPIRED');return session;}
router.post('/voice/sessions',(req,res)=>{const now=new Date();const session:VoiceSession={id:`VS-${randomUUID()}`,userId:req.body.userId||'USR-002',deviceType:req.body.deviceType||'MOBILE',language:req.body.language==='zh-HK'?'zh-HK':req.body.language==='en-US'?'en-US':'zh-CN',status:'ACTIVE',rawTranscript:'',normalizedText:'',asrConfidence:0,intentConfidence:0,candidateSnapshot:[],expiresAt:new Date(now.getTime()+24*60*60*1000).toISOString(),createdAt:now.toISOString(),updatedAt:now.toISOString()};voiceSessions.set(session.id,session);emit('voice.session_started',session);res.status(201).json(session);});
router.post('/voice/sessions/:id/preview',(req,res)=>{try{const session=getVoiceSession(req.params.id);const rawText=String(req.body.rawText??req.body.text??'');const intent=IntentSchema.parse(parser.parse(rawText,session.language,{asrConfidence:Number(req.body.asrConfidence??0.96),alternatives:req.body.alternatives,menu:[...menuItems.values()].filter(d=>d.available).map(d=>d.name)}));session.rawTranscript=rawText;session.normalizedText=normalizeTranscript(rawText);session.asrConfidence=intent.asrConfidence;session.intentConfidence=intent.confidence;session.intentSnapshot=intent;session.candidateSnapshot=intent.candidates;session.status='PREVIEW_READY';session.updatedAt=new Date().toISOString();emit('voice.preview_ready',{sessionId:session.id,intent});res.json({session,intent,confirmed:false});}catch(e:any){res.status(400).json({error:e.message,code:e.message==='VOICE_SESSION_EXPIRED'?'VOICE_SESSION_EXPIRED':'VOICE_PREVIEW_FAILED'});}});
router.get('/voice/sessions/:id',(req,res)=>{try{res.json(getVoiceSession(req.params.id));}catch(e:any){res.status(404).json({error:e.message});}});
router.post('/voice/sessions/:id/corrections',(req,res)=>{try{const session=getVoiceSession(req.params.id);if(session.status!=='PREVIEW_READY'&&session.status!=='STAFF_ASSIST')return res.status(409).json({error:'Voice preview is not editable'});const intent=IntentSchema.parse({...session.intentSnapshot,...req.body.intent,needsConfirmation:true});session.intentSnapshot=intent;session.candidateSnapshot=intent.candidates;session.updatedAt=new Date().toISOString();emit('voice.correction_saved',{sessionId:session.id,intent});res.json({session,intent});}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/voice/sessions/:id/request-staff',(req,res)=>{try{const session=getVoiceSession(req.params.id);const staff={id:`STAFF-${randomUUID()}`,status:'NEEDS_STAFF',transcript:session.rawTranscript,claimedBy:null,updatedAt:new Date().toISOString(),voiceSessionId:session.id};staffSessions.set(staff.id,staff);session.status='STAFF_ASSIST';session.staffSessionId=staff.id;session.updatedAt=new Date().toISOString();emit('voice.staff_requested',{sessionId:session.id,staffSession:staff});emit('staff.session_updated',staff);res.status(201).json({session,staffSession:staff});}catch(e:any){res.status(400).json({error:e.message});}});
router.delete('/voice/sessions/:id',(req,res)=>{const session=voiceSessions.get(req.params.id);if(!session)return res.status(404).json({error:'Voice session not found'});voiceSessions.delete(req.params.id);res.status(204).send();});
router.get('/staff/sessions',(_req,res)=>res.json([...staffSessions.values()]));
router.post('/staff/sessions',(req,res)=>{const session={id:`STAFF-${Date.now()}`,status:'NEEDS_STAFF',transcript:req.body.transcript||'',claimedBy:null,updatedAt:new Date().toISOString()};staffSessions.set(session.id,session);emit('staff.session_updated',session);res.status(201).json(session);});
router.post('/staff/sessions/:id/claim',(req,res)=>{const s=staffSessions.get(req.params.id);if(!s)return res.status(404).json({error:'Session not found'});if(s.claimedBy&&s.claimedBy!=='USR-003')return res.status(409).json({error:'Session already claimed'});s.status='CLAIMED';s.claimedBy='USR-003';s.updatedAt=new Date().toISOString();emit('staff.session_updated',s);res.json(s);});
router.patch('/staff/sessions/:id',(req,res)=>{try{const s=staffSessions.get(req.params.id);if(!s)return res.status(404).json({error:'Session not found'});s.transcript=req.body.transcript??s.transcript;s.status=req.body.status??s.status;s.updatedAt=new Date().toISOString();emit('staff.session_updated',s);if(s.status==='SUBMITTED'&&s.voiceSessionId){const session=getVoiceSession(s.voiceSessionId);const intent=IntentSchema.parse(parser.parse(s.transcript,session.language,{asrConfidence:1,menu:[...menuItems.values()].filter(d=>d.available).map(d=>d.name)}));session.rawTranscript=s.transcript;session.normalizedText=normalizeTranscript(s.transcript);session.asrConfidence=1;session.intentConfidence=intent.confidence;session.intentSnapshot=intent;session.candidateSnapshot=intent.candidates;session.status='PREVIEW_READY';session.updatedAt=new Date().toISOString();const payload={sessionId:session.id,staffSessionId:s.id,transcript:s.transcript,intent};emit('staff.correction_submitted',payload);return res.json({staffSession:s,voiceSession:session,intent});}res.json({staffSession:s});}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/staff/sessions/:id/submit-order',(req,res)=>{const s=staffSessions.get(req.params.id);if(!s)return res.status(404).json({error:'Session not found'});s.status='SUBMITTED';res.json({session:s,message:'Staff order ready for user confirmation'});});
router.get('/staff/exceptions',(_req,res)=>res.json([...staffSessions.values()].filter(s=>s.status!=='SUBMITTED')));
router.get('/kitchen/tasks',(_req,res)=>res.json(kitchen.list()));
router.post('/kitchen/tasks/:id/start',(req,res)=>{try{const t=kitchen.update(req.params.id,'COOKING');const o=getOrder(t.orderId);advance(o,OrderStatus.COOKING);res.json(t);}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/kitchen/tasks/:id/complete',(req,res)=>{try{const t=kitchen.update(req.params.id,'READY');const o=getOrder(t.orderId);advance(o,OrderStatus.READY_FOR_DELIVERY);const cv=conveyor.create(o.id,tables.get(o.tableId)!.tableNumber);emit('conveyor.task_created',cv);res.json({kitchenTask:t,conveyorTask:cv});}catch(e:any){res.status(400).json({error:e.message});}});
router.get('/conveyor/tasks',(_req,res)=>res.json(conveyor.list()));
router.post('/conveyor/tasks/:id/dispatch',(req,res)=>{try{const t=conveyor.update(req.params.id,'IN_PROGRESS');const o=getOrder(t.orderId);advance(o,OrderStatus.DELIVERING);res.json(t);}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/conveyor/tasks/:id/deliver',(req,res)=>{try{const t=conveyor.update(req.params.id,'DELIVERED');const o=getOrder(t.orderId);advance(o,OrderStatus.DELIVERED);advance(o,OrderStatus.COMPLETED);res.json({conveyorTask:t,order:o.toJSON()});}catch(e:any){res.status(400).json({error:e.message});}});
router.get('/events',(_req,res)=>res.json(events));

export default router;
