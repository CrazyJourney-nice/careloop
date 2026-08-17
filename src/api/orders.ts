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
import { broadcast } from './realtime';

export const router = express.Router();
export const users = new Map<string, User>();
export const tables = new Map<string, Table>();
export const menuItems = new Map<string, MenuItem>();
export const orders = new Map<string, Order>();
export const preferences = new Map<string, Preference>();
export const kitchen = new KitchenSimulator();
export const conveyor = new ConveyorSimulator();
export const events: Array<{ type:string; payload:unknown; at:string }> = [];
const staffSessions = new Map<string, { id:string; status:string; transcript:string; claimedBy:string|null; updatedAt:string }>();
const parser = new IntentParser();

function emit(type:string,payload:unknown){events.push({type,payload,at:new Date().toISOString()});broadcast(type,payload);}
function seed(){
  const zhang = new User({id:'USR-001',name:'张三',phone:'13800138000',isElder:false});
  const li = new User({id:'USR-002',name:'李阿姨',phone:'13900139000',isElder:true});
  const staff = new User({id:'USR-003',name:'王师傅',phone:'13700137000',isElder:false});
  [zhang,li,staff].forEach(u=>users.set(u.id,u));
  const tableSeed: Array<[string,string]> = [['TBL-A01','A01'],['TBL-A02','A02'],['TBL-A12','A12'],['TBL-B01','B01'],['TBL-B05','B05']];
  tableSeed.forEach(([id,n],i)=>tables.set(id,new Table({id, canteenId:'CAN001',tableNumber:n,capacity:i%2?4:6,area:n[0]})));
  const data:Array<[string,string,number,string]>=[['DISH-001','宫保鸡丁',680,'MAIN'],['DISH-002','清蒸鱼',920,'MAIN'],['DISH-003','红烧肉',750,'MAIN'],['DISH-004','酸辣土豆丝',420,'SIDE'],['DISH-005','番茄炒蛋',520,'MAIN'],['DISH-006','西兰花炒虾仁',890,'MAIN'],['DISH-007','小米粥',300,'DRINK'],['DISH-008','可乐',380,'DRINK']];
  data.forEach(([id,name,price,category])=>menuItems.set(id,new MenuItem({id,canteenId:'CAN001',name,description:`${name} Demo 菜品`,priceCents:Number(price),category:category as never,supportedModifiers:['少盐','少油','不辣','不加葱','不加姜']})));
  preferences.set('PREF-001',new Preference({id:'PREF-001',userId:'USR-002',type:'HEALTH',name:'少盐',severity:'WARNING',source:'USER'}));
}
seed();

function getOrder(id:string){const order=orders.get(id);if(!order)throw new Error('Order not found');return order;}
function advance(order:Order,status:OrderStatus,notes?:string){order.updateStatus(status,notes);emit('order.status_changed',order.toJSON());return order;}
export function preview(body:any){
  const table=tables.get(body.tableId) || [...tables.values()].find(t=>t.tableNumber===body.tableNumber);
  if(!table || !table.isAvailable()) throw new Error('A valid available table is required');
  const items=(body.items||[]).map((raw:any)=>{const dish=menuItems.get(raw.dishId)||[...menuItems.values()].find(d=>d.name===raw.dishName);if(!dish||!dish.available)throw new Error('Dish is unavailable');return {dishId:dish.id,dishNameSnapshot:dish.name,unitPriceCents:dish.priceCents,quantity:Math.max(1,Number(raw.quantity||1)),modifiers:raw.modifiers||[],allergenWarnings:raw.allergenWarnings||{}};});
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
router.get('/canteens/CAN001/menu',(_req,res)=>res.json([...menuItems.values()].map(d=>d.toJSON())));
router.get('/canteens/CAN001/dishes/:dishId',(req,res)=>{const dish=menuItems.get(req.params.dishId);if(!dish)return res.status(404).json({error:'Dish not found'});res.json(dish.toJSON());});
router.get('/orders',(_req,res)=>res.json([...orders.values()].map(o=>o.toJSON())));
router.get('/orders/:id',(req,res)=>{try{res.json(getOrder(req.params.id).toJSON());}catch(e:any){res.status(404).json({error:e.message});}});
router.post('/orders/preview',(req,res)=>{try{res.json(preview(req.body));}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders',(req,res)=>{try{const p=preview(req.body);const proxy=Boolean(req.body.forOthers);const order=new Order({id:req.body.id||`ORD-${Date.now()}`,canteenId:'CAN001',createdByUserId:proxy?'USR-001':'USR-002',customerUserId:proxy?'USR-002':'USR-002',payerUserId:req.body.payerUserId||undefined,tableId:p.tableId,source:proxy?'FOR_OTHERS':req.body.source||'SELF',status:proxy?OrderStatus.PENDING_CONFIRMATION:OrderStatus.DRAFT,paymentMethod:req.body.paymentMethod,language:req.body.language||'zh-CN',specialInstructions:req.body.specialInstructions,items:p.items});orders.set(order.id,order);emit('order.created',order.toJSON());res.status(201).json(order.toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/confirm',(req,res)=>{try{const o=getOrder(req.params.id);if(o.status===OrderStatus.PENDING_CONFIRMATION||o.status===OrderStatus.DRAFT)advance(o,OrderStatus.CONFIRMED,'User confirmation');if(req.body.paymentMethod==='CASH')advance(o,OrderStatus.PAY_AT_COUNTER);else advance(o,OrderStatus.PAID);advance(o,OrderStatus.SENT_TO_KITCHEN);const task=kitchen.create(o.id);emit('kitchen.task_created',task);res.json({...o.toJSON(),kitchenTask:task});}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/reject',(req,res)=>{try{res.json(advance(getOrder(req.params.id),OrderStatus.REJECTED,'Recipient rejected').toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/cancel',(req,res)=>{try{res.json(advance(getOrder(req.params.id),OrderStatus.CANCELLED,'Cancelled').toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/:id/payment-intent',(req,res)=>{try{const o=getOrder(req.params.id);o.paymentMethod=req.body.paymentMethod;res.json(o.toJSON());}catch(e:any){res.status(400).json({error:e.message});}});
router.post('/orders/voice-preview',(req,res)=>{const intent=parser.parse(req.body.text||'',req.body.language||'zh-CN');res.json({intent,confirmed:false});});
router.get('/staff/sessions',(_req,res)=>res.json([...staffSessions.values()]));
router.post('/staff/sessions',(req,res)=>{const session={id:`STAFF-${Date.now()}`,status:'NEEDS_STAFF',transcript:req.body.transcript||'',claimedBy:null,updatedAt:new Date().toISOString()};staffSessions.set(session.id,session);emit('staff.session_updated',session);res.status(201).json(session);});
router.post('/staff/sessions/:id/claim',(req,res)=>{const s=staffSessions.get(req.params.id);if(!s)return res.status(404).json({error:'Session not found'});s.status='CLAIMED';s.claimedBy='USR-003';s.updatedAt=new Date().toISOString();emit('staff.session_updated',s);res.json(s);});
router.patch('/staff/sessions/:id',(req,res)=>{const s=staffSessions.get(req.params.id);if(!s)return res.status(404).json({error:'Session not found'});s.transcript=req.body.transcript??s.transcript;s.status=req.body.status??s.status;s.updatedAt=new Date().toISOString();res.json(s);});
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
