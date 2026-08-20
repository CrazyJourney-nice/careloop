# Careloop Maker in China Hong Kong 2026｜ChatGPT Slides 具体使用指导书 v3

版本：v3.0  
用途：使用 ChatGPT 生成一份独立于 Skywork 版本的 Careloop 21 页比赛 Slides  
内容主依据：`Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx`  
建议输出：可编辑 PPTX + PDF 备份  
建议路演时长：8–10 分钟

---

## 0. 先选择正确的 ChatGPT 路径

### 推荐路径：ChatGPT for PowerPoint

这是本项目的首选。ChatGPT 直接运行在 Microsoft PowerPoint 侧栏中，可以从资料生成初稿、添加或修改 slides、审查叙事，并尽量保留可编辑的 PowerPoint 结构。

适合本项目的原因：

- 最终交付就是 PPTX，不需要从聊天文字手工搬运；
- 可以明确要求“只修改指定 slides，不改变其他页”；
- 可以在生成后直接用 PowerPoint 母版、对齐、字体和视频工具终修；
- 可以先让 ChatGPT 给修改计划，再执行大批量编辑。

官方说明：[ChatGPT for PowerPoint](https://help.openai.com/en/articles/20001242-chatgpt-for-powerpoint)

### 备选路径：ChatGPT Work + Google Slides

如果 PowerPoint 加载项不可用，但账户可以使用 ChatGPT Work 和 Google Workspace app，可让 ChatGPT 创建原生 Google Slides，再下载为 PPTX。

需要注意：

- 管理员必须允许 Google Workspace app 和相关写入动作；
- PowerPoint 不属于 ChatGPT Work 桌面流程的初始支持范围，因此不要假设 Work 能直接控制桌面 PowerPoint；
- Google Slides 下载成 PPTX 后仍需检查字体、换行、图表和视频。

官方说明：[ChatGPT Work 文件创建与编辑](https://help.openai.com/en/articles/20001278-creating-and-editing-documents-spreadsheets-and-presentations-with-chatgpt-work)

### 只用普通 ChatGPT 网页聊天

普通 ChatGPT Project 很适合保存文件、证据审计、锁定目录、撰写逐页内容和生成视觉素材。是否能直接返回可下载 PPTX 会受套餐、工作区设置和当前产品界面影响。

如果聊天中没有可用的演示文稿创建工具，不要让 ChatGPT 假装已经生成 PPTX；让它输出经过审计的 21 页 slide specification，再在 ChatGPT for PowerPoint 中落版。

---

## 1. 推荐工作流总览

```text
建立 ChatGPT Project
→ 上传 v3 与参考资料
→ 写入 Project Instructions
→ 做证据审计
→ 锁定 21 页目录
→ 安装并打开 ChatGPT for PowerPoint
→ 创建 16:9 空白 PPTX
→ 分四批生成 21 页
→ 逐页修订与来源审计
→ PowerPoint 全屏检查
→ 保存 PPTX 并导出 PDF
```

不要用一句“根据附件帮我做一份 PPT”直接开始。Careloop 的旧版材料包含与 v3 冲突的金额、落地范围和回本结论，必须先完成证据审计。

---

## 2. 在 ChatGPT 中建立项目资料库

### 2.1 新建 Project

1. 打开 [ChatGPT](https://chatgpt.com/) 并登录。
2. 在左侧边栏点击 `New project`。
3. 项目名建议使用：`Careloop MICHK 2026 Slides`。
4. 打开项目右上角三点菜单，进入 `Project settings`。
5. 如果准备使用 ChatGPT Work，不要选择会令 Work 不可用的 `project-only memory` 配置；以当前账户界面和管理员设置为准。

Projects 可以把聊天、上传文件和项目指令集中在一个工作区。官方说明：[Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt)。

### 2.2 上传核心文件

在 Project 的 Sources 区域或聊天输入框的工具菜单中选择 `Add photos or files`，上传：

1. `Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx`
2. `Group 5-暖桌Careloop.pdf`
3. `TeaVita AI--Maker in China.pdf`
4. 本文件：`Careloop_Maker_in_China_HK_2026_ChatGPT_Slides_Usage_Guide_v3.md`

再上传：

- Careloop Logo；
- 老人端、家属端、工作人员端、厨房端和运营端真实 UI；
- 正常订单与失败转人工 Demo；
- AICAN 官方产品图片和公开来源；
- 深圳/南山政府材料或 URL；
- 团队真实照片和履历；
- 已有的正式报价、BOM、SLA 或合作证明。

ChatGPT 支持常见 DOCX、PPTX、PDF、TXT 等文件格式；具体数量限制随套餐和工作区设置变化。

### 2.3 Project Instructions（整段复制）

将下面内容写入 `Project settings → Project instructions`：

```text
你是 Careloop Maker in China Hong Kong 2026 路演项目的演示文稿策略师、PowerPoint 设计师和事实审稿人。

资料优先级：
1. 文件名包含 PPT_Optimization_Guide_v3 的 DOCX 是内容、页数、证据边界、深圳南山 Pilot 和 RMB 20M 资金逻辑的唯一最高规范。
2. Careloop 当前真实 UI、Demo、代码、测试、团队、报价和已签文件决定什么可以称为当前成果。
3. 旧版 Group 5 PDF 只用于复用 SHARE、情感表达、三层系统和仍适用素材；不得沿用 14 页、7 分钟、50 万元、10 社区、70% 自动化、8 个月回本、广州/GBA 等旧结论。
4. TeaVita PDF 只用于参考比赛叙事完整度和阶段化进入逻辑，不得复制其数据、内容、绿色视觉或轻资产结论。

所有主张必须分类：
VALIDATED / EXTERNAL SOURCE / DEMO ASSUMPTION / TO VALIDATE / PLANNING MODEL / QUOTE REQUIRED。

禁止编造用户、收入、复购、合作、补贴资格、准确率、节省比例、报价、硬件部署或回本期。
不得把 AICAN 能力写成 Careloop 自研或已签合作。
RMB 20M 必须写成 Phase I commercialization funding target / planning envelope，不是已融资或供应商报价。

主 deck 固定为 21 页、16:9、8–10 分钟。每页一个结论，正文不小于 16 pt。产品页只使用真实 UI；缺失素材使用明确占位，不生成假产品截图、假合同、假报价或假政府文件。

所有外部非平凡主张和外部图片，在 speaker notes 中加入 [Sources] 区块，写可读来源名称、标题、年份和 URL。不得输出 turn0search、filecite 或其他内部工具标记。

执行大批量 PPT 修改前先输出计划；除非我明确批准，不要改变已经锁定的 21 页顺序、证据标签、金额或事实边界。
```

---

## 3. 在 Project 中先做内容与证据审计

新建聊天 `01 Evidence Audit`，上传文件确认后发送：

```text
先不要生成 PPTX，也不要设计页面。

完整读取项目中的 v3 优化指导书、旧版 Careloop PDF、TeaVita PDF 和所有真实产品素材。

输出以下内容：
1. VALIDATED：当前真实 UI、Demo、代码或测试支持的能力；
2. EXTERNAL SOURCE：政府、AICAN 和行业来源支持的事实；
3. DEMO ASSUMPTION：演示菜单、角色、订单和 adapter；
4. TO VALIDATE：真实社区、用户、支付、复购、设备、合作、报价和单位经济；
5. PLANNING MODEL：RMB 20M、资金分配、扩张阶段和财务情景；
6. QUOTE REQUIRED：所有需要正式供应商/工程报价的项目；
7. MISSING ASSETS：缺失的 UI、Demo、图片、URL、团队信息和证明文件；
8. DELETE FROM OLD VERSION：与 v3 冲突、必须从新 deck 删除的旧结论。

逐条注明来自哪个文件。无法确认时标 UNKNOWN，不得推测。
最后给出“是否已具备生成 21 页初稿的最低资料条件”。
```

审计结果通过后，打开回答菜单，将其 `Save to project / Add to project sources`，命名为 `Careloop Evidence Register`，供后续聊天复用。

---

## 4. 锁定 21 页目录

新建聊天 `02 Deck Architecture`，发送：

```text
基于 v3 优化指导书和已保存的 Careloop Evidence Register，先规划，不生成 PPTX。

输出严格的 21 页主 deck 目录。每页包括：
- 页码；
- 一句话结论式标题；
- 该页唯一叙事任务；
- 主要证据；
- 主要视觉；
- 证据标签；
- speaker notes 的核心讲法；
- 预计时长。

必须遵守以下页序：
1 定位；2 深圳/老龄政策机会；3 南山验证场；4 SHARE；5 方案缺口；
6 产品总览；7 硬件工作流；8 AICAN 与 Careloop 边界；9 订单操作系统；
10 四终端；11 正常+失败转人工 Demo；12 Operational Learning；
13 站点日常运营；14 商业模式；15 南山首站；16 政策进入；17 1→3→10 Gate；
18 为什么需要 RMB 20M；19 资金分配；20 Unit Economics；21 价值、壁垒与 Ask。

主 deck 不增加 Agenda、独立 Team 或 Thank You 页。团队、技术、BOM、合规、财务情景、风险和 Pilot SOP 放附录。

检查 21 页预计总时长是否为 8–10 分钟，并指出素材缺口。
```

确认目录没有合并、缺页或旧版回退后，回复：

```text
目录批准。请把该目录保存为项目来源 `Locked 21-Slide Architecture`。后续任何 PPT 生成或编辑必须保持这 21 页的顺序、含义、证据标签和金额不变；附录另计。
```

---

## 5. 安装 ChatGPT for PowerPoint

### 5.1 个人安装

1. 打开 Microsoft PowerPoint。
2. 进入 `Home`。
3. 点击 `Add-ins`。
4. 搜索 `ChatGPT`。
5. 添加后，从 PowerPoint ribbon 打开 ChatGPT。
6. 使用具有访问权限的 ChatGPT 账户登录。

### 5.2 公司设备无法安装

如果 Microsoft Store 被禁用，需要 Microsoft 365 管理员部署官方 manifest：

1. 管理员进入 Microsoft 365 admin center；
2. 打开 `Integrated apps`；
3. 选择 `Deploy Add-in`；
4. 选择 `Upload custom apps`；
5. 上传 OpenAI 官方 manifest；
6. 分配给对应用户或组；
7. 如使用 RBAC，管理员需确认加载项已启用。

不要从非官方来源安装名称相似的 PowerPoint 加载项。安装入口和管理员流程以 OpenAI 官方说明为准。

---

## 6. 建立 PowerPoint 工作文件

1. 在 PowerPoint 新建空白演示文稿。
2. 设置 `Design → Slide Size → Widescreen (16:9)`。
3. 立即另存为：`Careloop_MICHK_2026_ChatGPT_v0_blank.pptx`。
4. 设计主题可先保持简单，不要先套用旧版 Careloop 的完整母版。
5. 打开 ChatGPT 侧栏。
6. 如果侧栏提供 `+`，添加项目中可用的 Skills、apps 或来源；至少让 ChatGPT 能读取 v3 指导书和锁定目录。
7. 如果无法从 PowerPoint 侧栏访问 Project 来源，将 `Careloop Evidence Register` 和 `Locked 21-Slide Architecture` 的内容复制到首条消息，或以文件形式附加。

每次大改前先复制文件。例如：

- `v0_blank`：空白文件；
- `v1_structure`：完成 21 页结构；
- `v2_content`：完成内容；
- `v3_visual`：完成视觉；
- `final`：终检版本。

---

## 7. PowerPoint 侧栏第一条 Prompt：先计划，不编辑

```text
你现在位于 Microsoft PowerPoint 中。先不要创建、删除或修改任何 slide。

请读取 v3 优化指导书、Careloop Evidence Register 和 Locked 21-Slide Architecture。

给出你准备如何在当前空白 16:9 演示文稿中建立 21 页主 deck 的执行计划：
- 每批创建哪些 slides；
- 每页使用什么布局类型；
- 使用哪些真实素材；
- 哪些位置必须保留占位；
- 如何写入 speaker notes 的 [Sources]；
- 如何保证旧版 50 万、8 个月回本和虚构合作不进入新 deck；
- 如何在生成后检查重叠、溢出、字体和数字。

不要编辑文件。等待我批准计划。
```

只有计划符合 v3 才回复：

```text
计划批准。按以下四批执行，每完成一批就停止并报告新增 slide 编号、发现的缺失素材和需要人工确认的事实。未经批准不要继续下一批。
```

---

## 8. 分四批生成 21 页

分批生成比一次要求 21 页更容易发现事实越界和格式错误。每批完成后保存一个新版本。

### Batch 1｜Slides 1–5

```text
现在只创建 Slides 1–5，不创建附录，不修改已存在的其他内容。

Slide 1：Careloop 把社区助餐升级成可持续照护服务节点；真实 UI Hero；状态为 software/interactions demo → engineering pilot。
Slide 2：深圳已把长者助餐纳入基础服务；只使用 v3 支持且有政府来源的三个数据。
Slide 3：南山已有助餐网络，Careloop 增加智能协作层；候选场景不得写成已签约。
Slide 4：SHARE = Hardware / Space / People / Data；强调社区规模经济。
Slide 5：现有方案通常覆盖一段，Careloop 连接发起、确认、履约、异常与家庭连接。

要求：
- 结论式标题；每页最多 3 个支撑点；
- 只使用真实 UI 或明确占位；
- 右下角显示证据标签；
- 外部主张在 speaker notes 添加 [Sources]；
- 使用暖白背景、深蓝标题、青绿产品流程、珊瑚红关键风险/Ask；
- 标题至少 35 pt，正文至少 16 pt；
- 不加入 Agenda、团队页或 Thank You。

完成后停止，列出创建的 5 页和需要修正的问题。
```

### Batch 2｜Slides 6–12

```text
在当前文件中只创建 Slides 6–12。保持 Slides 1–5 不变。

Slide 6：四层 Community Care Station——硬件、服务软件、交互与人、数据运营；最多 4 层 6 节点。
Slide 7：备餐→烹饪→装盘/传送→交付→清洁的硬件工作流；每个节点绑定运营结果。
Slide 8：左侧 AICAN 官方能力，右侧 Careloop 社区服务层，中间为 integration plan；清楚分开知识产权和合作状态。
Slide 9：Order ID、Intent/Preference、Confirmation、状态机和 Human Assist；突出人工接管。
Slide 10：老人、家属、工作人员、运营四个真实终端；动作词为自己点、帮他点、接住异常、产生数据。
Slide 11：正常订单和 AI 不确定→人工接管两条 Demo 路径；准备视频与六张截图备份。
Slide 12：订单数据流向 Menu / Staffing / Equipment / Care；标题使用 Operational Learning，不写已形成 Data Moat。

要求：
- 产品页优先真实 UI 与真实 AICAN 官方图；
- 不生成假 UI、假硬件部署或假接口；
- 支付、AICAN、传送带等 adapter 标 DEMO ASSUMPTION；
- 所有 AICAN 来源写入 speaker notes [Sources]；
- 保持与前 5 页一致的视觉系统，但相邻页面不要都使用四卡片布局。

完成后停止并报告。
```

### Batch 3｜Slides 13–17

```text
在当前文件中只创建 Slides 13–17。保持 Slides 1–12 不变。

Slide 13：一天运营时间轴，回答谁运营、谁维护、谁处理异常；明确人机分工不等于无人化。
Slide 14：G/B/C 与 Careloop 的 Payer–Value–Revenue；补贴降低进入成本，不是长期商业模式。
Slide 15：南山首站插入既有助餐网络；显示 Benchmark / Food-service site / Property-led site 三类候选，不宣称已合作。
Slide 16：政策→场景→运营→数据→复制；补贴流向用户价格或运营成本，不画成已获得收入。
Slide 17：0–6、6–12、12–18、18–36 月四阶段；1→3→10 Gate；形成 Site-in-a-Box 后再复制。

所有候选、政策资格、续约、真实支付和扩站均按事实标 EXTERNAL SOURCE、TO VALIDATE 或 PLANNING MODEL。完成后停止并报告。
```

### Batch 4｜Slides 18–21

```text
在当前文件中只创建 Slides 18–21。保持 Slides 1–17 不变。

Slide 18：RMB 0.5M Prototype 对比 RMB 20M Phase I Commercialization Planning Envelope；说明硬件、站点、人员、软件、合规和 Working Capital。
Slide 19：八个资金桶，合计 RMB 20M / 100%：
硬件工程 30%=600 万；站点改造 15%=300 万；软件与数据安全 12.5%=250 万；人员运营 15%=300 万；供应链物流试运营 7.5%=150 万；合规检测保险 5%=100 万；维护备件 5%=100 万；风险准备金 10%=200 万。
Slide 20：只显示 Revenue、Contribution、Site cash contribution、Payback 四个公式和 Conservative/Base/Upside 输入框；不填无依据数字，不写 8 个月回本。
Slide 21：家庭、物业、政府、Careloop 四类价值；逐步形成的壁垒；五项 Ask：政策入口、1–3 个南山 Anchor Sites、产业伙伴、RMB 20M Phase I Funding Target、战略投资。

Slide 19 页脚必须写 PLANNING MODEL / NOT SUPPLIER QUOTATION / QUOTE REQUIRED。
Slide 21 不能变成普通 Thank You 页面，结尾句为：Machines handle the labor. Careloop makes care continuous.

完成后停止并报告。
```

---

## 9. 生成附录

主 deck 21 页通过后再发送：

```text
在 Slide 21 后创建 8 页附录，不改变主 deck：
A. 技术与数据架构；
B. AICAN 能力与集成边界；
C. Site BOM 与正式报价状态；
D. 食品安全、数据隐私与责任边界；
E. Unit Economics 三情景输入模型；
F. Risk → Control → Gate 风险矩阵；
G. 0–360 日南山 Pilot SOP 与指标；
H. 团队现有能力、负责人和必须补齐的产业伙伴。

附录允许更高信息密度，但正文不得低于 14 pt。所有未取得的数据、报价、认证和合作使用明确占位，不得自动补写。
```

---

## 10. 逐页修改方法

ChatGPT for PowerPoint 的修改指令必须说明：**改哪一页、改什么、保留什么、其他页是否不变**。

### 内容正确，只改布局

```text
只修改 Slide [页码]。保留标题、事实、数字、来源、speaker notes 和证据标签不变。将页面改成一个主构图，减少卡片，放大主要 UI/图表；标题至少 35 pt，正文至少 18 pt；不要修改其他 slides。
```

### 布局正确，只修事实

```text
只修改 Slide [页码] 的可见文案和证据标签，保留当前布局。删除无法验证的用户、收入、合作、准确率、节省和回本主张；AICAN 能力归属 AICAN；候选场景标 TO VALIDATE；预算标 PLANNING MODEL；不要修改其他 slides。
```

### 替换假 UI

```text
只修改 Slide [页码]。删除当前生成的产品 UI 图片，用附件 [真实文件名] 替换。裁切到 [关键按钮/订单状态/异常队列] 在投影上清楚可读。不得重绘或虚构界面，不要改变页面标题和其他 slides。
```

### 增加来源

```text
审查 Slide [页码] 的所有外部主张和图片。在 speaker notes 追加 [Sources] 区块，写来源机构、资料标题、年份和公开 URL。无法验证的主张改成明确占位或删除。不要把来源变成页面正文，不要修改其他 slides。
```

### 标题减字

```text
只修改 Slide [页码] 的标题与正文长度，不改变含义、数字和证据标签。标题改成自然的结论句并控制在两行以内；可见正文最多 3 个支撑点；优先删字，不缩小字体。
```

### 批量修改前先计划

```text
先不要编辑。列出你准备修改的 slide 编号、每页问题、拟采取的修改和必须保留的内容。等待我批准后再执行。
```

---

## 11. 全局审计 Prompts

### 11.1 事实与证据

```text
先审计，不编辑。逐页搜索：已、获得、合作、签约、用户、收入、复购、准确率、节省、回本、部署、稳定，以及所有金额、百分比和数量。

输出表格：Slide｜主张｜当前证据｜应有标签｜问题｜建议处理。
重点检查 AICAN 归属、南山候选场景、RMB 20M Planning Envelope、Slide 19 合计 100%、Slide 20 无 8 个月承诺。
```

审计通过后再发送：

```text
按刚才批准的审计表修复对应 slides。只修改表中列出的内容；不要改变无问题页面、21 页顺序和视觉主题。
```

### 11.2 视觉与可读性

```text
先审计，不编辑。检查所有 slides 的标题换行、正文小于 16 pt、重叠、溢出、裁切、低清图片、左右边距、页码、来源和证据标签。输出问题页码和修复计划。不要以缩小字体作为首选修复。
```

### 11.3 叙事与时长

```text
作为比赛评委审查 Slides 1–21。确认每页只有一个结论，前一页能自然提出下一页的问题；Slides 6–12 证明能做出来；Slides 18–20 解释为什么需要 RMB 20M、怎么花、回报由什么决定；Slide 21 给出明确 Ask。根据 speaker notes 估算总时长，目标 8–10 分钟。先报告问题，不编辑。
```

---

## 12. PowerPoint 人工终检

ChatGPT for PowerPoint 官方明确提醒：模板匹配和高级 PowerPoint 编辑仍可能不完美，重要数字、引用和改动必须人工复核。最终至少完成：

- [ ] `Slide Show → From Beginning` 全屏检查全部 21 页；
- [ ] 标题没有意外换成三行；
- [ ] 中文字体在演示电脑可用；
- [ ] 正文不低于 16 pt；
- [ ] 没有元素重叠、裁切或越出画布；
- [ ] UI 在投影上能看清关键动作；
- [ ] Demo 视频已嵌入或本地链接有效，并有截图备份；
- [ ] 所有外部主张在 notes 中有 `[Sources]`；
- [ ] 没有 `turn0search`、`filecite`、Prompt 或内部占位误留；
- [ ] AICAN 没被写成 Careloop 自研或已签合作；
- [ ] 南山候选点没被写成已签试点；
- [ ] Slide 19 八项合计 100% / 2,000 万；
- [ ] Slide 20 没有 8 个月回本承诺；
- [ ] Slide 21 不是普通 Thank You；
- [ ] speaker notes 的总时长为 8–10 分钟。

保存：

- `Careloop_MICHK_2026_ChatGPT_v1.pptx`
- `Careloop_MICHK_2026_ChatGPT_reviewed.pptx`
- `Careloop_MICHK_2026_ChatGPT_final.pptx`
- `Careloop_MICHK_2026_ChatGPT_final.pdf`

---

## 13. 如果使用 ChatGPT Work + Google Slides

1. 在 ChatGPT 打开 `Work`。
2. 连接 Google Workspace app。
3. 添加 v3 DOCX、证据登记表、锁定目录和真实素材。
4. 发送：

```text
在我的 Google Drive 中创建一份新的原生 Google Slides，名称为 Careloop MICHK 2026 ChatGPT Version。
严格按照附件 Locked 21-Slide Architecture 创建 21 页主 deck 和 8 页附录；v3 DOCX 是最高规范。
保持 16:9、事实标签、speaker notes 来源和指定视觉系统。先创建目录与空白页面结构，等待我检查；不要一次完成所有内容。
```

5. ChatGPT 请求选择账户、目标文件或批准写入时，核对目标后再确认。
6. 在 Google Slides 检查首轮结构，再让 ChatGPT 分四批填充内容。
7. 完成后从 Google Slides 下载 PPTX 和 PDF，并在 PowerPoint 终检。

---

## 14. 常见问题

| 问题 | 处理方法 |
|---|---|
| PowerPoint 找不到 ChatGPT 加载项 | 检查 Home → Add-ins；公司设备联系 Microsoft 365 管理员部署官方 manifest |
| 加载项能打开但无法读取 Project 文件 | 将证据登记表和锁定目录保存为文件后附加，或复制到侧栏首条消息 |
| 一次生成 21 页失败 | 按本指南四个 Batch 分批生成，每批完成后保存版本 |
| 修改一页却改动全 deck | 指令中明确“只修改 Slide X；保持其他 slides 不变”，大批量编辑前先要计划 |
| 旧版内容重新出现 | 执行事实审计，重新声明 v3 为最高规范，删除 50 万、8 个月和旧落地范围 |
| 生成了假 UI | 删除图片，附加真实截图，明确“不得重绘或虚构产品界面” |
| 模板/字体不一致 | 在 PowerPoint 母版中统一字体、颜色、页脚和版式；不要依赖加载项自动完美匹配 |
| 无法直接生成 PPTX | 先在 ChatGPT Project 完成证据与逐页规格，再使用 ChatGPT for PowerPoint 或 Work + Google Slides 落版 |

---

## 15. 最终标准

ChatGPT 版本不应只是 Skywork 版本的换皮。它应利用 PowerPoint 原生编辑的优势，做到：

- 21 页结构严格；
- 真实 UI 更清楚；
- speaker notes 与来源更完整；
- AICAN、南山和 RMB 20M 的事实边界更严谨；
- 所有文字、图表和图片仍可在 PowerPoint 中编辑；
- 导出后能直接用于 8–10 分钟比赛路演。

