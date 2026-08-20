import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "/Users/cj/careloop/output/Careloop_Maker_in_China_HK_2026_Detailed_Competition_Deck.pptx";
const BUILD = "/Users/cj/careloop/tmp/careloop_michk_2026/final_render";
const OLD16 = "/Users/cj/careloop/tmp/careloop_michk_2026/reference/careloop_old/page-16.jpg";
const OLD10 = "/Users/cj/careloop/tmp/careloop_michk_2026/reference/careloop_old/page-10.jpg";

const C = { navy:"#173A5E", teal:"#0F8B7A", coral:"#EF4B5A", warm:"#F7F4EF", ink:"#24313D", muted:"#65727E", pale:"#E8EEE9", white:"#FFFFFF", sand:"#EADFCC", lightBlue:"#DCE8EF", lightTeal:"#D9EEE9", lightCoral:"#F9DEE1", gray:"#D8DEE2", dark:"#102A43" };
const FONT = "PingFang SC";
const W=1280,H=720;

function box(slide,x,y,w,h,fill=C.white,line=C.gray,r=14,name="box"){
  return slide.shapes.add({geometry:r?"roundRect":"rect",name,position:{left:x,top:y,width:w,height:h},fill,line:{style:"solid",fill:line,width:1},borderRadius:r?"rounded-xl":undefined});
}
function text(slide,txt,x,y,w,h,size=22,color=C.ink,bold=false,align="left",name="text"){
  const s=slide.shapes.add({geometry:"textbox",name,position:{left:x,top:y,width:w,height:h},fill:"none",line:{style:"solid",fill:"none",width:0}});
  s.text=txt; s.text.style={fontFamily:FONT,fontSize:size,color,bold,alignment:align,verticalAlignment:"middle"};
  return s;
}
function line(slide,x,y,w,h,color=C.gray,width=2,name="line"){
  return slide.shapes.add({geometry:"rect",name,position:{left:x,top:y,width:w,height:h},fill:color,line:{style:"solid",fill:color,width:0}});
}
function circle(slide,label,x,y,d,fill,color=C.white,size=22){
  const s=slide.shapes.add({geometry:"ellipse",position:{left:x,top:y,width:d,height:d},fill,line:{style:"solid",fill,width:0}}); s.text=label; s.text.style={fontFamily:FONT,fontSize:size,bold:true,color,alignment:"center",verticalAlignment:"middle"}; return s;
}
function tag(slide,label,color=C.teal){
  const w=Math.max(110,label.length*9+32); const s=box(slide,W-64-w,H-42,w,24,color,color,10,"evidence-tag"); s.text=label; s.text.style={fontFamily:FONT,fontSize:11,bold:true,color:C.white,alignment:"center",verticalAlignment:"middle"};
}
function base(slide,num,title,section="CARELOOP · MICHK 2026"){
  slide.background.fill=C.warm;
  text(slide,section,56,24,540,22,12,C.teal,true,"left","section");
  text(slide,String(num).padStart(2,"0"),1180,24,44,22,12,C.muted,true,"right","page");
  text(slide,title,56,60,1168,68,36,C.navy,true,"left","title");
  line(slide,56,132,1168,2,C.navy,0,"title-rule");
}
function notes(slide,talk,seconds,sources=[]){
  slide.speakerNotes.textFrame.setText(`${talk}\n预计讲述：${seconds}\n\n[Sources]\n${sources.length?sources.map(s=>`- ${s}`).join("\n"):"- Internal planning / supplied Careloop materials; no external claim on this slide."}`);
  slide.speakerNotes.setVisible(true);
}
function labelValue(slide,label,value,x,y,w,accent=C.teal){
  text(slide,value,x,y,w,62,42,accent,true,"left","metric-value"); text(slide,label,x,y+62,w,44,16,C.muted,false,"left","metric-label");
}
function pill(slide,txt,x,y,w,fill=C.lightTeal,color=C.teal){ const s=box(slide,x,y,w,34,fill,fill,17,"label"); s.text=txt; s.text.style={fontFamily:FONT,fontSize:14,bold:true,color,alignment:"center",verticalAlignment:"middle"}; }
function card(slide,x,y,w,h,heading,body,accent=C.teal){ box(slide,x,y,w,h,C.white,C.gray,16); line(slide,x,y,8,h,accent,0); text(slide,heading,x+24,y+18,w-42,34,22,C.navy,true); text(slide,body,x+24,y+60,w-42,h-74,16,C.ink,false); }
function placeholder(slide,x,y,w,h,label,detail){ box(slide,x,y,w,h,"#F1EFEA",C.sand,18); text(slide,label,x+22,y+Math.max(20,h/2-36),w-44,34,21,C.coral,true,"center"); text(slide,detail,x+30,y+Math.max(58,h/2+2),w-60,42,14,C.muted,false,"center"); }
function addImage(slide,path,x,y,w,h,crop={left:0,top:0,right:0,bottom:0}){ return fs.readFile(path).then(bytes=>slide.images.add({blob:bytes,contentType:"image/jpeg",alt:"Source image from former Careloop deck",fit:"cover",crop,position:{left:x,top:y,width:w,height:h},geometry:"roundRect",borderRadius:"rounded-xl"})); }

const p=Presentation.create({slideSize:{width:W,height:H}});

// 01
{
 const s=p.slides.add(); s.background.fill=C.warm;
 text(s,"CARELOOP",58,46,400,32,17,C.teal,true); text(s,"把社区助餐升级成\n可持续照护服务节点",58,112,570,150,48,C.navy,true);
 text(s,"机器负责重复劳动，Careloop 让社区照护持续发生。",58,282,550,56,23,C.ink,false);
 pill(s,"Community Kitchen",58,368,174); pill(s,"Human Assist",244,368,148,C.lightCoral,C.coral); pill(s,"Family Connection",404,368,174,C.lightBlue,C.navy);
 text(s,"Current stage",58,454,160,26,14,C.muted,true); text(s,"software & interaction demo → engineering pilot",58,486,520,42,18,C.navy,true);
 await addImage(s,OLD16,660,54,564,520,{left:0,top:0.02,right:0,bottom:0.12});
 box(s,690,484,504,74,C.navy,C.navy,12); text(s,"[[待补：01_ui_hero.png]]",712,495,460,26,17,C.white,true,"center"); text(s,"替换为当前真实 UI Hero；保留按钮与订单状态可读",712,523,460,22,13,"#D9E7EF",false,"center");
 text(s,"Maker in China Hong Kong 2026",58,642,470,24,14,C.muted,true); tag(s,"VALIDATED / DEMO");
 notes(s,"我们不是再开一家食堂，也不是只做一台机器人；我们在做一套可复制进社区、由人接住异常的服务节点。","0:15",["Careloop v3 generation guide; former Careloop deck image used only as spatial concept reference."]);
}
//02
{
 const s=p.slides.add(); base(s,2,"老龄化不是未来问题：深圳已把长者助餐纳入基础服务");
 labelValue(s,"2025 年中国 60 岁及以上人口","3.2338 亿",66,184,330,C.coral); labelValue(s,"占全国人口","23.0%",470,184,230,C.teal); labelValue(s,"深圳符合条件长者每餐补贴上限","5 / 15 元",804,184,360,C.navy);
 line(s,66,320,1098,2,C.gray); text(s,"全国需求已发生",66,354,300,32,22,C.navy,true); text(s,"深圳政策已给出服务入口",470,354,330,32,22,C.navy,true); text(s,"南山已有设施形态与运营要求",804,354,360,32,22,C.navy,true);
 box(s,66,442,1098,116,C.navy,C.navy,12); text(s,"机会不是证明老人需要吃饭，\n而是让既有助餐体系更自动化、数字化、可协作。",104,458,1022,84,26,C.white,true,"center");
 text(s,"来源：国家统计局《2025 年国民经济和社会发展统计公报》；深圳市基本养老服务清单（2026 年版）",66,612,980,28,13,C.muted,false); tag(s,"EXTERNAL SOURCE");
 notes(s,"人口规模证明需求已发生，但创新点不是老龄化本身；关键是深圳已经把长者助餐写入基本养老服务。","0:20",["https://www.stats.gov.cn/xxgk/sjfb/tjgb2020/202602/t20260228_1962662.html","https://www.sz.gov.cn/ztfw/shbz/wyk_183996/content/post_12779745.html"]);
}
//03
{
 const s=p.slides.add(); base(s,3,"南山已有“助餐”，新的机会是增加智能协作层");
 box(s,62,170,470,410,C.lightBlue,C.lightBlue,20); text(s,"南山公开场景网络",92,196,410,36,24,C.navy,true); 
 const pts=[[130,288,"街道长者\n服务中心"],[330,268,"社区长者\n服务站"],[190,430,"养老驿站"],[375,445,"长者助餐点"]];
 for(const [x,y,l] of pts) circle(s,l,x,y,112,C.white,C.navy,16);
 line(s,236,334,94,3,C.teal); line(s,246,424,116,3,C.teal); line(s,386,374,3,70,C.teal);
 text(s,"现有助餐层",604,198,200,34,24,C.muted,true); line(s,604,242,520,8,C.gray); text(s,"订餐 · 堂食 · 配送",604,260,520,32,18,C.ink,false);
 text(s,"Careloop 智能服务层",604,334,340,34,26,C.teal,true); line(s,604,380,520,10,C.teal); const acts=["确认","调度","人工接管","记录"]; acts.forEach((a,i)=>pill(s,a,604+i*132,414,112,i===2?C.lightCoral:C.lightTeal,i===2?C.coral:C.teal));
 text(s,"Benchmark / potential pilot conversation\nNo Careloop partnership claimed",604,500,520,54,16,C.coral,true);
 tag(s,"EXTERNAL SOURCE / TO VALIDATE");
 notes(s,"南山适合作为验证场，不是因为我们已签约，而是因为助餐设施、社区养老站点和管理要求已经存在。","0:25",["https://www.szns.gov.cn/ztzl/nsqzcwdk/shbz/content/post_11961801.html","https://www.sz.gov.cn/szzt2010/szyl/ylfw/ylzcdcx/"]);
}
//04
{
 const s=p.slides.add(); base(s,4,"SHARE：共享的是整个社区的照护能力");
 circle(s,"Community\nCare Station",522,254,236,C.navy,C.white,25);
 const qs=[[88,186,"SHARE HARDWARE","共享自动化设备","降低单户设备负担"],[828,186,"SHARE SPACE","激活社区空间","把存量点位变成服务节点"],[88,420,"SHARE PEOPLE","释放工作人员","从重复劳动转向协作陪伴"],[828,420,"SHARE DATA","连接授权角色","共享订单、偏好、异常与结果"]];
 qs.forEach(([x,y,h,b,d],i)=>{card(s,x,y,344,142,h,`${b}\n${d}`,i===2?C.coral:C.teal);});
 text(s,"一台设备服务一个家庭很贵；一套能力服务一个社区，才有规模经济。",190,616,900,32,23,C.navy,true,"center"); tag(s,"CONCEPT / BUSINESS MODEL"); notes(s,"SHARE 不是情感口号，而是把硬件、空间、人员和数据放在社区尺度共享，从而形成规模经济。","0:20");
}
//05
{
 const s=p.slides.add(); base(s,5,"现有方案覆盖一段，Careloop 连接整条服务链");
 const cols=["传统助餐","复杂 App","家属代点","单一机器人","Careloop"];
 const rows=[["发起与确认","人工","门槛高","远程可发起","通常无家庭协作","语音/大按钮 + 确认"],["现场履约","可履约","通常不覆盖","依赖现场人员","擅长单一任务","订单状态驱动协作"],["异常与家庭连接","依赖经验","弱","家庭可见","通常断开","Human Assist + 记录"]];
 const x0=56,y0=182,labelW=150,cw=202,rh=100;
 cols.forEach((c,i)=>{const x=x0+labelW+i*cw;box(s,x,y0,cw-8,54,i===4?C.teal:C.gray,i===4?C.teal:C.gray,8);text(s,c,x+6,y0+8,cw-20,36,18,i===4?C.white:C.navy,true,"center");});
 rows.forEach((r,j)=>{text(s,r[0],x0,y0+70+j*rh,labelW-8,70,16,C.navy,true); for(let i=1;i<6;i++){const x=x0+labelW+(i-1)*cw;box(s,x,y0+64+j*rh,cw-8,82,i===5?C.lightTeal:C.white,C.gray,8);text(s,r[i],x+8,y0+72+j*rh,cw-24,66,15,i===5?C.teal:C.ink,i===5,"center");}});
 text(s,"Careloop 把用户、工作人员、厨房与家属放进同一订单闭环。",216,598,860,34,23,C.navy,true,"center"); tag(s,"ASSUMPTION / DIFFERENTIATION"); notes(s,"不说竞争方案做不到，而是说明它们通常只优化链路中的一段；Careloop 的差异是服务连续性。","0:25");
}
//06
{
 const s=p.slides.add(); base(s,6,"硬件、软件、人与数据组成一个 Community Care Station");
 const layers=[
  [C.lightBlue,C.navy,"01  HARDWARE","AICAN 数字烹饪设备 · 必要辅助设备"],
  [C.lightTeal,C.teal,"02  SERVICE SOFTWARE","Kitchen Control · Order State Engine · 四角色终端"],
  [C.lightCoral,C.coral,"03  INTERACTION & PEOPLE","语音 · 大按钮 · 代点 · 工作人员协作"],
  [C.navy,C.white,"04  DATA & OPERATIONS","订单 · 偏好 · 营养标签 · 异常 · 设备与运营指标"]
 ];
 layers.forEach((l,i)=>{box(s,92,174+i*100,1096,78,l[0],l[0],12);text(s,l[2],118,188+i*100,340,46,21,l[1],true);text(s,l[3],458,188+i*100,700,46,19,l[1],false);});
 text(s,"组合后的社区服务能力，才是产品。",296,602,688,36,27,C.navy,true,"center"); tag(s,"CURRENT DEMO + EXTERNAL SOURCE"); notes(s,"硬件、软件、人和数据都不是单独产品；四层组合后，才形成可进入社区的服务节点。","0:30",["AICAN public product manual: https://img.ach18.com/office/product/L3-5A0004306-%E8%AF%B4%E6%98%8E%E4%B9%A6%EF%BC%88%E8%8B%B1%E6%96%87%EF%BC%89.pdf"]);
}
//07
{
 const s=p.slides.add(); base(s,7,"把重复、危险、标准化的工作交给机器");
 const steps=["备餐","烹饪","装盘 / 传送","交付","清洁"]; const desc=["净菜与储存\n减少现场切配","温控/调味/菜谱流程\n降低标准化烹饪负担","轻量出餐设计\n减少往返","工作人员确认交付\n保留关怀触点","清洗与消毒 Gate\n未部署能力待验证"];
 steps.forEach((a,i)=>{const x=62+i*238; if(i<4) line(s,x+170,302,72,5,i===3?C.coral:C.teal); circle(s,String(i+1),x,270,62,i===4?C.coral:C.teal,C.white,22); text(s,a,x-10,350,190,32,22,C.navy,true,"center"); text(s,desc[i],x-10,394,190,82,15,C.ink,false,"center");});
 box(s,94,520,1092,70,C.navy,C.navy,12); text(s,"原则：机器减少厨房重复劳动；工作人员处理确认、异常与照护。",122,534,1036,42,23,C.white,true,"center");
 tag(s,"AICAN SOURCE / TO VALIDATE"); notes(s,"硬件页不做产品目录，只回答每个节点减少哪类人工、降低哪类风险。清洁和传送仍是待验证设计目标。","0:20",["AICAN public product manual: https://img.ach18.com/office/product/L3-5A0004306-%E8%AF%B4%E6%98%8E%E4%B9%A6%EF%BC%88%E8%8B%B1%E6%96%87%EF%BC%89.pdf"]);
}
//08
{
 const s=p.slides.add(); base(s,8,"AICAN 提供厨房基础能力，Careloop 增加社区服务层");
 box(s,62,172,444,382,C.lightBlue,C.lightBlue,18); text(s,"AICAN｜供应商公开能力",94,196,380,34,24,C.navy,true); text(s,"• 数字烹饪硬件\n• AICMOS / HMI\n• 菜谱与设备管理\n• 温控、调味、烹饪动作流程\n• 清洗等能力以具体型号与合同为准",94,256,360,220,19,C.ink,false);
 box(s,774,172,444,382,C.lightTeal,C.lightTeal,18); text(s,"CARELOOP｜社区服务层",806,196,380,34,24,C.teal,true); text(s,"• 老人 / 家属 / 工作人员 / 运营终端\n• Order State Engine\n• Human Assist\n• 社区 SOP 与服务记录\n• 合规的数据与运营反馈",806,256,360,220,19,C.ink,false);
 line(s,506,344,268,8,C.coral); circle(s,"API /\nSTATE",584,284,112,C.coral,C.white,18); text(s,"integration plan",532,420,216,28,16,C.coral,true,"center");
 text(s,"不主张 joint product / partnership；不从官网推导采购价。",260,594,760,30,18,C.coral,true,"center"); tag(s,"EXTERNAL SOURCE / INTEGRATION PLAN"); notes(s,"技术策略是接入成熟厨房自动化，而不是把供应商能力写成自研。合作、接口、SLA 与价格都要在正式文件中验证。","0:20",["AICAN public product manual: https://img.ach18.com/office/product/L3-5A0004306-%E8%AF%B4%E6%98%8E%E4%B9%A6%EF%BC%88%E8%8B%B1%E6%96%87%EF%BC%89.pdf"]);
}
//09
{
 const s=p.slides.add(); base(s,9,"Careloop 的软件核心，是一笔订单如何被接力完成");
 const states=["Created","Confirmed","Preparing","Ready","Collected","Completed"]; states.forEach((a,i)=>{const x=54+i*202;if(i<5) line(s,x+158,248,48,5,C.teal);box(s,x,218,158,66,i===0?C.navy:C.white,i===0?C.navy:C.teal,12);text(s,a,x+6,232,146,38,17,i===0?C.white:C.teal,true,"center");});
 text(s,"Order ID",68,334,160,26,15,C.muted,true); text(s,"intent / preference",260,334,190,26,15,C.muted,true); text(s,"preview & confirmation",472,334,220,26,15,C.muted,true); text(s,"task handoff",728,334,170,26,15,C.muted,true); text(s,"service record",976,334,180,26,15,C.muted,true);
 line(s,670,286,4,80,C.coral); line(s,670,362,180,4,C.coral); box(s,850,330,300,86,C.lightCoral,C.coral,14); text(s,"低置信度 / 异常",874,342,250,26,17,C.coral,true,"center"); text(s,"→ Human Assist queue",874,372,250,26,18,C.coral,true,"center");
 placeholder(s,96,470,326,112,"[[待补：老人端局部 UI]]","只显示发起与确认"); placeholder(s,477,470,326,112,"[[待补：工作人员队列]]","只显示异常接管"); placeholder(s,858,470,326,112,"[[待补：厨房状态 UI]]","只显示任务状态");
 tag(s,"VALIDATED / DEMO / TO VALIDATE"); notes(s,"核心不是聊天，而是把自然语言变成有 ID、可确认、可追踪、可由人接管的订单。","0:30");
}
//10
{
 const s=p.slides.add(); base(s,10,"四个终端：自己点、帮他点、接住异常、产生数据");
 const cs=[["老人端","自己点","语音 / 大按钮\n预览后确认",C.teal],["家属端","帮他点","远程代点\n查看状态与记录",C.navy],["工作人员端","接住异常","队列 / 偏好\n协作与人工接管",C.coral],["运营端","产生数据","订单趋势 / 设备\n菜单与人工介入",C.teal]];
 cs.forEach((c,i)=>{const x=56+i*304;box(s,x,176,276,390,C.white,C.gray,18);line(s,x,176,276,10,c[3]);text(s,c[0],x+22,208,232,30,20,C.navy,true,"center");placeholder(s,x+22,254,232,176,"[[待补真实 UI]]",`推荐素材：0${2+i}_ui_${["elder_voice","family","staff_queue","operations"][i]}.png`);text(s,c[1],x+22,448,232,32,25,c[3],true,"center");text(s,c[2],x+22,492,232,56,15,C.ink,false,"center");});
 tag(s,"VALIDATED / DEMO"); notes(s,"同一订单，四个角色只看到与自己行动相关的信息。这种角色化视图是社区运营落地的关键。","0:25");
}
//11
{
 const s=p.slides.add(); base(s,11,"从一句话到一顿饭，正常与失败路径都有人接住");
 const ss=[["1","说","老人发起需求"],["2","看","系统生成预览"],["3","确认","老人或家属确认"],["4","做","厨房 / 人员接任务"],["5","异常","AI 不确定 → Human Assist"],["6","完成","写入订单与服务记录"]];
 ss.forEach((a,i)=>{const x=46+i*203; if(i<5) line(s,x+148,268,60,5,i===3?C.coral:C.teal);circle(s,a[0],x+40,220,70,i===4?C.coral:C.teal,C.white,22);text(s,a[1],x,316,150,30,22,i===4?C.coral:C.navy,true,"center");text(s,a[2],x,354,170,56,15,C.ink,false,"center");});
 box(s,64,456,1152,108,C.navy,C.navy,14); text(s,"真正体现 Care 的，不是 AI 每次答对，\n而是 AI 不确定时有人接住。",96,474,640,74,27,C.white,true); text(s,"DEMO BACKUP",814,478,170,26,15,"#D9E7EF",true); text(s,"预录视频｜本地截图｜文字输入",814,512,330,26,17,C.white,true);
 text(s,"支付 / AICAN / 传送带如为 adapter，现场必须标 DEMO ADAPTER。",234,598,812,26,17,C.coral,true,"center"); tag(s,"DEMO / VALIDATED / ASSUMPTION"); notes(s,"现场用一笔订单演示正常路径，再故意触发一次低置信度，展示工作人员接管。视频失败时切换六张静态截图。","1:00–1:30");
}
//12
{
 const s=p.slides.add(); base(s,12,"每一张订单都让站点运营更聪明");
 circle(s,"ORDER",515,244,250,C.navy,C.white,32);
 const data=[[72,184,"用户","偏好 · 频次 · 菜单"],[72,414,"服务","人工介入 · 异常 · 响应"],[846,184,"厨房","利用率 · 耗时 · 失败"],[846,414,"社区","高峰 · 结构 · 覆盖"]];
 data.forEach((d,i)=>card(s,d[0],d[1],350,126,d[2],d[3],i===1?C.coral:C.teal));
 text(s,"MENU",470,552,140,26,17,C.teal,true,"center");text(s,"STAFFING",610,552,160,26,17,C.teal,true,"center");text(s,"EQUIPMENT",770,552,180,26,17,C.teal,true,"center");text(s,"CARE",950,552,120,26,17,C.coral,true,"center");
 text(s,"今天出售的是服务；长期积累的是越来越懂社区的运营系统。",222,618,836,30,22,C.navy,true,"center"); tag(s,"ROADMAP / TO VALIDATE"); notes(s,"不提前宣称 Data Moat。先说明订单如何形成运营学习，只有经过真实站点数据积累后才可能形成壁垒。","0:25");
}
//13
{
 const s=p.slides.add(); base(s,13,"小站点每天能跑起来，因为人机分工清楚");
 const hours=["07:00\n备餐","10:30\n午餐准备","12:00\n峰值履约","14:00\n清洁巡检","17:00\n晚餐 / 收档"]; line(s,96,320,1070,6,C.teal); hours.forEach((h,i)=>{const x=94+i*267;circle(s,"",x,298,48,i===2?C.coral:C.teal);text(s,h,x-48,220,144,58,17,C.navy,true,"center");});
 const roles=["机器：重复烹饪与标准流程","站点人员：确认、交付、情感服务","Human Assist：异常人工接管","供应商 SLA：设备维护支持"];
 roles.forEach((r,i)=>{box(s,80+i*286,414,260,78,i===2?C.lightCoral:C.white,i===2?C.coral:C.gray,12);text(s,r,94+i*286,430,232,46,16,i===2?C.coral:C.ink,true,"center");});
 text(s,"试点前 Gate：食品安全 · 清洗温控 · 证照消防 · 数据权限 · 责任边界",152,548,976,44,22,C.navy,true,"center"); tag(s,"OPERATING MODEL / TO VALIDATE"); notes(s,"自动化不等于无人化。站点需要清楚的日常节奏、人机分工、维护支持与试点前合规 Gate。","0:30",["Nanshan elderly-care action plan: https://www.szns.gov.cn/attachment/1/1666/1666561/12585438.pdf"]);
}
//14
{
 const s=p.slides.add(); base(s,14,"政府、物业、家庭与 Careloop 各有明确价值与付费逻辑");
 circle(s,"G\n政策 / 服务购买",116,214,160,C.navy,C.white,20);circle(s,"B\n物业 / 社区运营",116,430,160,C.teal,C.white,20);circle(s,"C\n老人 / 家属",1000,322,160,C.coral,C.white,20);circle(s,"CARELOOP\n站点运营者",512,306,232,C.white,C.navy,23);
 line(s,276,286,236,4,C.navy);line(s,276,476,236,4,C.teal);line(s,744,386,256,4,C.coral);
 text(s,"场地 / 触达 / 试点入口",300,236,210,44,15,C.muted,true,"center"); text(s,"持续服务价值",784,336,190,34,15,C.muted,true,"center");
 text(s,"站点建设与设备集成服务\n软件 / 运营服务费\n订单 / 服务分成",492,500,272,92,17,C.ink,true,"center");
 text(s,"补贴降低第一站进入成本；长期收入必须来自持续服务价值。",248,620,784,28,21,C.navy,true,"center"); tag(s,"BUSINESS MODEL / PLANNING MODEL"); notes(s,"收入流和价值流要分开理解：政府与物业提供进入条件，家庭持续支付服务价值，Careloop 通过建设、软件运营和服务分成获得收入。","0:35");
}
//15
{
 const s=p.slides.add(); base(s,15,"首站应插入南山现有助餐网络，而不是另开一家店");
 box(s,62,174,484,400,C.lightBlue,C.lightBlue,18); text(s,"南山候选场景研究",94,198,410,34,24,C.navy,true); 
 const locs=[[145,292,"科技园 / 粤海"],[314,260,"桂湾 / 前海"],[202,426,"桃源 / 深云"],[372,410,"蛇口 / 风华"]]; locs.forEach((l,i)=>circle(s,l[2],l[0],l[1],100,i===2?C.coral:C.white,i===2?C.white:C.navy,14));
 card(s,594,172,584,108,"01  BENCHMARK","综合食堂、社康与长者服务；验证跨角色协作。",C.navy);
 card(s,594,300,584,108,"02  FOOD-SERVICE SITE","已有助餐需求、人工运营较重；验证自动化与效率。",C.teal);
 card(s,594,428,584,108,"03  PROPERTY-LED SITE","物业提供空间与居民触达；验证运营合作与续约意愿。",C.coral);
 text(s,"Publicly identified scenarios; no Careloop partnership claimed.",594,574,584,26,16,C.coral,true,"center"); tag(s,"EXTERNAL SOURCE / TO VALIDATE"); notes(s,"首站不是找空地开店，而是找已有需求、管理者和老人流量的节点。所有点位目前只是公开资料研究候选。","0:25",["https://www.sz.gov.cn/szzt2010/szyl/ylfw/ylzcdcx/","https://www.szns.gov.cn/ztzl/nsqzcwdk/shbz/content/post_11961801.html"]);
}
//16
{
 const s=p.slides.add(); base(s,16,"政策、补贴、场景和智慧养老正在南山汇合");
 const chain=[["政策","长者助餐纳入\n基本养老服务"],["场景","饭堂 / 助餐点 /\n长者餐桌"],["运营","食品安全与\n设施责任"],["数据","订单 / 服务 /\n异常记录"],["复制","Site-in-a-Box\n跨点位复用"]];
 chain.forEach((a,i)=>{const x=52+i*244;if(i<4)line(s,x+190,300,54,5,C.teal);circle(s,String(i+1),x+54,224,78,i===4?C.coral:C.teal,C.white,22);text(s,a[0],x,330,190,30,23,C.navy,true,"center");text(s,a[1],x,374,190,64,16,C.ink,false,"center");});
 box(s,92,500,1096,76,C.lightCoral,C.lightCoral,12);text(s,"5 / 15 元助餐补贴是符合资格时降低餐价或运营成本的政策工具，\n不是 Careloop 已获得的收入。",122,511,1036,54,19,C.coral,true,"center");tag(s,"EXTERNAL SOURCE"); notes(s,"Careloop 的进入逻辑是适配已有政策与设施，而不是假设拿到一笔创新补贴。资格、主体和申请条件必须逐站核验。","0:25",["https://www.sz.gov.cn/ztfw/shbz/wyk_183996/content/post_12779745.html","https://www.szns.gov.cn/ztzl/nsqzcwdk/shbz/content/post_11961801.html"]);
}
//17
{
 const s=p.slides.add(); base(s,17,"先 1 个工程站，再 3 个锚点站，最后形成 Site-in-a-Box");
 const phases=[["0–6 月","1","ENGINEERING PILOT","合规 · 场地 · 供应商 · 系统联调","Gate：安全运行"],["6–12 月","3","ANCHOR SITES","订单密度 · 人工介入 · 支付 · 续约","Gate：单位经济"],["12–18 月","10","SITE-IN-A-BOX","硬件包 · 软件包 · SOP · 培训","Gate：可复制"],["18–36 月","→ GBA","CHANNEL SCALE","物业 / 养老机构 / 政府采购渠道","Gate：跨场景复用"]];
 phases.forEach((a,i)=>{const x=54+i*303;box(s,x,174,274,396,i===0?C.lightTeal:C.white,i===0?C.teal:C.gray,16);text(s,a[0],x+20,194,234,28,16,C.muted,true,"center");text(s,a[1],x+20,236,234,72,44,i===3?C.coral:C.teal,true,"center");text(s,a[2],x+20,318,234,32,19,C.navy,true,"center");text(s,a[3],x+24,370,226,76,16,C.ink,false,"center");line(s,x+24,468,226,2,C.gray);text(s,a[4],x+24,494,226,42,17,i===0?C.teal:C.navy,true,"center");});
 text(s,"2,000 万不是今天开 20 家店，而是把 3 个站点跑成可复制模板。",212,608,856,30,22,C.navy,true,"center"); tag(s,"PLANNING MODEL / TO VALIDATE"); notes(s,"扩张顺序是 1→3→10，每一步都有明确 Gate；达不到设备稳定、真实支付、人工效率与续约指标，就不进入下一阶段。","0:30");
}
//18
{
 const s=p.slides.add(); base(s,18,"50 万可做 Demo，2,000 万才覆盖商业化工程");
 box(s,62,176,454,364,C.white,C.gray,18);text(s,"RMB 0.5M",94,204,390,58,40,C.muted,true,"center");text(s,"PROTOTYPE",94,268,390,30,18,C.muted,true,"center");text(s,"软件 Demo\n研究与概念验证\n演示角色与 adapter",126,332,326,124,21,C.ink,false,"center");
 box(s,590,176,628,364,C.navy,C.navy,18);text(s,"RMB 20M",624,204,560,58,42,C.white,true,"center");text(s,"PHASE I PLANNING ENVELOPE",624,268,560,30,17,"#D9E7EF",true,"center");text(s,"Hardware   Site   People\nSoftware   Compliance   Working Capital",630,332,548,104,22,C.white,true,"center");
 box(s,110,574,1060,58,C.lightCoral,C.lightCoral,10);text(s,"Phase I commercialization funding target — NOT confirmed supplier quotation.",136,585,1008,36,18,C.coral,true,"center");tag(s,"PLANNING MODEL"); notes(s,"50 万解决的是能否演示；2,000 万解决的是能否在真实社区安全运营、验证商业模型并形成标准化。它是规划资金包，不是报价单。","0:30");
}
//19
{
 const s=p.slides.add(); base(s,19,"2,000 万先换取可复制证据，再用于扩张");
 const alloc=[["硬件与集成",30,600,C.navy],["场地改造",15,300,"#557A95"],["软件与数据安全",12.5,250,C.teal],["人员与运营",15,300,"#4BA89C"],["供应链/试运营",7.5,150,"#9FC8BC"],["合规/检测/保险",5,100,C.coral],["维护备件",5,100,"#E78A92"],["风险准备金",10,200,C.sand]];
 let x=62; alloc.forEach((a,i)=>{const w=1156*a[1]/100;box(s,x,188,w,74,a[3],a[3],0);if(w>82)text(s,`${a[1]}%`,x+4,208,w-8,30,16,(i===4||i===7)?C.navy:C.white,true,"center");x+=w;});
 const evidence=[["设备稳定性","站点真实用户","协作与安全","单位经济","合规运营","风险缓冲"]];
 const items=[["600 万","硬件采购与工程集成"],["300 万","场地 / 水电 / 消防 / 适老化"],["250 万","软件平台与数据安全"],["300 万","人员与运营"],["150 万","供应链、物流、试运营"],["100 万","合规、检测、保险"],["100 万","维护备件"],["200 万","风险准备金"]];
 items.forEach((a,i)=>{const col=i%4,row=Math.floor(i/4);text(s,a[0],72+col*296,304+row*116,100,28,20,alloc[i][3],true);text(s,a[1],72+col*296,340+row*116,258,50,15,C.ink,false);});
 text(s,"每一笔支出都必须对应下一阶段 Gate：稳定性｜真实用户｜协作｜单位经济｜合规｜风险",116,566,1048,32,19,C.navy,true,"center");text(s,"PLANNING MODEL; NOT AICAN QUOTATION; recalculate after formal quotations.",156,612,968,22,14,C.coral,true,"center");tag(s,"PLANNING MODEL / QUOTE REQUIRED");notes(s,"预算总和为 100%。每个资金桶都应换来下一轮投资决策所需的证据，而不是为了看起来完整。","0:35");
}
//20
{
 const s=p.slides.add(); base(s,20,"回本由真实变量决定，不由一个漂亮数字决定");
 const fsx=[
  "1  Revenue = paid orders × AOV × operating days + eligible policy support",
  "2  Contribution = revenue − food / packaging − variable payment / logistics",
  "3  Site cash contribution = contribution − staff − utilities − maintenance − software − site fee",
  "4  Payback = net initial CapEx ÷ monthly site cash contribution"
 ];fsx.forEach((f,i)=>{box(s,58,172+i*88,714,68,i===3?C.lightCoral:C.white,i===3?C.coral:C.gray,10);text(s,f,78,184+i*88,676,44,16,i===3?C.coral:C.ink,i===3);});
 const scenarios=[["CONSERVATIVE","[[待填：订单 / AOV / 成本]]"],["BASE","[[待填：订单 / AOV / 成本]]"],["UPSIDE","[[待填：订单 / AOV / 成本]]"]];scenarios.forEach((a,i)=>{box(s,826,172+i*126,390,104,i===1?C.lightTeal:C.white,i===1?C.teal:C.gray,14);text(s,a[0],850,188+i*126,342,26,18,i===1?C.teal:C.navy,true,"center");text(s,a[1],850,224+i*126,342,32,15,C.muted,false,"center");});
 box(s,826,562,390,54,C.navy,C.navy,10);text(s,"删除“大号 8 个月”承诺",846,572,350,34,18,C.white,true,"center");tag(s,"PLANNING MODEL / TO VALIDATE");notes(s,"不填漂亮数字。回本必须由订单密度、客单价、食材、人工介入、维护和实际 CapEx 共同计算。","0:35");
}
//21
{
 const s=p.slides.add(); base(s,21,"从一个社区节点，到可复制的养老服务基础设施");
 const values=[["家庭","远程代点 · 服务记录 · 安心"],["物业","空间利用 · 适老配套 · 居民粘性"],["政府","助餐效率 · 服务覆盖 · 合规数据化"],["Careloop","站点服务 · 软件运营 · 集成与分成"]]; values.forEach((a,i)=>card(s,58,168+i*102,522,84,a[0],a[1],i===3?C.coral:C.teal));
 text(s,"逐步形成的壁垒",644,176,516,32,24,C.navy,true); text(s,"软硬件集成｜社区 SOP｜Human Assist\n菜单与运营学习｜供应链与物业网络",644,220,526,70,18,C.ink,false);
 text(s,"我们正在寻找",644,332,516,32,24,C.coral,true); text(s,"1  政策与合规入口\n2  1–3 个南山 Anchor Sites\n3  AICAN / 供应链 / 工程伙伴\n4  战略投资与产业伙伴",644,378,526,150,19,C.ink,false);
 box(s,620,554,568,70,C.coral,C.coral,12);text(s,"RMB 20M  PHASE I FUNDING TARGET",646,568,516,42,22,C.white,true,"center");
 text(s,"Machines handle the labor. Careloop makes care continuous.",110,628,1060,28,18,C.navy,true,"center");tag(s,"PLANNING MODEL / TO VALIDATE");notes(s,"我们寻找的不是一笔钱把概念铺开，而是真实社区、产业伙伴和能把工程化—试点—标准化跑通的 Phase I 资本。","0:45");
}

// Appendices
function appBase(s,letter,title){base(s,`A${letter}`,title,"APPENDIX · EVIDENCE & EXECUTION");}
// A
{
 const s=p.slides.add(); appBase(s,"A","技术与数据架构：每次自动化都保留确认、权限与日志");
 const nodes=[["UI / VOICE","老人 · 家属 · 工作人员"],["INTENT + CONFIRM","偏好解析 · 风险确认"],["ORDER STATE ENGINE","状态 · ID · 事件日志"],["TASK EXECUTION","厨房任务 · Staff queue"],["OPERATIONS DATA","订单 · 异常 · 设备 · 结果"]];nodes.forEach((a,i)=>{const x=44+i*245;if(i<4)line(s,x+190,304,55,5,C.teal);box(s,x,238,190,134,i===2?C.navy:C.white,i===2?C.navy:C.gray,14);text(s,a[0],x+10,254,170,34,17,i===2?C.white:C.teal,true,"center");text(s,a[1],x+14,300,162,48,15,i===2?C.white:C.ink,false,"center");});
 line(s,515,372,4,76,C.coral);box(s,440,448,310,76,C.lightCoral,C.coral,12);text(s,"HUMAN ASSIST\n低置信度 · 异常 · 权限升级",460,458,270,54,17,C.coral,true,"center");
 text(s,"Adapter 边界：支付 / AICAN / 传送带 / 消息通道需在试点集成验证。",176,576,928,30,18,C.navy,true,"center");tag(s,"VALIDATED + TO VALIDATE");notes(s,"附录用于回答技术评委：系统如何从输入到任务再到数据，同时把 Human Assist、权限和 adapter 边界讲清楚。","Appendix");
}
// B
{
 const s=p.slides.add(); appBase(s,"B","AICAN capability & integration boundary");
 card(s,58,170,520,350,"AICAN · PUBLIC CAPABILITY","数字烹饪硬件\nAICMOS / HMI\n菜谱与设备管理\n温控、调味与动作流程\n\n待核验：具体型号、安装、清洗、云接口、SLA",C.navy);
 card(s,702,170,520,350,"CARELOOP · COMMUNITY LAYER","四角色终端\nOrder State Engine\nHuman Assist\n社区 SOP 与服务记录\n\n待核验：API、责任边界、维护与数据流",C.teal);
 circle(s,"API /\nSTATE",565,290,150,C.coral,C.white,20);text(s,"正式报价 · 接口文档 · 安装条件 · SLA · 维护边界",260,566,760,34,18,C.coral,true,"center");tag(s,"SOURCE / INTEGRATION PLAN");notes(s,"用于供应商尽调，避免把供应商产品能力、Careloop 软件和未来集成混为一体。","Appendix",["AICAN Global official: https://www.aicanglobal.com/","AICAN public product manual: https://img.ach18.com/office/product/L3-5A0004306-%E8%AF%B4%E6%98%8E%E4%B9%A6%EF%BC%88%E8%8B%B1%E6%96%87%EF%BC%89.pdf"]);
}
// C
{
 const s=p.slides.add(); appBase(s,"C","Site BOM & quotation status");
 const headers=["模块","规格 / 数量","报价状态","负责人 / 截止"];headers.forEach((h,i)=>{box(s,58+[0,330,650,900][i],170,[320,320,250,322][i],48,C.navy,C.navy,0);text(s,h,66+[0,330,650,900][i],178,[304,304,234,306][i],32,17,C.white,true,"center");});
 const rows=["烹饪核心","储存 / 保温 / 辅助设备","出餐 / 传送 / 取餐","清洁 / 消毒 / 排烟","网络 / 终端 / 数据安全","场地 / 水电 / 消防 / 适老化","安装调试 / 维护备件"];
 rows.forEach((r,i)=>{const y=218+i*54;box(s,58,y,320,50,i%2?C.white:C.pale,C.gray,0);text(s,r,70,y+8,296,34,15,C.ink,i===0);box(s,388,y,320,50,i%2?C.white:C.pale,C.gray,0);text(s,"[[待填型号 / 数量]]",398,y+8,300,34,14,C.muted,false,"center");box(s,708,y,250,50,i%2?C.white:C.pale,C.gray,0);text(s,"[[待正式报价]]",718,y+8,230,34,14,C.coral,true,"center");box(s,958,y,264,50,i%2?C.white:C.pale,C.gray,0);text(s,"[[待分配]]",970,y+8,240,34,14,C.muted,false,"center");});tag(s,"QUOTE REQUIRED");notes(s,"BOM 附录把资金模型变成采购工作清单。正式报价到位后，应回算 Slide 18–20。","Appendix");
}
// D
{
 const s=p.slides.add(); appBase(s,"D","Compliance by design：合规是试点前 Gate，不是附加项");
 card(s,58,174,552,354,"FOOD SAFETY","持证经营主体\n合格供应链与追溯\n温控、清洗、消毒与留样\n消防、排烟与场地责任\n异常停机与召回 SOP",C.coral);
 card(s,670,174,552,354,"DATA & PRIVACY","最小化采集与明确授权\n老人 / 家属 / 员工角色权限\n数据留存周期与删除机制\n访问日志与事件响应\n供应商 / 云端数据责任",C.teal);
 box(s,126,564,1028,58,C.navy,C.navy,10);text(s,"PASS GATE：责任主体 + 文件 + 培训 + 演练 + 可审计记录",156,575,968,36,20,C.white,true,"center");tag(s,"TO VALIDATE");notes(s,"没有上传认证或合规文件，因此只描述试点前必须完成的 Gate，不声称已经认证。","Appendix",["Nanshan elderly-care action plan: https://www.szns.gov.cn/attachment/1/1666/1666561/12585438.pdf"]);
}
// E
{
 const s=p.slides.add(); appBase(s,"E","Unit economics scenario model");
 const groups=[["SITE CAPEX","设备 · 安装 · 改造 · 备件"],["SITE OPEX","人工 · 租管 · 水电 · 维护 · 软件"],["REVENUE","付费订单 · AOV · 运营天数 · 合格补贴"],["ROLLOUT","站点数 · 开站节奏 · 复制成本"]];groups.forEach((g,i)=>card(s,56+i*306,168,278,118,g[0],g[1],i===2?C.coral:C.teal));
 const sc=["CONSERVATIVE","BASE","UPSIDE"];sc.forEach((a,i)=>{box(s,56+i*402,330,370,202,i===1?C.lightTeal:C.white,i===1?C.teal:C.gray,14);text(s,a,78+i*402,346,326,28,19,i===1?C.teal:C.navy,true,"center");text(s,"Orders/day   [[input]]\nAOV          [[input]]\nFood cost    [[input]]\nStaff min/order [[input]]\nCapEx        [[input]]",92+i*402,392,298,114,15,C.ink,false);});
 text(s,"政策支持仅在主体与服务对象符合资格时计入。",312,578,656,28,18,C.coral,true,"center");tag(s,"PLANNING MODEL");notes(s,"该页是主 deck Slide 20 的输入表。空值必须由工程站和正式报价填充。","Appendix");
}
// F
{
 const s=p.slides.add(); appBase(s,"F","Risk → Control → Gate");
 const rs=[["食品安全","温控 / 留样 / 召回","责任主体与演练"],["设备故障","备件 / SLA / 人工 Plan B","峰值时段恢复"],["AI 误识别","预览确认 / Human Assist","误单与接管率"],["用户不付费","真实支付测试 / 菜单迭代","复购与订单密度"],["站点成本","正式报价 / 轻重配置","现金贡献为正"],["数据隐私","最小化 / 权限 / 日志","事件响应演练"],["扩张过快","1→3→10 Gate","未通过不扩张"]];
 const hx=[58,330,656,964],hw=[272,326,308,258];["RISK","CONTROL","PASS GATE","OWNER / STATUS"].forEach((h,i)=>{box(s,hx[i],170,hw[i],46,C.navy,C.navy,0);text(s,h,hx[i]+6,178,hw[i]-12,30,16,C.white,true,"center");});
 rs.forEach((r,i)=>{const y=216+i*52;[r[0],r[1],r[2],"[[待分配]]"].forEach((v,j)=>{box(s,hx[j],y,hw[j],48,i%2?C.white:C.pale,C.gray,0);text(s,v,hx[j]+8,y+7,hw[j]-16,34,14,j===0?C.navy:C.ink,j===0,"center");});});tag(s,"RISK / TO VALIDATE");notes(s,"风险不是附录装饰。每项风险都要有控制机制、通过标准和负责人。","Appendix");
}
// G
{
 const s=p.slides.add(); appBase(s,"G","0–360 day Nanshan pilot plan");
 const phases=[["0–30 日","进入社区","主体 / 场地 / 供应商 / 需求访谈","Gate：场地与责任可签"],["31–90 日","Engineering Pilot","安装联调 / SOP / 员工培训 / 安全演练","Gate：稳定安全运行"],["91–180 日","Commercial Pilot","真实支付 / 复购 / 人工分钟 / 维护成本","Gate：单位经济可解释"],["180–360 日","标准化","站点包 / 培训包 / 采购包 / 数据基线","Gate：续约或第二站复制"]];
 phases.forEach((a,i)=>{const x=48+i*307;box(s,x,174,280,398,i===1?C.lightTeal:C.white,i===1?C.teal:C.gray,16);text(s,a[0],x+20,198,240,30,18,C.muted,true,"center");text(s,a[1],x+20,244,240,38,24,i===1?C.teal:C.navy,true,"center");text(s,a[2],x+26,312,228,110,16,C.ink,false,"center");line(s,x+24,454,232,2,C.gray);text(s,a[3],x+24,482,232,58,17,i===1?C.teal:C.coral,true,"center");});
 text(s,"核心指标：真实支付 · 复购 · 每单人工分钟 · 设备利用率 · 维护成本 · 续约 / 扩站意向",128,610,1024,28,18,C.navy,true,"center");tag(s,"PLANNING MODEL / TO VALIDATE");notes(s,"Pilot 不只是装机器，而是从进入社区到工程、安全、商业和标准化的连续验证。","Appendix");
}
// H
{
 const s=p.slides.add(); appBase(s,"H","Who can turn RMB 20M into real sites");
 const caps=[["产品 / 用户","[[负责人]]","适老交互与订单产品"],["营养 / 菜单","[[负责人]]","菜单与营养标签"],["硬件 / 工业设计","[[负责人]]","站点工程与设备集成"],["软件 / AI","[[负责人]]","状态机、Human Assist、数据"],["商业化","[[负责人]]","政府、物业与产业合作"],["站点运营","[[待补关键角色]]","食品安全、人员与日常运营"]];
 caps.forEach((a,i)=>{const col=i%3,row=Math.floor(i/3);card(s,58+col*402,168+row*186,370,158,a[0],`${a[1]}\n${a[2]}`,i===5?C.coral:C.teal);});
 text(s,"必须补齐：养老/社区运营｜食品安全与营养｜AICAN/机电集成｜数据安全｜物业/政府项目",110,572,1060,46,18,C.navy,true,"center");tag(s,"TEAM EVIDENCE REQUIRED");notes(s,"主 deck 不挤入团队页，但评委会追问执行能力。提交前必须用真实姓名、照片和可验证经历替换所有占位。","Appendix");
}

await fs.mkdir(BUILD,{recursive:true});
for (const [i,s] of p.slides.items.entries()) {
  const stem=`slide-${String(i+1).padStart(2,"0")}`;
  const png=await p.export({slide:s,format:"png",scale:1});
  await fs.writeFile(`${BUILD}/${stem}.png`,new Uint8Array(await png.arrayBuffer()));
  const layout=await s.export({format:"layout"}); await fs.writeFile(`${BUILD}/${stem}.layout.json`,await layout.text());
}
const montage=await p.export({format:"webp",montage:true,scale:1}); await fs.writeFile(`${BUILD}/montage.webp`,new Uint8Array(await montage.arrayBuffer()));
const pptx=await PresentationFile.exportPptx(p); await pptx.save(OUT);
console.log(`Wrote ${OUT} with ${p.slides.items.length} slides`);
