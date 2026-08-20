import fs from "node:fs/promises";
import fsSync from "node:fs";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "/Users/cj/careloop/CMICHK/Careloop_MICHK_2026_Final_v2.pptx";
const RENDER = "/Users/cj/careloop/CMICHK/build_v2/rendered";
const ASSET = "/Users/cj/careloop/CMICHK/build_v2/assets";

const W = 1280, H = 720;
const C = {
  bg: "#F8F5ED", paper: "#FFFDF8", navy: "#193B3B", navy2: "#2F5550",
  teal: "#0F6864", teal2: "#58A89F", tealPale: "#DDEFE8",
  coral: "#DD5B47", coralPale: "#F8E5DE", sand: "#ECE4D6",
  ink: "#20302E", muted: "#6F7F7A", white: "#FFFFFF", line: "#D9E2DA",
  amber: "#C59635", green: "#2C8060", gray: "#9CAAA5"
};
const FONT = "PingFang SC";
const presentation = Presentation.create({ slideSize: { width: W, height: H } });

function addShape(slide, geometry, x, y, w, h, fill, opts = {}) {
  return slide.shapes.add({
    geometry, name: opts.name,
    position: { left: x, top: y, width: w, height: h },
    fill: fill ?? "none",
    line: { style: "solid", fill: opts.line ?? "none", width: opts.lineWidth ?? 0 },
    borderRadius: opts.radius,
    shadow: opts.shadow,
    rotation: opts.rotation,
  });
}

function addText(slide, text, x, y, w, h, size = 22, color = C.ink, opts = {}) {
  const s = addShape(slide, "textbox", x, y, w, h, "none", { name: opts.name });
  s.text = text;
  s.text.style = {
    fontSize: size, color, bold: !!opts.bold, italic: !!opts.italic,
    alignment: opts.align ?? "left", verticalAlignment: opts.valign ?? "top",
    typeface: FONT, autoFit: opts.autoFit ?? "shrinkText",
    insets: opts.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
    lineSpacing: opts.lineSpacing ?? 1.05,
  };
  return s;
}

function addImage(slide, path, x, y, w, h, opts = {}) {
  const bytes = fsSync.readFileSync(path);
  const blob = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return slide.images.add({
    blob, contentType: "image/png", alt: opts.alt ?? "Careloop source visual",
    fit: opts.fit ?? "cover", position: { left: x, top: y, width: w, height: h },
    geometry: opts.geometry ?? "roundRect", borderRadius: opts.radius ?? "rounded-xl",
  });
}

function addTop(slide, n, title, section = "CARELOOP · MICHK 2026") {
  addText(slide, section, 62, 34, 400, 20, 13, C.teal, { bold: true });
  addText(slide, title, 62, 65, 1120, 76, 48, C.navy, { bold: true, valign: "middle", name: `title-${n}` });
  addShape(slide, "rect", 62, 150, 52, 5, C.coral);
  addText(slide, String(n).padStart(2, "0"), 1190, 37, 30, 22, 14, C.muted, { align: "right", bold: true });
}

function addFooter(slide, label, n) {
  addShape(slide, "rect", 62, 674, 1156, 1, C.line);
  addText(slide, "CARELOOP 暖桌", 62, 684, 220, 18, 12, C.muted, { bold: true });
  const color = label.includes("TO VALIDATE") || label.includes("QUOTE") ? C.coral : label.includes("PLANNING") ? C.amber : C.teal;
  addText(slide, label, 720, 682, 470, 20, 12, color, { align: "right", bold: true });
  addText(slide, String(n), 1202, 682, 18, 20, 12, C.muted, { align: "right" });
}

function base(n, title, label, section) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addTop(slide, n, title, section);
  addFooter(slide, label, n);
  return slide;
}

function notes(slide, talk, sources = []) {
  const src = sources.length ? `\n\n[Sources]\n${sources.map(s => `- ${s}`).join("\n")}` : "";
  slide.speakerNotes.textFrame.setText(`${talk}${src}`);
  slide.speakerNotes.setVisible(true);
}

function pill(slide, text, x, y, w, fill = C.tealPale, color = C.teal) {
  addShape(slide, "roundRect", x, y, w, 34, fill, { radius: "rounded-full" });
  addText(slide, text, x + 8, y + 5, w - 16, 24, 14, color, { bold: true, align: "center" });
}

function box(slide, x, y, w, h, title, body, accent = C.teal, opts = {}) {
  addShape(slide, "roundRect", x, y, w, h, opts.fill ?? C.paper, { line: opts.line ?? C.line, lineWidth: 1, radius: "rounded-xl" });
  addShape(slide, "rect", x, y, 7, h, accent);
  addText(slide, title, x + 24, y + 18, w - 42, 34, opts.titleSize ?? 25, C.navy, { bold: true });
  addText(slide, body, x + 24, y + 63, w - 42, h - 80, opts.bodySize ?? 20, opts.bodyColor ?? C.ink, { lineSpacing: 1.15 });
}

function dot(slide, x, y, r, fill) { addShape(slide, "ellipse", x-r, y-r, r*2, r*2, fill); }
function arrowText(slide, x, y, w = 44, color = C.teal) { addText(slide, "→", x, y, w, 42, 30, color, { bold: true, align: "center", valign: "middle" }); }

// 1
{
  const s = presentation.slides.add(); s.background.fill = C.navy;
  addShape(s, "rect", 0, 0, 18, H, C.coral);
  addText(s, "CARELOOP 暖桌", 68, 55, 360, 28, 17, C.teal2, { bold: true });
  addText(s, "把社区助餐升级成\n可持续照护服务节点", 68, 112, 555, 188, 68, C.white, { bold: true, lineSpacing: 0.92 });
  addText(s, "社区共享厨房 × 适老交互 × 家属协作 × 人工兜底 × 数据闭环", 70, 330, 540, 76, 25, "#DDE7F4", { lineSpacing: 1.15 });
  pill(s, "SOFTWARE / INTERACTIONS DEMO → ENGINEERING PILOT", 70, 442, 472, C.coralPale, C.coral);
  addImage(s, `${ASSET}/ui_elder_polished.png`, 670, 70, 540, 560, { alt: "Latest Careloop elder experience UI", fit: "cover" });
  addText(s, "Machines handle the labor. Careloop makes care continuous.", 70, 635, 760, 28, 18, C.white, { bold: true });
  addText(s, "01", 1170, 655, 40, 18, 12, "#AFC1D7", { align: "right" });
  notes(s, "我们不是再开一家食堂，而是在做一个可以嵌入社区、把一顿饭变成持续照护触点的服务节点。当前可展示的是软件与交互原型；硬件部署和商业收入属于下一阶段。", ["Careloop adaptive UI prototype, careloop-ui-preview.html, captured 2026-08-20"]);
}

// 2
{
  const s = base(2, "深圳已把长者助餐纳入基础服务", "EXTERNAL SOURCE");
  addText(s, "政策与人口结构已经把需求推到社区一线", 62, 174, 690, 34, 23, C.muted);
  const nums = [
    ["3.23亿", "2025年中国60岁及以上人口"],
    ["23.0%", "占全国人口比重"],
    ["5–15元", "深圳符合条件长者每餐补贴上限"]
  ];
  nums.forEach((d,i)=>{
    const x=62+i*386; addShape(s,"roundRect",x,246,350,250,i===2?C.coralPale:C.paper,{line:i===2?C.coral:C.line,lineWidth:1,radius:"rounded-xl"});
    addText(s,d[0],x+22,276,306,90,58,i===2?C.coral:C.navy,{bold:true,align:"center",valign:"middle"});
    addText(s,d[1],x+30,390,290,65,20,C.ink,{align:"center",bold:true});
  });
  addText(s, "机会不是证明老人需要吃饭，而是让既有助餐体系更可协作、更可持续。", 170, 548, 940, 48, 28, C.teal, { bold: true, align: "center" });
  notes(s, "三组数字建立同一件事：老龄化规模、政策服务属性、以及真实补贴机制已经存在。Careloop要验证的是如何提高服务连续性，而不是从零教育市场。", ["国家统计局，《2025年经济发展向新向优 预期目标圆满实现》，2026, https://www.stats.gov.cn/sj/zxfb/202601/t20260119_1962330.html", "深圳市人民政府，《深圳市基本养老服务清单（2026年版）》，2026, https://www.sz.gov.cn/attachment/1/1734/1734727/12779745.pdf"]);
}

// 3
{
  const s = base(3, "南山已有助餐网络，Careloop增加智能协作层", "EXTERNAL SOURCE / TO VALIDATE");
  addText(s, "公开场景网络", 76, 188, 300, 30, 23, C.navy, { bold: true });
  addShape(s, "roundRect", 62, 228, 520, 354, C.paper, { line: C.line, lineWidth: 1, radius: "rounded-xl" });
  const pts=[[160,310,"沙河\n高发社区"],[350,286,"粤海\n科技园"],[445,430,"桃源\n社区点"],[226,468,"蛇口\n社区点"]];
  pts.forEach((p,i)=>{dot(s,p[0],p[1],18,i===0?C.coral:C.teal); addText(s,p[2],p[0]-55,p[1]+28,110,48,16,C.ink,{align:"center",bold:true});});
  addShape(s,"rect",165,324,174,4,C.teal2); addShape(s,"rect",358,312,78,4,C.teal2); addShape(s,"rect",242,454,187,4,C.teal2);
  addText(s,"深圳民政公开名录显示南山多个街道已有长者饭堂、助餐点与长者餐桌。",84,515,455,48,18,C.muted,{align:"center"});
  addShape(s,"roundRect",650,228,568,354,C.navy,{radius:"rounded-xl"});
  addText(s,"CARELOOP 智能服务层",686,260,490,42,29,C.white,{bold:true});
  ["低门槛发起与确认","跨角色订单接力","异常进入人工队列","授权数据形成运营学习"].forEach((t,i)=>{pill(s,t,686,330+i*55,420,i===2?C.coralPale:C.tealPale,i===2?C.coral:C.teal);});
  addText(s,"候选场景 ≠ 已签约试点",720,552,390,26,18,"#F5C5C4",{bold:true,align:"center"});
  notes(s, "南山不是空白市场。公开名录和高发社区案例说明场景、管理者和老人流量已经存在。我们要寻找一个Benchmark、一个餐饮运营点和一个物业主导点；这些都是候选研究场景，不是已签约合作。", ["深圳市民政局，《深圳市长者饭堂和助餐点一览表》，2026, https://mzj.sz.gov.cn/szmz/pc/bmxx/cyfwzy/content/mpost_2948869.html", "深圳市人民政府，《深圳国企打造首个社区嵌入式民生服务综合体》，2024, https://www.sz.gov.cn/cn/xxgk/zfxxgj/zwdt/content/post_11559674.html"]);
}

// 4
{
  const s=base(4,"SHARE：共享的是整个社区的照护能力","CONCEPT / BUSINESS MODEL");
  addShape(s,"ellipse",490,240,300,300,C.navy);
  addText(s,"COMMUNITY\nCARE STATION",535,330,210,92,30,C.white,{bold:true,align:"center",valign:"middle"});
  const qs=[
    ["HARDWARE","共享设备","减少重复劳动",90,220,C.teal],
    ["SPACE","共享空间","激活社区节点",870,220,C.coral],
    ["PEOPLE","共享协作","把人留给陪伴",90,470,C.coral],
    ["DATA","共享洞察","授权角色共同改进",870,470,C.teal]
  ];
  qs.forEach(q=>{addShape(s,"roundRect",q[3],q[4],300,125,C.paper,{line:q[5],lineWidth:2,radius:"rounded-xl"}); addText(s,q[0],q[3]+20,q[4]+18,260,24,16,q[5],{bold:true}); addText(s,q[1],q[3]+20,q[4]+48,260,30,26,C.navy,{bold:true}); addText(s,q[2],q[3]+20,q[4]+88,260,22,17,C.muted);});
  addText(s,"一套能力服务一个社区，才有规模经济。",390,594,500,34,25,C.teal,{bold:true,align:"center"});
  notes(s,"一台设备服务一个家庭很贵；硬件、空间、人员和数据在社区尺度共享，才形成可持续的服务经济。SHARE是商业化逻辑，不是设备清单。", ["Careloop prior deck, Group 5-暖桌Careloop.pdf, slide 3 (user-provided concept reference)"]);
}

// 5
{
  const s=base(5,"现有方案覆盖一段，Careloop连接整条服务链","EXTERNAL SOURCE / ASSUMPTION");
  const items=[
    ["传统助餐","有供给","人工流程重"],
    ["复杂 App","有数字化","老人操作成本高"],
    ["家属代点","有支付","难看到现场履约"],
    ["单一机器人","有自动化","缺少社区协作"],
  ];
  items.forEach((d,i)=>{const x=62+i*210; addText(s,d[0],x,205,188,30,22,C.navy,{bold:true,align:"center"}); addShape(s,"rect",x+20,260,148,4,i%2?C.coral:C.teal); addText(s,d[1],x,286,188,30,20,C.ink,{align:"center",bold:true}); addText(s,d[2],x,335,188,48,17,C.muted,{align:"center"}); arrowText(s,x+178,286,32,C.gray);});
  addShape(s,"roundRect",915,190,303,265,C.navy,{radius:"rounded-xl"});
  addText(s,"CARELOOP",945,220,245,28,18,C.teal2,{bold:true,align:"center"});
  addText(s,"发起 → 确认 → 履约\n→ 异常 → 家庭连接",947,275,240,96,29,C.white,{bold:true,align:"center",valign:"middle"});
  addText(s,"一笔订单，一个闭环",960,400,215,25,18,"#DDE7F4",{align:"center"});
  addText(s,"差异不在于“别人做不到”，而在于 Careloop 把用户、工作人员、厨房和家属放进同一条可接管链路。",130,520,1020,70,25,C.teal,{bold:true,align:"center"});
  notes(s,"现有方案往往各自解决供给、数字点餐、远程支付或自动烹饪。Careloop的差异是把这些动作接成一笔可追踪、可人工接管的订单。页面不主张竞争者无法做到，只描述链路差异。", ["Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx (comparison framework)"]);
}

// 6
{
  const s=base(6,"四层组合，才形成一个 Community Care Station","AICAN EXTERNAL SOURCE + CURRENT DEMO");
  addText(s,"CURRENT RUNNABLE DEMO",62,198,450,24,15,C.teal,{bold:true,align:"center"});
  addImage(s,`${ASSET}/ui_customer_top_latest.png`,62,238,450,253,{alt:"Latest runnable Careloop multi-role customer UI",fit:"cover"});
  addShape(s,"roundRect",62,515,450,72,C.tealPale,{line:C.teal,lineWidth:1,radius:"rounded-xl"});
  addText(s,"老人 / 家属 / 工作人员 / 厨房\n共享同一订单状态",88,531,398,42,19,C.teal,{bold:true,align:"center",valign:"middle"});
  const layers=[
    ["04 数据运营","订单 · 偏好 · 异常 · 设备状态",C.navy],
    ["03 交互与人","语音 / 大按钮 / 家属代点 / 人工协作",C.coral],
    ["02 服务软件","Kitchen Control + Order State Engine",C.teal],
    ["01 硬件工作流","烹饪 · 保温 · 出餐 · 清洁",C.navy2]
  ];
  layers.forEach((d,i)=>{const y=196+i*98; addShape(s,"roundRect",575,y,643,78,d[2],{radius:"rounded-xl"}); addText(s,d[0],600,y+17,190,29,23,C.white,{bold:true}); addText(s,d[1],795,y+18,390,42,19,C.white,{valign:"middle"});});
  addText(s,"产品 = 四层组合后的服务能力",590,605,605,32,23,C.teal,{bold:true,align:"center"});
  notes(s,"这页第一次把系统讲完整。AICAN等设备提供底层自动化；Careloop增加订单状态、四角色界面、人工协作和运营数据。左侧是当前可运行的多角色界面，不代表硬件已经接入。", ["AICAN Global official overview, 2026, https://www.aicanglobal.com/", "Careloop runnable UI, src/ui/index.html, captured 2026-08-20"]);
}

// 7
{
  const s=base(7,"硬件负责重复、危险和标准化劳动","AICAN EXTERNAL SOURCE / TO VALIDATE");
  addImage(s,`${ASSET}/hardware_modules.png`,62,188,460,390,{alt:"User-provided hardware concept modules",fit:"cover"});
  const steps=[
    ["备餐","供应链与储存","减少现场备料"],
    ["烹饪","温控 / 调味 / 菜谱","减少重复烹饪"],
    ["装盘与传送","轻量辅助","降低峰值搬运"],
    ["交付","工作人员确认","保留服务温度"],
    ["清洁","自动/半自动","降低收档劳动"]
  ];
  steps.forEach((d,i)=>{const y=190+i*82; dot(s,584,y+28,12,i===1?C.coral:C.teal); addText(s,String(i+1).padStart(2,"0"),570,y+19,28,18,12,C.white,{bold:true,align:"center"}); addText(s,d[0],615,y+3,150,31,23,C.navy,{bold:true}); addText(s,d[1],760,y+5,195,28,18,C.ink,{bold:true}); addText(s,d[2],965,y+7,220,25,17,C.muted); if(i<4)addShape(s,"rect",583,y+48,3,40,C.teal2);});
  addText(s,"设备报价、安装、SLA 与真实峰值稳定性：QUOTE REQUIRED",610,606,570,30,19,C.coral,{bold:true,align:"center"});
  notes(s,"硬件不是机器人展览。每个节点都对应一种运营结果。AICAN官网支持温控、自动调味、自清洁、智能操作系统和云管理等能力，但Careloop尚未获得本项目正式报价，也未完成社区部署验证。", ["AICAN Global official overview, 2026, https://www.aicanglobal.com/", "AICAN corporate profile, https://aicanwang.cn/index/aboutUs/company_profile", "Careloop prior deck, Group 5-暖桌Careloop.pdf, slide 9 (user-provided visual reference)"]);
}

// 8
{
  const s=base(8,"AICAN做厨房自动化，Careloop做社区服务闭环","EXTERNAL SOURCE / INTEGRATION PLAN");
  box(s,62,205,448,360,"AICAN 官方能力","烹饪硬件\n智能 HMI 与 AICMOS OS\n菜谱与设备管理\nAican Cloud 多设备运营\n自动调味 / 烟气处理 / 自清洁",C.navy,{bodySize:22});
  box(s,770,205,448,360,"CARELOOP 社区服务层","老人 / 家属 / 工作人员 / 运营端\n订单状态与确认机制\n低置信度人工接管\n社区站点 SOP 与服务记录\n授权数据形成 Operational Learning",C.teal,{bodySize:22});
  addShape(s,"roundRect",530,280,220,150,C.coralPale,{line:C.coral,lineWidth:2,radius:"rounded-xl"});
  addText(s,"INTEGRATION\nPLAN",560,310,160,55,27,C.coral,{bold:true,align:"center"});
  addText(s,"API / Adapter\nOrder State",560,370,160,42,17,C.ink,{align:"center"});
  arrowText(s,500,330,34,C.coral); arrowText(s,736,330,34,C.coral);
  addText(s,"知识产权与合作状态必须分开：AICAN能力 ≠ Careloop自研 ≠ 已签合作",218,605,844,31,21,C.coral,{bold:true,align:"center"});
  notes(s,"我们的策略不是重造厨房操作系统，而是在成熟厨房自动化能力上增加社区服务层。中间的连接是集成计划，不代表已完成接口或签署合作。", ["AICAN Global official overview, 2026, https://www.aicanglobal.com/"]);
}

// 9
{
  const s=base(9,"一笔订单，如何被不同的人接力完成","VALIDATED / DEMO / TO VALIDATE");
  const states=["CREATED","CONFIRMED","PREPARING","READY","COLLECTED","COMPLETED"];
  states.forEach((t,i)=>{const x=60+i*195; addShape(s,"roundRect",x,265,165,82,i===5?C.navy:C.paper,{line:i===5?C.navy:C.teal,lineWidth:2,radius:"rounded-xl"}); addText(s,t,x+12,286,141,32,18,i===5?C.white:C.navy,{bold:true,align:"center",valign:"middle"}); if(i<5)arrowText(s,x+162,282,33,C.teal);});
  pill(s,"ORDER ID",70,191,160); pill(s,"INTENT / PREFERENCE",250,191,240); pill(s,"CONFIRMATION",510,191,200);
  addShape(s,"roundRect",770,174,448,78,C.coralPale,{line:C.coral,lineWidth:1,radius:"rounded-xl"});
  addText(s,"低置信度 / 异常",792,190,170,25,18,C.coral,{bold:true}); arrowText(s,965,185,50,C.coral); addText(s,"HUMAN ASSIST",1018,190,170,25,18,C.coral,{bold:true});
  addText(s,"聊天只是入口。确认、状态、追踪与人工接管，才让需求变成可执行任务。",170,460,940,70,29,C.teal,{bold:true,align:"center",valign:"middle"});
  addText(s,"支付 / AICAN / 传送带适配器：DEMO ASSUMPTION",330,568,620,30,18,C.muted,{bold:true,align:"center"});
  notes(s,"同一个Order ID贯穿所有终端。系统先理解意图和偏好，再做预览确认，并通过状态机推进。任何低置信度或异常都进入人工队列。当前验证来自UI与Demo；真实支付、设备接口和现场流程仍需验证。", ["Careloop current UI and demo evidence referenced in user-provided v3 guide"]);
}

// 10
{
  const s=base(10,"同一笔订单，四个角色看到四种行动","VALIDATED / DEMO");
  const roles=[
    ["老人端","自己点 · 语音 / 大按钮",`${ASSET}/ui_voice_polished.png`,C.coral],
    ["家属端","帮他点 · 健康档案 / 代点",`${ASSET}/ui_child_polished.png`,C.teal],
    ["工作人员端","接住异常 · 认领 / 协作",`${ASSET}/ui_staff_latest.png`,C.coral],
    ["厨房端","推进履约 · 状态 / 传送",`${ASSET}/ui_kitchen_latest.png`,C.teal]
  ];
  roles.forEach((d,i)=>{const x=62+(i%2)*588,y=188+Math.floor(i/2)*218; addShape(s,"roundRect",x,y,548,190,C.paper,{line:d[3],lineWidth:2,radius:"rounded-xl"}); addImage(s,d[2],x+10,y+10,318,170,{alt:`Careloop ${d[0]} current UI`,fit:"cover"}); addText(s,d[0],x+350,y+42,174,32,24,d[3],{bold:true}); addText(s,d[1],x+350,y+92,174,56,18,C.ink,{bold:true,valign:"middle"});});
  notes(s,"四个终端不是四个独立App，而是同一笔订单的四个角色视图。老人看到简单动作，家属看到远程协作，工作人员接住异常，厨房端推进履约。", ["Careloop runnable UI, src/ui/index.html, captured 2026-08-20", "Careloop adaptive UI prototype, careloop-ui-preview.html, captured 2026-08-20"]);
}

// 11
{
  const s=base(11,"真正体现 Care 的，是 AI 不确定时有人接住","DEMO / VALIDATED / ASSUMPTION");
  addText(s,"01 · AI 不确定 / 25%",62,184,540,28,17,C.coral,{bold:true});
  addText(s,"02 · 转人工 / 等待认领",678,184,540,28,17,C.teal,{bold:true});
  addImage(s,`${ASSET}/ui_failure_latest.png`,62,220,540,330,{alt:"Careloop low-confidence failure state at 25 percent",fit:"cover"});
  addImage(s,`${ASSET}/ui_handoff_latest.png`,678,220,540,330,{alt:"Careloop staff handoff queue waiting for claim",fit:"cover"});
  arrowText(s,610,350,60,C.coral);
  addShape(s,"roundRect",180,580,920,50,C.navy,{radius:"rounded-xl"});
  addText(s,"停止自动推进 → 进入人工队列 → 工作人员认领 → 继续或改单",210,592,860,28,21,C.white,{bold:true,align:"center"});
  notes(s,"这不是概念流程图，而是当前可运行Demo的真实失败路径：识别置信度只有25%时，系统停止自动推进并提供转人工；提交后，工作人员端出现等待认领的任务。真实支付、AICAN和传送带仍只是Demo adapter。", ["Careloop runnable UI, src/ui/index.html, actual failure-to-handoff flow captured 2026-08-20"]);
}

// 12
{
  const s=base(12,"订单数据先形成 Operational Learning，再谈壁垒","ROADMAP / TO VALIDATE");
  addImage(s,`${ASSET}/ui_delivery_route_polished.png`,62,210,430,340,{alt:"Careloop adaptive delivery route UI",fit:"cover"});
  addText(s,"一次交付留下可复盘的服务轨迹",88,565,380,48,20,C.navy,{bold:true,align:"center"});
  arrowText(s,495,350,50,C.teal);
  const outs=[["MENU","菜单迭代"],["STAFFING","排班与介入"],["EQUIPMENT","维护与利用"],["CARE","持续照护"]];
  outs.forEach((d,i)=>{const x=550+(i%2)*334,y=215+Math.floor(i/2)*185; addShape(s,"roundRect",x,y,294,145,C.paper,{line:i===3?C.coral:C.teal,lineWidth:2,radius:"rounded-xl"}); addText(s,d[0],x+24,y+23,246,24,16,i===3?C.coral:C.teal,{bold:true}); addText(s,d[1],x+24,y+64,246,38,27,C.navy,{bold:true});});
  addText(s,"先形成可验证的运营学习，再讨论长期数据壁垒。",615,585,520,30,20,C.teal,{bold:true,align:"center"});
  notes(s,"这页只讲运营学习，不宣称Data Moat。真实订单会产生用户、服务、厨房和社区四类数据，并反向改进菜单、排班、设备和照护。只有持续运营后，这些经验才可能形成壁垒。", ["Careloop adaptive UI prototype, careloop-ui-preview.html, captured 2026-08-20"]);
}

// 13
{
  const s=base(13,"站点靠人机分工运行，不靠“无人化”","TO VALIDATE / OPERATING MODEL");
  const timeline=[
    ["08:00","备餐入库","净菜 / 保温 / 检查"],
    ["11:00","午餐峰值","自动烹饪 + 人工协作"],
    ["14:00","清洁维护","清洗 / 巡检 / 备件"],
    ["17:00","晚餐 / 收档","异常复盘 / 数据记录"]
  ];
  addShape(s,"rect",85,338,760,6,C.teal2);
  timeline.forEach((d,i)=>{const x=90+i*245; dot(s,x,341,17,i===1?C.coral:C.teal); addText(s,d[0],x-46,274,92,28,19,C.navy,{bold:true,align:"center"}); addText(s,d[1],x-80,375,160,30,22,C.navy,{bold:true,align:"center"}); addText(s,d[2],x-90,416,180,50,16,C.muted,{align:"center"});});
  addShape(s,"roundRect",900,195,318,380,C.navy,{radius:"rounded-xl"});
  addText(s,"谁负责什么？",930,230,258,34,27,C.white,{bold:true});
  ["设备巡检 / 运营","社区情感服务 / 协作","异常人工接管","供应商 SLA 维护","食品安全与责任边界"].forEach((t,i)=>{addText(s,`0${i+1}`,932,300+i*50,28,24,15,C.teal2,{bold:true}); addText(s,t,972,297+i*50,210,30,19,C.white,{bold:i===2});});
  addText(s,"AI 减负 ≠ 替代陪伴",192,560,590,38,26,C.coral,{bold:true,align:"center"});
  notes(s,"站点不是无人厨房。中央或区域供应链完成净菜，设备承担标准化烹饪，工作人员负责巡检、异常和社区服务，供应商负责维护SLA。食品安全、清洗、温控和责任边界必须在试点前确认。", []);
}

// 14
{
  const s=base(14,"补贴降低进入成本，长期收入来自持续服务","BUSINESS MODEL / PLANNING MODEL");
  const cols=[
    ["G 端","政策 / 服务购买","助餐可及性与监管","进入成本降低",C.navy],
    ["B 端","物业 / 社区运营方","空间与居民服务","站点费 / 管理费 / 分成",C.teal],
    ["C 端","老人 / 家属","单餐、套餐、健康膳食","真实支付与复购",C.coral]
  ];
  cols.forEach((d,i)=>{const x=62+i*390; addShape(s,"roundRect",x,202,350,315,C.paper,{line:d[4],lineWidth:2,radius:"rounded-xl"}); addText(s,d[0],x+24,228,302,45,34,d[4],{bold:true,align:"center"}); addText(s,"PAYER",x+24,292,100,22,14,C.muted,{bold:true}); addText(s,d[1],x+24,320,302,42,21,C.navy,{bold:true}); addText(s,"VALUE",x+24,382,100,22,14,C.muted,{bold:true}); addText(s,d[2],x+24,410,302,42,20,C.ink,{bold:true}); addText(s,"REVENUE",x+24,466,100,22,14,C.muted,{bold:true}); addText(s,d[3],x+24,491,302,22,18,d[4],{bold:true});});
  addShape(s,"roundRect",265,552,750,70,C.navy,{radius:"rounded-xl"});
  addText(s,"CARELOOP：设备集成 + 软件运营费 + 服务分成",290,571,700,32,22,C.white,{bold:true,align:"center"});
  notes(s,"谁付钱、谁获益、Careloop如何收费必须分开。政策和试点资金帮助第一站进入，物业提供空间与触达，家庭支付持续服务。补贴不是长期商业模式，也不能写成已经获得的Careloop收入。", ["南山区人民政府，《南山区长者助餐服务管理办法（试行）》，2024, https://www.szns.gov.cn/xxgk/qzfxxgkml/zfgb/2024/three/content/post_12585343.html"]);
}

// 15
{
  const s=base(15,"南山首站应插入既有助餐网络，而不是另建食堂","EXTERNAL SOURCE / TO VALIDATE");
  const sites=[
    ["BENCHMARK","高发社区 / 幸福邻里","综合服务体已整合食堂、社康与长者服务","研究服务协同",C.navy],
    ["FOOD-SERVICE","既有社区食堂 / 长者餐桌","已有供给与客流，人工流程可被观察","验证运营效率",C.teal],
    ["PROPERTY-LED","物业主导社区节点","场地、居民触达与服务合作更直接","验证B端模式",C.coral]
  ];
  sites.forEach((d,i)=>{const x=62+i*390; addShape(s,"roundRect",x,205,350,355,C.paper,{line:d[4],lineWidth:2,radius:"rounded-xl"}); addText(s,d[0],x+24,231,302,22,14,d[4],{bold:true,align:"center"}); addText(s,d[1],x+24,285,302,66,27,C.navy,{bold:true,align:"center",valign:"middle"}); addText(s,d[2],x+28,379,294,74,18,C.ink,{align:"center",valign:"middle"}); pill(s,d[3],x+55,485,240,i===2?C.coralPale:C.tealPale,i===2?C.coral:C.teal);});
  addText(s,"公开场景用于筛选和访谈；不代表 Careloop 已获得合作。",280,600,720,30,21,C.coral,{bold:true,align:"center"});
  notes(s,"第一站要选择已经有助餐需求、有管理者、有老人流量的节点。高发社区是Benchmark，既有食堂适合观察运营，物业主导点适合验证B端合作。三类都只是候选场景。", ["深圳市民政局，《深圳市长者饭堂和助餐点一览表》，2026, https://mzj.sz.gov.cn/szmz/pc/bmxx/cyfwzy/content/mpost_2948869.html", "深圳市人民政府，《深圳国企打造首个社区嵌入式民生服务综合体》，2024, https://www.sz.gov.cn/cn/xxgk/zfxxgj/zwdt/content/post_11559674.html"]);
}

// 16
{
  const s=base(16,"政策、场景、运营和数据正在同一条线上","EXTERNAL SOURCE");
  const stages=[
    ["政策","多类助餐设施\n5 / 15 元补贴",C.navy],
    ["场景","饭堂 / 助餐点\n长者餐桌",C.teal],
    ["运营","食品安全\n证照 / 责任",C.coral],
    ["数据","订单 / 服务\n设备 / 介入",C.teal],
    ["复制","Site-in-a-Box\nGate 制扩张",C.navy]
  ];
  stages.forEach((d,i)=>{const x=62+i*235; addShape(s,"roundRect",x,250,196,175,d[2],{radius:"rounded-xl"}); addText(s,d[0],x+20,273,156,36,27,C.white,{bold:true,align:"center"}); addText(s,d[1],x+20,333,156,60,19,C.white,{align:"center",valign:"middle"}); if(i<4)arrowText(s,x+195,315,40,C.gray);});
  addShape(s,"roundRect",190,485,900,80,C.coralPale,{line:C.coral,lineWidth:1,radius:"rounded-xl"});
  addText(s,"补贴流向用户价格或运营成本；Careloop 是否符合资格必须逐项核验。",225,506,830,38,24,C.coral,{bold:true,align:"center"});
  notes(s,"南山已有助餐设施形式、补贴标准和食品安全要求。Careloop应进入既有政策体系，而不是假设获得创新补贴。任何资格和运营奖励都必须按主体、设施类型和申请条件核验。", ["南山区人民政府，《南山区长者助餐服务管理办法（试行）》，2024, https://www.szns.gov.cn/xxgk/qzfxxgkml/zfgb/2024/three/content/post_12585343.html", "深圳市人民政府，《深圳市基本养老服务清单（2026年版）》，2026, https://www.sz.gov.cn/attachment/1/1734/1734727/12779745.pdf"]);
}

// 17
{
  const s=base(17,"先通过 1→3→10 的 Gate，再把站点复制出去","PLANNING MODEL / TO VALIDATE");
  const phases=[
    ["0–6月","1站","ENGINEERING PILOT","政策 / 场地 / 供应商 / 合规",C.navy],
    ["6–12月","3站","ANCHOR SITES","订单密度 / 介入 / 稳定 / 支付",C.teal],
    ["12–18月","10站","SITE-IN-A-BOX","BOM / SOP / 培训 / 数据指标",C.coral],
    ["18–36月","复制","PARTNER ROLLOUT","物业 / 养老机构 / 政府采购",C.navy]
  ];
  phases.forEach((d,i)=>{const x=62+i*295; addText(s,d[0],x,190,260,28,18,d[4],{bold:true}); addShape(s,"roundRect",x,235,260,310,C.paper,{line:d[4],lineWidth:2,radius:"rounded-xl"}); addText(s,d[1],x+30,268,200,72,48,d[4],{bold:true,align:"center",valign:"middle"}); addText(s,d[2],x+25,360,210,22,15,C.muted,{bold:true,align:"center"}); addText(s,d[3],x+28,420,204,80,19,C.ink,{align:"center",valign:"middle"}); if(i<3)arrowText(s,x+258,365,37,C.gray);});
  addText(s,"每一阶段只有通过证据 Gate，才进入下一阶段。",300,590,680,32,24,C.teal,{bold:true,align:"center"});
  notes(s,"2,000万元不是今天开20家店，而是把第一套系统工程化，再把三站跑成模板。每阶段都只有一个核心Pass Gate：合规、运营、标准化、伙伴复制。", ["TeaVita AI--Maker in China.pdf, slide 11 (stage-gated narrative reference only)"]);
}

// 18
{
  const s=base(18,"RMB 20M 是商业化工程资金，不是 Demo 预算","PLANNING MODEL");
  addShape(s,"roundRect",62,205,400,360,C.paper,{line:C.gray,lineWidth:1,radius:"rounded-xl"});
  addText(s,"RMB 0.5M",95,245,334,58,46,C.gray,{bold:true,align:"center"});
  addText(s,"PROTOTYPE",95,318,334,24,16,C.muted,{bold:true,align:"center"});
  addText(s,"软件 Demo\n研究与概念验证\n有限场景测试",125,380,274,105,24,C.ink,{align:"center",valign:"middle"});
  arrowText(s,485,350,70,C.coral);
  addShape(s,"roundRect",570,190,648,390,C.navy,{radius:"rounded-xl"});
  addText(s,"RMB 20M",610,224,568,68,56,C.white,{bold:true,align:"center"});
  addText(s,"PHASE I COMMERCIALIZATION PLANNING ENVELOPE",620,305,548,25,15,C.teal2,{bold:true,align:"center"});
  const buckets=["Hardware","Site","People","Software","Compliance","Working Capital"];
  buckets.forEach((t,i)=>{pill(s,t,610+(i%3)*185,370+Math.floor(i/3)*62,165,i===4?C.coralPale:C.tealPale,i===4?C.coral:C.teal);});
  addText(s,"不是已融资，也不是供应商报价",690,525,410,28,20,"#F5C5C4",{bold:true,align:"center"});
  notes(s,"50万元适合软件原型与概念验证，不足以覆盖硬件采购集成、场地改造、合规、人员、供应链、维护和运营现金流。2,000万元必须叫Phase I planning envelope，不是已融资或精确成本。", ["AICAN Global official overview, 2026, https://www.aicanglobal.com/ (capability context; no Careloop quotation published)"]);
}

// 19
{
  const s=base(19,"每个资金桶都必须换来下一阶段的证据","PLANNING MODEL / NOT SUPPLIER QUOTATION / QUOTE REQUIRED");
  const b=[
    ["硬件工程","30%","600万",30,C.navy], ["站点改造","15%","300万",15,C.coral],
    ["软件与数据安全","12.5%","250万",12.5,C.teal], ["人员运营","15%","300万",15,C.navy2],
    ["供应链 / 物流 / 试运营","7.5%","150万",7.5,C.amber], ["合规 / 检测 / 保险","5%","100万",5,C.coral],
    ["维护备件","5%","100万",5,C.teal2], ["风险准备金","10%","200万",10,C.gray]
  ];
  let x=62; b.forEach(d=>{const w=1156*d[3]/100; addShape(s,"rect",x,210,w,74,d[4]); addText(s,d[1],x+2,232,w-4,27,Math.max(14,Math.min(22,w/4)),C.white,{bold:true,align:"center"}); x+=w;});
  b.forEach((d,i)=>{const col=i%4,row=Math.floor(i/4); const bx=62+col*290,by=330+row*130; addShape(s,"roundRect",bx,by,270,105,C.paper,{line:d[4],lineWidth:2,radius:"rounded-xl"}); addText(s,d[0],bx+18,by+15,234,27,18,C.navy,{bold:true}); addText(s,`${d[1]} · ${d[2]}`,bx+18,by+54,234,29,24,d[4],{bold:true});});
  addText(s,"TOTAL 100% · RMB 20M",420,598,440,32,25,C.navy,{bold:true,align:"center"});
  notes(s,"这八个桶合计100%、2,000万元。它是团队规划模型，不是AICAN或任何供应商报价。拿到设备、工程、人员和运营正式报价后必须重算；每个桶都应绑定可验证结果。", []);
}

// 20
{
  const s=base(20,"不先承诺回本期，让真实变量决定回本","PLANNING MODEL / TO VALIDATE");
  const formulas=[
    ["REVENUE / SITE / MONTH","paid orders × average ticket × operating days + eligible support"],
    ["CONTRIBUTION","revenue − food / packaging − variable payment / logistics"],
    ["SITE CASH CONTRIBUTION","contribution − staff − utilities − maintenance − software − site fee"],
    ["PAYBACK","net initial CapEx ÷ monthly site cash contribution"]
  ];
  formulas.forEach((d,i)=>{const y=192+i*93; addText(s,d[0],62,y,285,22,15,i===3?C.coral:C.teal,{bold:true}); addShape(s,"roundRect",350,y-8,540,62,C.paper,{line:i===3?C.coral:C.line,lineWidth:1,radius:"rounded-xl"}); addText(s,d[1],372,y+8,496,30,18,C.ink,{bold:true,align:"center",valign:"middle"});});
  addText(s,"SCENARIOS",945,184,270,24,16,C.muted,{bold:true,align:"center"});
  [["CONSERVATIVE",C.gray],["BASE",C.teal],["UPSIDE",C.coral]].forEach((d,i)=>{const y=225+i*120; addShape(s,"roundRect",940,y,280,96,C.paper,{line:d[1],lineWidth:2,radius:"rounded-xl"}); addText(s,d[0],960,y+17,240,24,18,d[1],{bold:true,align:"center"}); addText(s,"Orders / AOV / Cost / CapEx",958,y+54,244,22,16,C.muted,{align:"center"});});
  addText(s,"待实测：订单密度 · 客单价 · 食材成本 · 每单人工分钟 · 维护成本 · CapEx",190,585,900,38,20,C.coral,{bold:true,align:"center"});
  notes(s,"这页替代旧版8个月回本。评委看到的是公式和三种情景输入框，而不是无依据的漂亮数字。真实订单、客单价、成本、人工介入和设备CapEx拿到后，才锁定回本期。", []);
}

// 21
{
  const s=base(21,"从一个社区节点，变成可复制的养老服务基础设施","PLANNING MODEL / TO VALIDATE");
  const values=[
    ["家庭","远程代点 · 用餐记录 · 安心",90,215,C.coral],
    ["物业","空间利用 · 居民黏性 · 服务差异",90,345,C.teal],
    ["政府","助餐效率 · 服务覆盖 · 数据化监管",90,475,C.navy],
    ["Careloop","集成服务 · 软件运营费 · 服务分成",770,215,C.navy],
    ["逐步形成的壁垒","软硬件集成 · 社区 SOP · 人工协作 · 数据 · 网络",770,345,C.teal]
  ];
  values.forEach(d=>box(s,d[2],d[3],420,105,d[0],d[1],d[4],{bodySize:18,titleSize:22}));
  addShape(s,"ellipse",530,247,210,210,C.coral);
  addText(s,"RMB 20M\nPHASE I\nFUNDING TARGET",557,294,156,120,30,C.white,{bold:true,align:"center",valign:"middle"});
  addText(s,"ASK",585,467,100,28,16,C.muted,{bold:true,align:"center"});
  addText(s,"政策入口 · 1–3个南山 Anchor Sites · 产业伙伴 · Phase I 资金 · 战略投资",300,515,680,58,21,C.navy,{bold:true,align:"center"});
  addText(s,"Machines handle the labor. Careloop makes care continuous.",220,608,840,34,25,C.coral,{bold:true,align:"center"});
  notes(s,"我们寻找的不是一笔钱把概念铺开，而是政策入口、一个真实社区、一套产业伙伴和一笔把工程化、试点与标准化跑通的Phase I资本。最终价值同时服务家庭、物业、政府和Careloop。", []);
}

// Appendix helper
function appendix(n,title,label="APPENDIX / WORKING MODEL") { return base(n,title,label,"CARELOOP · APPENDIX"); }

// 22 A
{
  const s=appendix(22,"A. 技术与数据架构","VALIDATED / DEMO / TO VALIDATE");
  const layers=[
    ["CHANNELS","Elder UI · Family UI · Staff Queue · Ops Console",C.coral],
    ["SERVICE","Intent · Confirmation · Order State · Human Assist",C.teal],
    ["ADAPTERS","Payment · Kitchen · Conveyor · Notifications",C.amber],
    ["DATA","Orders · Preferences · Exceptions · Device · Metrics",C.navy]
  ];
  layers.forEach((d,i)=>{const y=190+i*92; addShape(s,"roundRect",130,y,1020,67,C.paper,{line:d[2],lineWidth:2,radius:"rounded-xl"}); addText(s,d[0],158,y+18,180,26,17,d[2],{bold:true}); addText(s,d[1],350,y+17,760,30,20,C.ink,{bold:true});});
  addText(s,"Security gates: consent · least privilege · retention · audit log · incident response",190,585,900,30,19,C.coral,{bold:true,align:"center"});
  notes(s,"附录技术图只展示职责边界。Channels和Order State属于当前Demo方向；Payment、Kitchen、Conveyor等仍是适配器假设；数据安全控制需要工程化实现。", []);
}

// 23 B
{
  const s=appendix(23,"B. AICAN 能力与集成边界","EXTERNAL SOURCE / INTEGRATION PLAN");
  box(s,62,200,520,380,"可引用的 AICAN 官方能力","机器人烹饪硬件\n智能操作系统与 HMI\n菜谱 / 机器管理\nAican Cloud 多设备运营\n自动调味、烟气处理、自清洁\n部分产品公开国际认证信息",C.navy,{bodySize:21});
  box(s,698,200,520,380,"Careloop 必须自行验证","本项目正式设备选型与报价\n安装条件 / 消防 / 给排水 / 通风\n菜单与老年营养适配\n接口、SLA 与备件\n峰值稳定性与人工 Plan B\n知识产权与商业合作条款",C.coral,{bodySize:21});
  arrowText(s,590,345,95,C.coral);
  notes(s,"左侧是官网可支持的能力，右侧是Careloop项目必须取得报价、测试或合同才能确认的事项。任何集成图都不等于已签合作。", ["AICAN Global official overview, 2026, https://www.aicanglobal.com/", "AICAN corporate profile, https://aicanwang.cn/index/aboutUs/company_profile"]);
}

// 24 C
{
  const s=appendix(24,"C. Site BOM 与正式报价状态","QUOTE REQUIRED");
  const rows=[
    ["烹饪核心","AICAN / 其他设备选型","供应商正式报价 + SLA","OPEN"],
    ["辅助设备","煮饭、保温、储藏、清洗","型号 / 数量 / 认证","OPEN"],
    ["站点工程","水电、消防、排烟、适老化","现场勘察 + 工程报价","OPEN"],
    ["软件接口","设备、支付、通知、运营端","接口文档 + 集成测试","OPEN"],
    ["维护备件","关键备件、响应时间、Plan B","SLA + 备件清单","OPEN"],
    ["运营物料","餐具、包装、清洁、网络","试运营采购清单","OPEN"]
  ];
  const xs=[62,270,610,970], ws=[208,340,360,248];
  ["模块","当前范围","锁定所需证据","状态"].forEach((t,i)=>{addShape(s,"rect",xs[i],190,ws[i],48,C.navy); addText(s,t,xs[i]+12,202,ws[i]-24,25,17,C.white,{bold:true,align:i===3?"center":"left"});});
  rows.forEach((r,j)=>{const y=238+j*61; r.forEach((t,i)=>{addShape(s,"rect",xs[i],y,ws[i],61,j%2?C.paper:"#F5F1EA",{line:C.line,lineWidth:1}); addText(s,t,xs[i]+12,y+16,ws[i]-24,31,i===3?16:18,i===3?C.coral:C.ink,{bold:i===0||i===3,align:i===3?"center":"left",valign:"middle"});});});
  notes(s,"这张BOM状态表故意不填设备单价。每一个OPEN项都要由正式报价、现场勘察或接口测试关闭。", []);
}

// 25 D
{
  const s=appendix(25,"D. 食品安全、数据隐私与责任边界","EXTERNAL SOURCE / TO VALIDATE");
  const rs=[
    ["食品安全","持证主体 · 供应链 · 温控 · 清洗 · 留样","合规通过",C.coral],
    ["设备安全","安装验收 · 日检 · 备件 · SLA · 人工 Plan B","峰值稳定",C.navy],
    ["AI 识别","预览确认 · 置信度 · 人工接管 · 复盘","介入可控",C.teal],
    ["数据隐私","最小采集 · 授权 · 权限 · 留存 · 审计","隐私评审",C.amber]
  ];
  rs.forEach((d,i)=>{const y=200+i*100; addShape(s,"roundRect",62,y,1156,78,C.paper,{line:d[3],lineWidth:2,radius:"rounded-xl"}); addText(s,d[0],88,y+22,170,30,22,d[3],{bold:true}); addText(s,d[1],280,y+19,650,36,19,C.ink,{bold:true}); pill(s,d[2],980,y+21,205,i===0?C.coralPale:C.tealPale,i===0?C.coral:C.teal);});
  addText(s,"责任边界必须写入合同、SOP、培训和事故响应流程，而不是留在免责声明里。",205,600,870,30,20,C.coral,{bold:true,align:"center"});
  notes(s,"南山办法明确要求食品安全证照、制度和公示。Careloop还要建立设备、AI和数据责任边界，并把它们落到合同、SOP、培训和事件响应。", ["南山区人民政府，《南山区长者助餐服务管理办法（试行）》，2024, https://www.szns.gov.cn/xxgk/qzfxxgkml/zfgb/2024/three/content/post_12585343.html"]);
}

// 26 E
{
  const s=appendix(26,"E. Unit Economics 三情景输入模型","PLANNING MODEL / TO VALIDATE");
  const vars=["Paid orders / day","Average ticket","Food + packaging %","Staff hours / order","Utilities + maintenance","Net initial CapEx"];
  const heads=[["CONSERVATIVE",C.gray],["BASE",C.teal],["UPSIDE",C.coral]];
  heads.forEach((d,i)=>{const x=445+i*250; addShape(s,"rect",x,190,230,50,d[1]); addText(s,d[0],x+10,203,210,25,17,C.white,{bold:true,align:"center"});});
  vars.forEach((v,j)=>{const y=240+j*58; addShape(s,"rect",62,y,383,58,j%2?C.paper:"#F5F1EA",{line:C.line,lineWidth:1}); addText(s,v,82,y+17,340,27,18,C.ink,{bold:true}); heads.forEach((d,i)=>{const x=445+i*250; addShape(s,"rect",x,y,230,58,C.paper,{line:C.line,lineWidth:1}); addText(s,"INPUT",x+20,y+17,190,25,17,C.muted,{bold:true,align:"center"});});});
  addText(s,"Outputs: contribution / order · site cash contribution / month · payback range",240,612,800,27,19,C.navy,{bold:true,align:"center"});
  notes(s,"这是待填的三情景底稿。正式模型必须由真实支付订单、食材成本、每单人工分钟、维护成本和CapEx驱动。", []);
}

// 27 F
{
  const s=appendix(27,"F. Risk → Control → Gate","PLANNING MODEL / TO VALIDATE");
  const rows=[
    ["食品安全","供应链 / 温控 / 清洗 / 责任","合规通过"],
    ["设备故障","冗余 / 备件 / SLA / 人工 Plan B","峰值稳定"],
    ["AI 误识别","预览确认 / 置信度 / 人工接管","介入可控"],
    ["用户不付费","真实支付 / 套餐测试","复购"],
    ["站点成本过高","合作场地 / 租赁 / 供应商分担","单位经济"],
    ["扩张过快","1→3→10 分阶段扩张","Gate 制"],
  ];
  ["RISK","CONTROL","PASS GATE"].forEach((t,i)=>{const x=[62,350,930][i],w=[288,580,288][i]; addShape(s,"rect",x,190,w,48,i===0?C.coral:i===1?C.navy:C.teal); addText(s,t,x+15,202,w-30,24,17,C.white,{bold:true,align:"center"});});
  rows.forEach((r,j)=>{const y=238+j*61; const colors=[C.coral,C.ink,C.teal]; r.forEach((t,i)=>{const x=[62,350,930][i],w=[288,580,288][i]; addShape(s,"rect",x,y,w,61,j%2?C.paper:"#F5F1EA",{line:C.line,lineWidth:1}); addText(s,t,x+14,y+16,w-28,30,18,colors[i],{bold:i!==1,align:i===2?"center":"left",valign:"middle"});});});
  notes(s,"风险不是免责声明，而是资本如何按Gate释放。每个主要风险都有控制机制和可观察的Pass Gate。", []);
}

// 28 G
{
  const s=appendix(28,"G. 0–360 日南山 Pilot SOP 与指标","PLANNING MODEL / TO VALIDATE");
  const phases=[
    ["0–30 日","进入社区","场地勘察 · 访谈 · 报价 · 责任边界","候选点 / 报价 / 合规清单",C.navy],
    ["31–90 日","工程 Pilot","安装调试 · 状态接入 · SOP · 全流程测试","可运行闭环 / Plan B",C.teal],
    ["91–180 日","商业 Pilot","真实支付 · 复购 · 每单人工 · 设备利用","单位经济 / 续约意向",C.coral],
    ["180–360 日","标准化","BOM · SOP · 合同 · 培训 · 数据指标","Site-in-a-Box",C.navy]
  ];
  phases.forEach((d,i)=>{const x=62+i*295; addText(s,d[0],x,190,260,28,18,d[4],{bold:true}); addShape(s,"roundRect",x,235,260,340,C.paper,{line:d[4],lineWidth:2,radius:"rounded-xl"}); addText(s,d[1],x+24,265,212,36,26,C.navy,{bold:true,align:"center"}); addText(s,"WORK",x+25,330,210,20,14,C.muted,{bold:true,align:"center"}); addText(s,d[2],x+26,365,208,80,18,C.ink,{align:"center",valign:"middle"}); addText(s,"OUTPUT",x+25,470,210,20,14,C.muted,{bold:true,align:"center"}); addText(s,d[3],x+26,502,208,48,17,d[4],{bold:true,align:"center"}); if(i<3)arrowText(s,x+258,380,37,C.gray);});
  notes(s,"Pilot从场景进入、工程闭环、真实支付到标准化共四阶段。每阶段都有明确工作和输出，避免只描述时间、不描述证据。", []);
}

// 29 H
{
  const s=appendix(29,"H. 团队能做什么，以及必须补齐谁","TEAM / PARTNER GAPS");
  const rows=[
    ["产品 / 用户","适老场景理解 · UI / 交互原型","社区运营 / 养老机构"],
    ["营养 / 菜单","应用生物与生物技术背景","临床营养顾问 / 食品安全"],
    ["工业设计 / 硬件","工业设计 · 3D 建模","AICAN / 机电工程 / 设备集成"],
    ["软件 / AI","语音 · UI · 订单状态 · 人工协作","数据安全 / 云运维"],
    ["商业化","商业模型 · 比赛叙事","物业集团 / 政府项目 / 投资人"],
    ["站点运营","概念运营模型","真实站点运营负责人"]
  ];
  const xs=[62,300,720],ws=[238,420,498];
  ["能力","现有团队","必须补齐的产业伙伴"].forEach((t,i)=>{addShape(s,"rect",xs[i],190,ws[i],48,i===2?C.coral:C.navy); addText(s,t,xs[i]+12,202,ws[i]-24,25,17,C.white,{bold:true,align:"center"});});
  rows.forEach((r,j)=>{const y=238+j*61; r.forEach((t,i)=>{addShape(s,"rect",xs[i],y,ws[i],61,j%2?C.paper:"#F5F1EA",{line:C.line,lineWidth:1}); addText(s,t,xs[i]+14,y+15,ws[i]-28,32,18,i===2?C.coral:C.ink,{bold:i!==1,align:i===0?"center":"left",valign:"middle"});});});
  addText(s,"Phase I 资本必须同时购买工程化能力、站点运营能力与产业协作能力。",240,618,800,28,20,C.teal,{bold:true,align:"center"});
  notes(s,"团队页不展示谁讲哪一页，而是说明当前能做什么，以及商业化必须补齐哪些专业伙伴。团队姓名和正式履历尚未提供，因此没有虚构。", ["Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx (team capability framework)"]);
}

async function writeBlob(path, blob) {
  await fs.writeFile(path, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(RENDER, { recursive: true });
  for (const [i, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(i+1).padStart(2,"0")}`;
    await writeBlob(`${RENDER}/${stem}.png`, await presentation.export({ slide, format: "png", scale: 1 }));
    await fs.writeFile(`${RENDER}/${stem}.layout.json`, await (await slide.export({ format: "layout" })).text());
  }
  await writeBlob(`${RENDER}/deck-montage.webp`, await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(OUT);
  const snapshot = await presentation.inspect({ kind: "slide,textbox,shape,image,notes", maxChars: 200000 });
  await fs.writeFile(`${RENDER}/inspection.ndjson`, snapshot.ndjson);
}

main().catch(err => { console.error(err); process.exitCode = 1; });
