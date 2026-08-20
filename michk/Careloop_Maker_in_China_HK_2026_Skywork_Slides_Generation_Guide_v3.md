# Careloop Maker in China Hong Kong 2026｜Skywork.ai Slides 生成指导书 v3

版本：v3.0  
用途：在 Skywork.ai 中生成 Careloop「创客中国香港站 2026」20–21 页主路演及附录  
主依据：`Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx`  
参考材料：`TeaVita AI--Maker in China.pdf`、`Group 5-暖桌Careloop.pdf`  
建议路演时长：8–10 分钟

---

## 0. 使用原则与资料优先级

本文件是给 Skywork.ai 的可执行生成规格，不是泛化的 PPT 建议。资料冲突时，必须按以下优先级处理：

1. **最高优先级：v3 优化指导书。** 页数、叙事、事实边界、南山试点、产品系统、2,000 万元资金逻辑均以 v3 为准。
2. **第二优先级：Careloop 当前真实产品资产。** 真实 UI、录屏、代码、测试、团队信息、供应商正式报价和已签文件优先于任何旧材料。
3. **第三优先级：旧版 Careloop PDF。** 仅复用 SHARE、B-B-C、三层系统、情感表达、旧模型照片等仍适用资产；不得复用其 50 万元、10 社区、8 个月回本、广州/GBA 落地等旧结论。
4. **第四优先级：TeaVita PDF。** 只借鉴“验证—商业模式—市场进入—预算—风险—团队”的连续商业叙事，以及先验证再扩张的 Gate 思路；不得复制其项目内容、数据、绿色视觉或轻资产结论。

### 必须避免的版本回退

- 不生成旧版 14 页 / 7 分钟结构。
- 不把香港写成当前试点落地点；比赛与融资窗口在香港，首个工程/商业试点重点是深圳南山。
- 不把主角缩减为一个适老 App；Careloop 是硬件、软件、人员、数据构成的 Community Care Station。
- 不把 2,000 万元写成已融资、确定成本或供应商报价。
- 不把 AICAN 的能力写成 Careloop 自研成果。

---

## A. 在 Skywork.ai 中的具体使用方法

Skywork 当前的 Slides 工作流是：启用 Slides → 设置生成参数 → 上传资料 → 在左侧对话区协作 → 在右侧 Studio 逐页检查和编辑 → 下载导出。官方说明见 [Skywork Slides 教程](https://skywork.ai/help/tutorial?key=019a52d5-ad08-7f2f-9fd8-e90db9f7c0da)。

不要把本指导书整份上传后只说“帮我做 PPT”。最稳定的做法是分五轮操作：**证据审计 → 锁定目录 → 生成全稿 → 逐页修订 → 导出终检**。

### A.1 新建 Slides 项目

1. 登录 [Skywork.ai](https://skywork.ai/)，进入 Workspace。
2. 点击输入框下方的 `Slides` 快捷标签。
3. 如果没有看到快捷标签，点击输入框并从能力列表选择 `Slides`，或直接输入 `@Slides`。
4. 确认页面顶部显示类似 `Transform Narratives into Professional Slides` 的提示，表示已进入演示文稿模式。

### A.2 推荐生成设置

在首次发送 Prompt 前设置：

| 设置项 | 推荐选择 | 原因 |
|---|---|---|
| Visual Style | `Deep Research`；若素材已完整且不需联网，可选 `Auto` | 南山政策与 AICAN 需要来源，但必须遵守本文件的事实边界 |
| Length / Page Limits | `Unlimited` | 系统的 6–10 页选项不适合本项目；Prompt 中再明确 21 页主 deck |
| Model | 选择账户内可用的高推理/高质量模型 | 这份 deck 需要跨文档证据整理和商业叙事，不宜只追求速度 |
| Page ratio | `16:9` | 比赛投影与最终 PPTX 使用标准宽屏 |

如果 Skywork 没有在创建前显示 16:9 选项，生成后在 Studio 使用 `Page Ratio Check` 检查。

### A.3 上传资料

点击输入框左侧的 `+`（Add），选择：

- `Local Upload`：上传本地 DOCX、PDF、Markdown、图片和视频；
- `Upload from knowledge base`：资料已进入 Skywork 知识库时使用；
- `Links & Text`：补充政府网页、AICAN 官方链接和短文字说明；
- `Connect Tools`：只有文件位于 Google Workspace、Microsoft 365 或 OneDrive 时才需要连接。

建议先上传以下四份核心文件：

1. `Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx`
2. `Careloop_Maker_in_China_HK_2026_Skywork_Slides_Generation_Guide_v3.md`
3. `Group 5-暖桌Careloop.pdf`
4. `TeaVita AI--Maker in China.pdf`

再上传真实 UI、Demo、Logo、AICAN 官方产品图、南山来源和团队照片。素材多时按以下批次上传，避免 Skywork 混淆：

- 第一批：规范与参考资料；
- 第二批：Careloop 真实 UI / Demo；
- 第三批：政策、AICAN、地图等外部来源；
- 第四批：团队、报价、BOM 和签约文件。

上传完成后，在对话中确认 Skywork 能逐一列出文件名。如果有文件未被识别，重新上传，不要让模型根据文件名猜内容。

### A.4 第一轮：先做证据审计，不生成 slides

上传资料后，先粘贴下面的 Prompt。此轮只检查 Skywork 是否正确理解 v3，不让它急着设计页面。

```text
先不要生成 slides，也不要搜索并补写新的市场数字。

请完整读取已上传的四份核心文件及真实产品素材，并以
Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx
为最高优先级。

请输出六张清单：
1. VALIDATED：当前真实 UI、Demo、代码或测试可证明的内容；
2. EXTERNAL SOURCE：政府、AICAN 或行业来源支持的内容；
3. DEMO ASSUMPTION：演示角色、菜单、订单及所有 adapter；
4. TO VALIDATE：社区、用户、收入、设备、合作、报价与单位经济待验证项；
5. PLANNING MODEL：RMB 20M、资金分配、阶段扩张和财务情景；
6. MISSING ASSETS：缺失文件、公开 URL、截图、报价或团队信息。

另列出你在旧版 Careloop PDF 中发现、但因与 v3 冲突而必须删除的内容，至少检查：
14 页/7 分钟、香港或广州/GBA 试点、50 万元、10 社区、70% 自动化、8 个月回本、已形成 Data Moat。

如果无法确认某项属于哪一类，请标 UNKNOWN，不得推测。
```

#### 第一轮通过标准

- Skywork 明确说 v3 是最高优先级；
- 识别出 21 页、8–10 分钟、深圳南山、2,000 万 Phase I 规划资金；
- 没有把 AICAN 写成 Careloop 自研；
- 没有把候选点写成已签约；
- 能明确列出旧版需要删除的 50 万和 8 个月回本等内容。

如果未通过，在同一对话中回复：

```text
你的资料优先级仍然错误。请停止引用旧版 14 页逻辑，重新以文件名包含 v3 的 DOCX 为唯一主规范，并重新输出六张证据清单。未完成前不要生成 slides。
```

### A.5 第二轮：锁定 21 页目录

第一轮通过后，粘贴第 4 节的“Skywork 总控 Prompt”，并在末尾追加：

```text
本轮仍不要生成完整视觉页面。
请严格输出 21 页主 deck 的目录，每页包含：
- 页码；
- 一句话结论式标题；
- 该页唯一叙事任务；
- 主要证据；
- 主要视觉；
- 证据标签；
- 预计讲述时长。

另输出 6–8 页附录目录。
主 deck 必须严格按照 v3 的 Slides 01–21，不得合并成 14 页，不得自动加入 Agenda、Thank You 或独立 Team 页。
```

将 Skywork 输出与本文件第 5 节逐页对照。以下情况必须要求改目录：

- 自动增加 Agenda 导致页码错位；
- 把 Slide 18–20 合并成一张财务页；
- 删除 AICAN 边界、Human Assist 或南山 Pilot；
- 把团队页插入主 deck，挤掉 Unit Economics 或 Ask；
- 最后一页只生成 `Thank You / Q&A`。

目录通过后，回复：

```text
目录通过。锁定当前 21 页顺序、标题含义、证据标签和页码；后续生成不得擅自增删、合并或改序。附录放在主 deck 后，不计入 21 页。
```

### A.6 第三轮：生成完整初稿

目录锁定后发送：

```text
现在按照已锁定的 21 页目录生成完整 slides，并生成已确认的附录。

必须遵守：
1. 16:9；主 deck 21 页；8–10 分钟；
2. 每页一个结论，正文最多 3 个支撑点；
3. 使用本指导书的深蓝、青绿、珊瑚红、暖白视觉系统；
4. 产品页优先真实 UI；缺图使用 [[待补真实素材]]，不得生成假 UI；
5. 所有外部数字给出可读来源；
6. 所有规划数字标 PLANNING MODEL；
7. 所有 AICAN 内容标清供应商能力与集成边界；
8. 讲稿备注包含该页讲法和预计时长；
9. 不得在页面中出现本 Prompt、制作说明、turn0search、filecite 或其他内部标记。

先生成 Version 1，不要为了视觉效果改变已锁定的事实和页面顺序。
```

生成开始后，Skywork 通常会进入左右分屏：左侧为 AI Chat Collaboration，右侧为 Studio 预览。先让整份 Version 1 完成，不要在尚未生成完时连续发送相互冲突的修改指令。

### A.7 第四轮：逐页修订

在 Studio 中把鼠标悬停到需要修改的页面：

1. 选择 `Add the page to chat`，让该页作为对话上下文；
2. 需要保留内容、重做布局时，使用 `Customize rewrite`；
3. 页面整体失败时，才使用 `Regenerate this page`；
4. 将本文件第 6 节对应的逐页 Prompt 粘贴到修改框；
5. 每次只改 1 页或一组逻辑连续页面，避免全 deck 被意外重排。

推荐修订顺序：

1. Slides 6–11：产品、AICAN 边界、订单状态机、四终端、Demo；
2. Slides 18–20：资金需求、资金分配、单位经济；
3. Slides 2–3、15–16：深圳/南山事实与来源；
4. Slides 13–14、17、21：运营、商业、Gate、Ask；
5. Slides 1、4、5、12：封面、SHARE、Gap、Operational Learning。

#### 页面内容正确但布局不好

选择 `Customize rewrite` 并发送：

```text
保留本页标题、数字、事实、来源和证据标签不变，只重做视觉布局。
减少卡片数量，放大主要视觉，保持左右安全边距一致；正文不低于 18 pt；标题不超过两行；不要改变本页在叙事中的任务。
```

#### 页面好看但内容越界

将页面加入对话并发送：

```text
保留当前布局，按 v3 事实边界重写可见文案：删除所有无法验证的用户、合作、收入、准确率、节省和回本主张；将规划内容标 PLANNING MODEL；将候选场景标 TO VALIDATE；将 AICAN 能力归属 AICAN；将 adapter 标 DEMO ASSUMPTION。
```

#### 替换假 UI 或图库图片

点击画布中的图片元素，使用元素编辑工具删除或替换；上传对应真实素材。替换后检查裁切，确保主要按钮、订单状态、异常队列和界面文字在投影上可读。不要仅把整张网页缩小塞入页面。

#### 微调文字与元素

在右侧画布直接点击文本框、图片或图标，可以：

- 修改文字、字体、字号、颜色与对齐；
- 拖动和缩放元素；
- 调整前后层级；
- 删除错误元素；
- 必要时使用 `Split Elements` 拆分组合对象再编辑。

完成一轮主要修改后，使用画布下方的 Version History / Version slider 保留版本，不要覆盖唯一可用版本。

### A.8 第五轮：全局修订与证据审计

逐页修订完成后，依次粘贴本文件第 8 节的五个二次修订 Prompt。每次执行一个，检查结果后再执行下一个：

1. 全局减字与结论标题；
2. 产品页重做；
3. 商业页重做；
4. 来源与证据清洗；
5. 视觉一致性修订。

最后粘贴第 9 节“最终事实与质量检查 Prompt”。不要直接接受 Skywork 的“全部通过”，应打开其指出的页面逐一验证。

### A.9 Studio 中的最终检查

1. 使用 `Page Ratio Check` 检查 16:9 和安全边界。
2. 用 `Open in new tab` 进行全屏预览。
3. 在投影等效大小检查所有 21 页，不只看缩略图。
4. 检查来源、页脚证据标签、页码和颜色是否一致。
5. 检查视频无法播放时，是否有六张 Demo 截图备用。
6. 检查所有 `[[待补]]`、`turn0search`、`filecite` 和生成说明是否清除。
7. 检查 21 页主 deck 后才进入附录，且没有额外 Agenda / Thank You 页。

### A.10 下载与 PowerPoint 终检

1. 点击 Studio 右上角 `Download`。
2. 优先导出可编辑的 `PPTX`；同时导出 `PDF` 作为版式备份。
3. 如果账户提供 Google Slides 导出，可另存协作版本，但比赛提交以最终规则要求的格式为准。
4. 在 Microsoft PowerPoint 打开 PPTX，重点检查：字体替换、中文换行、元素位移、图表、视频链接、页脚来源和 16:9。
5. 在 PowerPoint 中完成最后的演讲者备注、视频本地化、动画和母版微调。
6. 再导出一次最终 PDF，逐页比较 PPTX 与 PDF 是否一致。

不要只提交 Skywork 在线链接；至少保留：

- `Careloop_MICHK_2026_v1_skywork.pptx`：Skywork 原始导出；
- `Careloop_MICHK_2026_v2_reviewed.pptx`：人工修订版；
- `Careloop_MICHK_2026_final.pptx`：最终演示版；
- `Careloop_MICHK_2026_final.pdf`：静态备份；
- `careloop_demo_90s.mp4`：本地 Demo 备份。

### A.11 常见问题处理

| 问题 | 处理方法 |
|---|---|
| 只生成 6–10 页 | Length 改 `Unlimited`，明确“主 deck 恰好 21 页，附录另计”，重新锁定目录 |
| 又回到旧版 14 页 | 重发第一轮纠偏 Prompt，强调 v3 DOCX 是唯一主规范 |
| 自动编造市场数字 | 停止全稿生成，执行来源与证据清洗；无来源数字删除或标待补 |
| 把 AICAN 写成自研/合作 | 单独重做 Slide 8，使用能力边界 Prompt；没有合同不得写 Partner |
| 生成假 UI | 删除图片，上传真实截图；缺失位置保留明确占位 |
| 页面太拥挤 | 使用“保留事实，只重做布局”Prompt；先删字，不缩小字体 |
| 自动增加 Agenda/Thank You | 删除额外页，恢复锁定的 21 页编号；结尾必须是价值、壁垒与 Ask |
| 资金分配总和错误 | 重做 Slide 19，逐项核对 30%+15%+12.5%+15%+7.5%+5%+5%+10%=100% |
| PPTX 导出后错位 | 在 PowerPoint 替换为常用字体、调整母版与换行，再导出 PDF 对照 |

---

## 1. 生成目标

### 1.1 PPT 的唯一任务

让评委相信：

> Careloop 不是一个“老人食堂概念”，而是一套可以嵌入真实社区、连接硬件与软件、形成持续运营收入，并值得投入 2,000 万元级资金做商业化验证的社区养老餐饮基础设施。

### 1.2 评委必须记住的五件事

| 记忆点 | 评委最终应记住 | 主证据 |
|---|---|---|
| WHY | 南山已有长者助餐体系，但仍需要更低人工、更高协作、更连续的数据服务 | 政策与真实社区场景 |
| WHAT | Careloop = 共享厨房硬件 + 四角色终端 + 人工协作 + 数据闭环 | 产品总览与 UI |
| HOW | 硬件处理标准化劳动；软件理解、确认、调度与记录；工作人员处理关怀和异常 | 软硬件与订单闭环 |
| BUSINESS | G 端降低进入门槛，B 端提供场景，C 端形成支付，Careloop 取得持续服务收入 | Payer–Value–Revenue 模型 |
| WHY NOW / FUND | 南山已有政策、点位和智慧养老基础；2,000 万元用于工程化、试点、运营和标准化 | Pilot、Gate、资金分配、单位经济 |

### 1.3 叙事弧线

```text
DATA → PAIN → OPPORTUNITY / SHARE → GAP → PRODUCT SYSTEM → HARDWARE →
SOFTWARE → FOUR TERMINALS → DEMO → OPERATION → BUSINESS MODEL →
NANSHA PILOT → MARKET ENTRY → FUND → UNIT ECONOMICS → VALUE → MOAT / RISK → ASK
```

每页只承担一个叙事任务，并使用能直接表达结论的标题。不要使用只有类别名的标题，例如“Market Opportunity”“Business Model”“Technology”。

---

## 2. 生成前必须上传的材料

### 2.1 必传文件

1. `Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx`
2. `Group 5-暖桌Careloop.pdf`
3. `TeaVita AI--Maker in China.pdf`
4. Careloop Logo（透明 PNG/SVG）
5. 当前真实 UI 截图与 Demo 录屏
6. 当前团队名单、真实照片、职责和可证明经历
7. AICAN 可公开使用的产品图、官方能力说明和来源链接
8. 深圳/南山政府来源链接或网页/PDF 截图

### 2.2 建议素材命名

| 文件名 | 应证明的内容 | 建议使用页 |
|---|---|---|
| `01_ui_hero.png` | Careloop 当前产品的整体观感 | 1、6 |
| `02_ui_elder_voice.png` | 老人端语音/大按钮发起需求 | 10、11 |
| `03_ui_order_preview.png` | 预览与确认，防止误操作 | 9、11 |
| `04_ui_family.png` | 家属远程代点/状态查看 | 10、11 |
| `05_ui_staff_queue.png` | 工作人员异常队列与人工接管 | 9–11 |
| `06_ui_kitchen.png` | 厨房任务与状态变化 | 9、11 |
| `07_ui_operations.png` | 运营字段、设备/订单趋势 | 10、12 |
| `08_demo_normal.mp4` | 一笔订单的正常路径 | 11 |
| `09_demo_handoff.mp4` | AI 不确定后转人工 | 11 |
| `10_aican_product.png` | AICAN 官方硬件能力 | 7、8 |
| `11_3d_station_model.png` | 空间/工作流解释，不作为技术证明 | 6 或 7 |
| `12_nanshan_map.png` | 南山候选场景地图 | 3、15 |
| `13_team_photos.png` | 真实团队 | 附录 |

### 2.3 缺失素材处理指令

```text
任何缺失的真实 UI、硬件照片、地图、报价或团队资料，都不得由 AI 伪造为已存在的项目资产。
请使用清晰的占位框，格式为：[[待补：文件名｜需要证明的内容｜推荐裁切比例]]。
可生成氛围型背景图，但不得生成假产品截图、假合同、假报价、假政府公文或假用户现场。
```

---

## 3. 事实证据系统

所有主张都必须归入以下证据标签。标签统一放在页脚右侧，字号小但清晰，不与来源混排。

| 标签 | 含义 | 可使用的措辞 | 禁止误写 |
|---|---|---|---|
| `VALIDATED` | 当前代码、UI、真实测试支持 | 已实现、可演示、当前原型支持 | 不外推真实社区成效 |
| `EXTERNAL SOURCE` | 政府、供应商或行业资料 | 公开资料显示、官方信息表明 | 不伪装成团队验证 |
| `DEMO ASSUMPTION` | 为演示而模拟 | Demo 中模拟、用于展示流程 | 不写已部署/已交易 |
| `TO VALIDATE` | 需通过社区、报价或运营验证 | 计划验证、候选、目标 | 不写已有合作/收入 |
| `PLANNING MODEL` | 团队规划模型 | 规划资金、情景、预算框架 | 不写历史事实或承诺 |
| `QUOTE REQUIRED` | 必须取得正式报价 | 待供应商报价后重算 | 不从官网推导采购价 |

### 禁止出现的主张

- 已获得 2,000 万元融资。
- 2,000 万元是经过供应商报价确认的精确成本。
- 已与南山社区、高发社区、物业、政府或 AICAN 签约，除非上传可验证文件。
- 已有真实用户、收入、复购、订单密度、设备稳定性或回本期。
- 旧版的“70% 自动化”“8 个月回本”“50 万元覆盖 10 社区”。
- AICAN 的机器人、AICMOS OS、Aican Cloud、HMI 或云管理是 Careloop 自研。
- 支付、传送带、机器人或自动清洁 Demo adapter 是真实部署成果。
- “Data Moat 已形成”；当前只能写 `Operational Learning` 或“待积累的运营数据资产”。

---

## 4. Skywork 总控 Prompt（整段复制）

```text
你是一名面向创新创业竞赛、产业合作与早期投资评审的资深演示文稿策略师和视觉设计师。请为 Careloop 生成一份参加“Maker in China Hong Kong 2026 / 创客中国香港站 2026”的 21 页主路演 PPT，并生成 8 页以内附录。

【资料优先级】
1. Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide_v3.docx 是唯一的内容、页数、证据和商业逻辑主规范。
2. 当前 Careloop 真实 UI、Demo、代码、测试、团队、报价和签约文件是事实判断依据。
3. Group 5-暖桌Careloop.pdf 仅用于复用仍有效的 SHARE、B-B-C、三层系统、情感表达和素材，不得沿用 50 万元、10 社区、8 个月回本、广州/GBA 等旧结论。
4. TeaVita AI--Maker in China.pdf 仅用于参考比赛信息完整度、商业叙事连续性、阶段化进入与 Gate 思路；不得复制其内容、数据、绿色视觉或轻资产结论。
发生冲突时，严格以第 1 项为准。

【沟通任务】
让评委相信：Careloop 不是一个老人食堂概念，也不是一个单一适老 App 或机器人，而是一套可嵌入真实社区、连接硬件与软件、由人处理关怀与异常、形成持续运营收入，并值得用 2,000 万元级 Phase I 资金做商业化验证的 Community Care Station。

【叙事顺序】
DATA → PAIN → NANSHA OPPORTUNITY → SHARE → GAP → PRODUCT SYSTEM → HARDWARE → AICAN INTEGRATION → SOFTWARE ORDER OS → FOUR TERMINALS → DEMO → OPERATIONAL LEARNING → DAILY OPERATION → BUSINESS MODEL → NANSHA PILOT → POLICY FIT → MARKET ENTRY → WHY RMB 20M → FUND ALLOCATION → UNIT ECONOMICS → VALUE / MOAT / ASK。

【交付】
- 主 PPT 共 21 页，适合 8–10 分钟。
- 附录 6–8 页：技术架构、AICAN 参数/来源、BOM/报价状态、食品安全与数据隐私、财务情景、风险矩阵、Pilot SOP、团队能力与缺口。
- 每页输出：结论式标题、可见文案、视觉结构、素材需求、页脚来源、证据标签、讲稿备注、预计讲述时长。
- 先输出“21 页目录 + 每页一句话结论 + 缺失素材清单”，待检查后再生成完整 deck。

【语言】
- 主体使用简洁中文；必要英文保留 Community Care Station、Order State Engine、Human Assist、Site-in-a-Box、Phase I Funding Target 等。
- 标题以中文结论句为主，可在副标题放短英文。
- 不做逐句中英双语，避免旧版每页中英重复造成拥挤。
- 不出现任何模型提示词、制作备注、[[内部说明]] 或 turn0search / filecite 等工具标记。

【事实规则】
- VALIDATED：仅限当前真实 UI、代码、Demo 或测试支持的能力。
- EXTERNAL SOURCE：政府、供应商和行业数据，必须在页脚写可读来源名称、文件/网页标题、年份与链接。
- DEMO ASSUMPTION：演示菜单、订单、角色、支付/AICAN/传送带 adapter 等模拟内容。
- TO VALIDATE：真实用户、订单、收入、复购、设备稳定、人工介入、合作意愿、报价和单位经济。
- PLANNING MODEL：2,000 万资金、预算分配、扩张和财务情景。
- QUOTE REQUIRED：硬件和工程成本必须由正式报价替换。
- 不得把候选场景写成已签试点，不得把 AICAN 能力写成 Careloop 自研，不得编造 UI、合同、用户、收入、准确率或回本期。

【视觉系统】
- 16:9，1920×1080 或同等比例。
- 风格：可信、温暖、克制、工程化、产品化；既有养老服务的人情温度，也有产业项目的商业严谨。
- 主色：深蓝 #173A5E；辅助色：青绿 #0F8B7A；强调色：珊瑚红 #EF4B5A；背景：暖白 #F7F4EF；正文：深灰 #24313D。
- 每页最多使用 2 个强调色。红色主要标风险、人工接管或关键 Ask；青绿色用于产品状态与正向流程。
- 标题 36–44 pt，正文 18–24 pt，关键数字 42–64 pt；任何正文不得低于 16 pt。
- 一页一个主结论、最多 3 个支撑点、一个主要视觉构图。不要制作密集仪表盘、重复卡片墙、装饰性胶囊按钮或大段文字。
- 产品页以真实 UI 和硬件图为主；架构图最多 4 层、6 个核心节点；商业页使用 Payer–Value–Revenue 流；资金页使用堆叠条/瀑布，不用密集饼图。
- 不重复使用同一张照片作为多个页面的主视觉。

【来源与页脚】
- 每个外部数字直接在页脚给出可读来源，不使用模糊的“Source: Internet”。
- 如果上传的 v3 文档中出现 turn0search、turn1search、turn2file 等内部引用标记，不得复制到页面；应要求用户补充公开 URL，或以 [[待补公开来源链接]] 标记。
- 资金页必须写“PLANNING MODEL；not supplier quotation”。
- AICAN 页必须写“EXTERNAL SOURCE / INTEGRATION PLAN”。

【生成前检查】
先列出你从资料中识别出的：
1. 已验证能力；2. Demo 假设；3. 外部来源；4. 待验证项；5. 规划模型；6. 缺失素材。
如无法确认，不要猜测，使用占位符并列入素材清单。
```

---

## 5. 21 页主 PPT 总览

| 页 | 结论式标题 | 主要视觉 | 时长 |
|---:|---|---|---:|
| 1 | Careloop 把社区助餐升级成可持续照护服务节点 | UI Hero + 一句话定位 | 0:15 |
| 2 | 老龄化不是未来问题，深圳已把长者助餐纳入基础服务 | 3 个数据 | 0:20 |
| 3 | 南山已有助餐网络，机会是增加智能协作层 | 地图 + 现有层/新增层 | 0:25 |
| 4 | SHARE：共享的是整个社区的照护能力 | 四叶/四象限 | 0:20 |
| 5 | 现有方案覆盖一段，Careloop 连接整条服务链 | 对比矩阵 | 0:25 |
| 6 | 硬件、软件、人与数据组成一个 Community Care Station | 四层产品总览 | 0:30 |
| 7 | 重复、危险、标准化的劳动交给机器 | 厨房工作流 | 0:20 |
| 8 | AICAN 提供厨房基础能力，Careloop 增加社区服务层 | 能力边界/集成图 | 0:20 |
| 9 | Careloop 的软件核心是一笔订单如何被接力完成 | 状态机 + Human Assist | 0:30 |
| 10 | 四个终端分别负责自己点、帮他点、处理异常和产生数据 | 4 个真实 UI | 0:25 |
| 11 | 从一句话到一顿饭，正常与失败路径都有人接住 | 6 步 Demo | 1:00–1:30 |
| 12 | 每一张订单都让站点运营更聪明 | 数据到运营结果 | 0:25 |
| 13 | 小站点每天能跑起来，因为人机分工清楚 | 一天运营时间轴 | 0:30 |
| 14 | 政府、物业、家庭与 Careloop 各有明确价值与付费逻辑 | Payer–Value–Revenue | 0:35 |
| 15 | 首站应插入南山现有助餐网络，而不是另开一家店 | 地图 + 三类候选点 | 0:25 |
| 16 | 政策、补贴、场景和智慧养老正在南山汇合 | 五步政策进入链 | 0:25 |
| 17 | 先 1 个工程站，再 3 个锚点站，最后形成 Site-in-a-Box | 四阶段 Gate | 0:30 |
| 18 | 50 万可做 Demo，2,000 万才覆盖商业化工程 | 左右对照 + 成本桶 | 0:30 |
| 19 | 2,000 万先换取可复制证据，再用于扩张 | 资金堆叠条 + 证据 Gate | 0:35 |
| 20 | 回本由真实变量决定，不由一个漂亮数字决定 | 单位经济瀑布 + 三情景 | 0:35 |
| 21 | 从一个社区节点到可复制养老服务基础设施 | 价值 + 壁垒 + Ask | 0:45 |

---

## 6. 逐页详细生成 Prompts

以下代码块可逐页复制给 Skywork，用于首轮生成或单页重做。除页面特殊指令外，每页都必须遵守第 4 节总控 Prompt。

### Slide 01｜定位与封面

```text
生成 Slide 01。页面任务：10 秒内说清 Careloop 是什么，并诚实说明当前阶段。

标题：Careloop：把社区助餐升级成“可持续照护服务节点”
核心文案：机器负责重复劳动，Careloop 让社区照护持续发生。
三个关键词：Community Kitchen｜Human Assist｜Family Connection
状态短句：Current stage: software & interaction demo → engineering pilot

构图：左侧 40% 放标题、核心文案和三个关键词；右侧 60% 放真实新版 UI Hero，裁切到按钮、订单状态和适老界面可读。底部仅保留比赛名称、Logo 和状态。
素材：优先 `01_ui_hero.png`；不得用旧木板模型作为封面；不得生成假 UI。
证据标签：VALIDATED / DEMO
讲稿：我们不是再开一家食堂，也不是只做一台机器人；我们在做一个可复制到不同社区的服务节点。
预计时长：15 秒。
避免：团队分工、英文口号堆叠、未验证 KPI、把 2,000 万放在封面。
```

### Slide 02｜深圳与政策机会

```text
生成 Slide 02。页面任务：用最少数据证明需求与政策基础已存在，不夸大未验证痛点。

标题：老龄化不是未来问题：深圳已经在为社区养老搭基础设施
只展示三个核心信息：
1. 中国 2025 年 60 岁以上人口 3.23 亿，占 23.0%。
2. 深圳 2026 年基本养老服务清单继续包含长者助餐，并对符合条件者设置 5 元或 15 元等助餐补助。
3. 南山已有长者助餐网络与管理办法，Careloop 进入的是现有服务体系。

构图：三个大数字/事实，深圳与南山信息比全国数字更突出；右下角用一句话收束：“机会不是证明老人需要吃饭，而是让既有助餐体系更自动化、数字化和协作化。”
来源：必须从上传的政府材料或公开 URL 写出机构、文件标题、年份；若缺公开链接，写 [[待补公开来源链接]]，不得复制 turn2search 等内部标记。
证据标签：EXTERNAL SOURCE
讲稿：不要把人口老龄化本身当创新；重点是现有政策和场景已经给出进入路径。
预计时长：20 秒。
```

### Slide 03｜南山作为验证场

```text
生成 Slide 03。页面任务：把南山从泛化“市场”变成具体但未签约的验证场。

标题：南山已经有“助餐”，新的机会是让助餐变成可协作的社区服务
页面事实：
- 南山公开材料显示街道长者服务中心、社区长者服务站点、小而精养老驿站和助餐点已形成网络。
- 深圳公开助餐点名录包含南山多个街道与社区。
- 高发社区/深云村幸福邻里可作为智慧养老综合场景 Benchmark，但不是 Careloop 已签试点。

构图：左侧南山区简图和公开场景网络；右侧画“现有助餐层 → Careloop 智能服务层”，新增层只含四个动作：确认、调度、人工接管、记录。
场景标记：Benchmark / potential pilot conversation，不使用 Partner、Signed、Our Pilot。
证据标签：EXTERNAL SOURCE / TO VALIDATE
讲稿：南山适合的原因是需求、场景、政策和数字养老基础设施已存在，我们是在现有体系上增加协作能力。
预计时长：25 秒。
```

### Slide 04｜SHARE 商业化

```text
生成 Slide 04。页面任务：保留旧版 SHARE 概念，但将其从情感口号升级为规模经济逻辑。

标题：SHARE：共享的不是厨房，而是整个社区的照护能力
中心：Community Care Station
四个象限：
- Share Hardware：共享自动化设备
- Share Space：激活社区空间
- Share People：让工作人员转向协作与陪伴
- Share Data：授权角色共享订单、偏好、异常与结果

构图：四叶/四象限围绕中心；每象限只保留一个动词、一个短结果，不写段落。
底部结论：一台设备服务一个家庭很贵；一套能力服务一个社区，才有规模经济。
证据标签：CONCEPT / BUSINESS MODEL
预计时长：20 秒。
```

### Slide 05｜现有方案缺口

```text
生成 Slide 05。页面任务：以“服务连续性”建立差异，而不是贬低竞争方案。

标题：现有方案解决的是“吃饭”，Careloop 解决的是“谁来帮我把这顿饭完成”
横向比较五列：传统助餐｜复杂 App｜家属代点｜单一机器人｜Careloop
比较维度最多三行：发起与确认｜现场履约｜异常与家庭连接
结论：现有方案往往只覆盖一段链路；Careloop 把用户、工作人员、厨房和家属放进同一订单闭环。

构图：四个现有方案用中性灰，Careloop 用青绿色强调；避免大量红叉。每列不超过三行。
证据标签：EXTERNAL SOURCE / ASSUMPTION
讲稿：不要说别人做不到，而要说现有方案通常只优化某一段。
预计时长：25 秒。
```

### Slide 06｜产品总览

```text
生成 Slide 06。页面任务：第一次完整展示 Careloop 系统，评委应在 30 秒内理解硬件、软件、人和数据。

标题：硬件、软件、人与数据组成一个 Community Care Station
四层：
1. Hardware：AICAN 数字烹饪设备与必要辅助设备
2. Service Software：Kitchen Control、Order State Engine、Family/Elder/Staff UI
3. Interaction & People：语音、大按钮、代点、工作人员协作
4. Data & Operations：订单、偏好、营养标签、异常、设备状态、运营指标

构图：最多四层、六个核心节点。硬件用真实供应商产品图，软件用真实 UI，人用克制的人物图标；3D 站点模型只能作为空间解释的小图。
不要放 API 名、技术栈、数据库或代码。
证据标签：AICAN EXTERNAL SOURCE + CURRENT DEMO
讲稿：硬件和软件都不是单独的产品，四层组合后形成的社区服务能力才是产品。
预计时长：30 秒。
```

### Slide 07｜硬件工作流

```text
生成 Slide 07。页面任务：详细介绍硬件，但每个硬件节点必须绑定一个运营理由。

标题：把“重复、危险、标准化”的工作交给机器
工作流：备餐 → 烹饪 → 装盘/传送 → 交付 → 清洁
节点说明：
- 烹饪核心：AICAN 的温控、调料量、动作流程、菜谱编程等公开能力
- 辅助设备：煮饭、储藏、保温、清洗
- 出餐：轻量装盘、传送、取餐
- 清洁：桌面/餐具清洁为设计目标，未部署部分标 TO VALIDATE

每个节点只写“减少哪类人工”或“降低哪类风险”，不要做产品目录。
AICAN 产品照片只在烹饪节点出现。
证据标签：AICAN EXTERNAL SOURCE / TO VALIDATE
讲稿：不证明机器人很酷，只证明它如何释放工作人员的重复劳动。
预计时长：20 秒。
```

### Slide 08｜AICAN 与 Careloop 边界

```text
生成 Slide 08。页面任务：清楚显示供应商能力、Careloop 新增能力和集成计划，避免知识产权混淆。

标题：AICAN 提供厨房基础能力，Careloop 增加社区服务层
左侧 AICAN：烹饪硬件、AICMOS OS、Aican Cloud、智能 HMI、菜谱与设备管理、公开的自动调味/清洗/油烟处理能力。
右侧 Careloop：老人/家属/工作人员/运营终端、订单状态、Human Assist、社区 SOP 与服务记录。
中间连接：API / order state / integration plan。

构图：明确的能力边界图，AICAN 与 Careloop 使用不同色块；中间是集成层，不使用“joint product”或“partnered”除非有签约证明。
来源：AICAN 官方资料；采购价格不得从官网推导。
证据标签：EXTERNAL SOURCE / INTEGRATION PLAN
讲稿：技术策略不是从零造厨房机器人，而是把成熟自动化能力接入社区照护流程。
预计时长：20 秒。
```

### Slide 09｜订单操作系统

```text
生成 Slide 09。页面任务：把软件从“聊天 App”升级为可执行、可追踪、可接管的订单操作系统。

标题：Careloop 的软件核心，是一笔订单如何被不同的人接力完成
必须显示：
- Order ID：贯穿所有终端
- Intent / Preference：菜品、数量、软硬、少盐等
- Confirmation：高风险或不确定内容先确认
- State Machine：Created → Confirmed → Preparing → Ready → Collected → Completed / Assisted
- Human Assist：低置信度或异常进入工作人员队列

构图：一条大号订单状态机；下方仅放老人、工作人员、厨房三个真实视图的局部截图。高亮从 AI 到 Human Assist 的分支。
不得放代码、技术栈或完整网页缩略图。
证据标签：VALIDATED / DEMO / TO VALIDATE
讲稿：核心不是聊天，而是把聊天变成能执行、能追踪、能由人接管的任务。
预计时长：30 秒。
```

### Slide 10｜四终端

```text
生成 Slide 10。页面任务：同时说明用户体验与商业运营价值。

标题：四个终端分别负责自己点、帮他点、处理异常和产生数据
四个终端：
- 老人端：语音/大按钮，预览后确认｜动作词：自己点
- 家属端：远程代点、套餐、状态和服务记录｜动作词：帮他点
- 工作人员端：订单队列、异常、偏好、协作任务｜动作词：接住异常
- 运营端：订单趋势、设备状态、菜单反馈、人工介入｜动作词：产生数据

构图：四张真实 UI 截图，每张只保留一个动作词和一句价值；运营端最多显示 3–4 个字段。
截图必须裁切放大到投影可读，不得生成假 UI。
证据标签：VALIDATED / DEMO
讲稿：同一订单，四个角色看到不同的信息，这是适配真实社区的关键。
预计时长：25 秒。
```

### Slide 11｜90 秒 Demo

```text
生成 Slide 11。页面任务：用可复现 Demo 证明闭环，必须同时包含正常路径和失败转人工。

标题：从一句粤语/普通话到一顿饭，正常与失败路径都有人接住
六步：
1. 说：老人发起需求
2. 看：系统生成订单预览
3. 确认：老人确认或家属代点
4. 做：厨房/工作人员接任务
5. 异常：AI 不确定 → Human Assist
6. 完成：订单与服务记录写入数据层

构图：优先嵌入 60–90 秒视频；同时准备六张连续截图作为静态备份。用青绿色显示正常路径，用珊瑚红显示一次人工接管。
页面必须明确：支付、AICAN、传送带如为 adapter，标 DEMO ADAPTER；不得暗示真实部署。
证据标签：DEMO / VALIDATED / ASSUMPTION
讲稿核心：真正体现 Care 的不是 AI 每次答对，而是 AI 不确定时有人接住。
现场备份：在线视频、预录视频、本地截图/文字输入三套。
预计时长：60–90 秒。
```

### Slide 12｜运营学习

```text
生成 Slide 12。页面任务：从产品过渡到商业壁垒，但不提前宣称 Data Moat。

标题：每一张订单都让站点运营更聪明
四类数据：
- 用户：偏好、频次、菜单选择
- 服务：人工介入、异常类型、响应时间
- 厨房：设备利用、菜品耗时、失败率
- 社区：高峰、需求结构、服务覆盖
四个运营结果：Menu｜Staffing｜Equipment｜Care

构图：中心是一张订单，数据流向四个运营结果；不要使用“Data Moat”标题。
结论：今天出售的是服务，长期积累的是越来越懂社区的运营系统。
证据标签：ROADMAP / TO VALIDATE
预计时长：25 秒。
```

### Slide 13｜站点日常运营

```text
生成 Slide 13。页面任务：直接回答“谁来干活、谁来维护、谁处理异常”。

标题：小站点每天能跑起来，因为人机分工清楚
运营链：区域净菜供应 → 站点储存 → 自动烹饪 → 出餐 → 工作人员协作 → 清洁
人员角色：
- 设备巡检与站点运营
- 社区情感服务与协作
- 异常人工接管
- 供应商 SLA 负责设备维护支持
必须提醒：食品安全、清洗、温控、证照、责任边界在试点前完成。

构图：一天时间轴（备餐—午餐峰值—清洁—下午—晚餐/收档），右侧显示人员角色；不放大段 SOP。
证据标签：TO VALIDATE / OPERATING MODEL
讲稿：把人从重复厨房劳动转为社区服务，不等于无人化。
预计时长：30 秒。
```

### Slide 14｜商业模式

```text
生成 Slide 14。页面任务：一页讲透谁付钱、谁获益、Careloop 如何收费。

标题：政府、物业、家庭与 Careloop 各有明确价值与付费逻辑
角色与价值：
- G 端：政策、项目、服务购买或试点资金，降低进入门槛
- B 端：物业/社区运营方提供场地、居民触达和服务合作
- C 端：老人/家属支付单餐、套餐或健康膳食订阅
- Careloop：站点建设/设备集成服务 + 软件/运营服务费 + 订单/服务分成；数据运营只在合规前提下作为未来能力

构图：Payer / Beneficiary / Operator 三角或闭环。收入流用实线，价值流用虚线，并提供图例。
底部结论：补贴降低第一站进入成本，但长期收入必须来自持续服务价值。
证据标签：BUSINESS MODEL / PLANNING MODEL
预计时长：35 秒。
```

### Slide 15｜南山首站

```text
生成 Slide 15。页面任务：让首个试点可执行，并清楚声明尚未签约。

标题：首站应插入南山现有助餐网络，而不是另开一家店
三类候选场景：
1. Benchmark：已整合食堂、社康、长者服务的综合场景
2. Food-service site：已有助餐需求但人工运营较重的站点
3. Property-led site：物业可提供空间、居民触达与运营协作的社区
公开点位可包含科技园、桂湾、风华、白石洲、高发、蛇口、粤海、桃源等，但只能作为研究候选。

构图：南山区地图 + 三个候选类型；每个类型只写“为什么适合测试”。
醒目注释：Publicly identified scenarios; no Careloop partnership claimed.
证据标签：EXTERNAL SOURCE / TO VALIDATE
讲稿：第一站不是找空地开店，而是找已有需求、管理者和老人流量的节点。
预计时长：25 秒。
```

### Slide 16｜政策进入逻辑

```text
生成 Slide 16。页面任务：把市场进入从“想法”变为可对接的政策与场景路径。

标题：政策、补贴、场景和智慧养老正在南山汇合
事实与边界：
- 南山长者助餐政策允许长者饭堂、助餐点、长者餐桌等形式，并规定设施与食品安全要求。
- 符合条件的老人可有每餐 5 元或 15 元等补贴；具体资格以项目主体、设施类型和申请条件核验。
- 深圳 2026 基本养老服务继续包含长者助餐。
- Careloop 的目标是进入既有政策体系，不是假设获得一笔“创新补贴”。

构图：政策 → 场景 → 运营 → 数据 → 复制的五步箭头。补贴画成降低用户价格或运营成本的流，不画成 Careloop 已有收入。
证据标签：EXTERNAL SOURCE
预计时长：25 秒。
```

### Slide 17｜市场进入与 Gate

```text
生成 Slide 17。页面任务：展示“先验证、再扩张”的资本纪律。

标题：先 1 个工程站，再 3 个锚点站，最后形成 Site-in-a-Box
四阶段：
- Phase 1｜0–6 月：合规、场地、供应商、1 个 Engineering Pilot
- Phase 2｜6–12 月：2–3 个 Anchor Sites；验证订单密度、人工介入、设备稳定、真实支付、续约
- Phase 3｜12–18 月：形成 Site-in-a-Box，复制到更多南山/深圳社区
- Phase 4｜18–36 月：通过物业集团、养老机构、政府服务采购向大湾区复制

每阶段只显示一个 Pass Gate。用 1 → 3 → 10 作为阶段化能力表达，不承诺已开站数量。
结论：2,000 万不是今天开 20 家店，而是把第一套系统工程化，并把 3 个站点跑成可复制模板。
证据标签：PLANNING MODEL / TO VALIDATE
预计时长：30 秒。
```

### Slide 18｜为什么需要 2,000 万

```text
生成 Slide 18。页面任务：正面解释资金需求从 50 万升级到 2,000 万，不伪装成精确成本。

标题：50 万可做 Demo，2,000 万才覆盖商业化工程
左侧：RMB 0.5M Prototype｜软件 Demo、研究、概念验证
右侧：RMB 20M Phase I Planning Envelope｜硬件采购与集成、场地改造、软件与数据安全、人员与运营、供应链、合规、维护、Working Capital、标准化
中间显示六个成本来源：Hardware｜Site｜People｜Software｜Compliance｜Working Capital

必须写：RMB 20M is a Phase I commercialization funding target / planning envelope, not confirmed supplier quotation.
AICAN 官网不公开 Careloop 采购价格，不得生成设备单价。
证据标签：PLANNING MODEL
讲稿：资金不是把 PPT 变成现实，而是把可运行产品变成能在真实社区安全运行的系统。
预计时长：30 秒。
```

### Slide 19｜资金分配

```text
生成 Slide 19。页面任务：展示 2,000 万元如何换取下一阶段证据。

标题：2,000 万先换取可复制证据，再用于扩张
规划分配，合计必须等于 100% / RMB 20M：
- 硬件采购与工程集成 30%｜600 万
- 试点场地、水电、消防、适老化改造 15%｜300 万
- 软件平台与数据安全 12.5%｜250 万
- 人员与运营 15%｜300 万
- 供应链、物流、试运营 7.5%｜150 万
- 合规、检测、保险 5%｜100 万
- 维护备件 5%｜100 万
- 风险准备金 10%｜200 万

构图：优先用横向堆叠条或资金瀑布，不用饼图。每个资金桶旁写产生的证据：设备→稳定性；站点→真实用户；软件→协作；运营→单位经济；合规→可运营；准备金→风险缓冲。
页脚必须写：PLANNING MODEL; NOT AICAN QUOTATION; recalculate after formal quotations.
证据标签：PLANNING MODEL / QUOTE REQUIRED
讲稿：每一块钱都要对应一个 Gate；不能产生下一阶段证据的支出不应该发生。
预计时长：35 秒。
```

### Slide 20｜单位经济

```text
生成 Slide 20。页面任务：替换旧版“8 个月回本”，展示可验证的计算逻辑。

标题：回本由真实变量决定，不由一个漂亮数字决定
必须显示四个公式：
1. Revenue/site/month = paid orders × average ticket × operating days + eligible policy support
2. Contribution = revenue − food/packaging − payment/logistics variable cost
3. Site cash contribution = contribution − staff − utilities − maintenance − software allocation − site fee/management
4. Payback = net initial CapEx / monthly site cash contribution

右侧只放 Conservative / Base / Upside 三个情景框，变量使用 [[待填真实数据]]：订单、AOV、食品成本、人工介入、维护、CapEx。不得自动填充漂亮数字。
构图：从订单到现金贡献的单位经济瀑布 + 三情景；删除“大号 8 个月”。
证据标签：PLANNING MODEL / TO VALIDATE
讲稿：8 个月不是承诺，而是可能由订单密度、设备成本和人工效率计算出的结果；必须用真实数据锁定。
预计时长：35 秒。
```

### Slide 21｜价值、壁垒与 Ask

```text
生成 Slide 21。页面任务：解决开场问题，并把商业价值、逐步形成的壁垒和资源请求收束为一个决策。

标题：从一个社区节点，到可复制的养老服务基础设施
四类价值：
- 家庭：远程代点、服务记录、安心
- 物业：空间利用、适老配套、居民粘性、社区差异化
- 政府：助餐效率、服务覆盖、智慧养老、合规数据化
- Careloop：站点服务、软件/运营费、设备集成、订单/服务分成
逐步形成的壁垒：软硬件集成、社区 SOP、Human Assist 流程、菜单/运营数据、供应链与物业网络。
明确 Ask：
1. 政策与合规入口
2. 1–3 个南山 Anchor Sites
3. AICAN/供应链与工程伙伴
4. RMB 20M Phase I Funding Target
5. 战略投资与产业伙伴

构图：不要做密集同心圆。左侧四类价值，右侧壁垒与五项 Ask；底部用一个大号资金目标和结尾句。
结尾句：Machines handle the labor. Careloop makes care continuous.
证据标签：PLANNING MODEL / TO VALIDATE
讲稿：我们寻找的不是一笔钱把概念铺开，而是真实社区、产业伙伴和能把工程化—试点—标准化跑通的 Phase I 资本。
预计时长：45 秒。
```

---

## 7. 附录生成 Prompts

主 deck 不塞复杂细节。以下附录由 Skywork 在主 PPT 后生成，保持同一视觉系统。

### Appendix A｜技术与数据架构

```text
生成附录“Careloop 技术与数据架构”。展示 UI/voice → intent/confirmation → Order State Engine → staff/kitchen tasks → operations data。标出 Human Assist、权限、日志和 adapter 边界。只使用当前项目真实存在的模块；不存在的能力标 TO VALIDATE。不要放无法阅读的代码截图。
```

### Appendix B｜AICAN 能力与集成边界

```text
生成附录“AICAN capability & integration boundary”。左侧列官方公开的硬件、AICMOS OS、Aican Cloud、HMI、菜谱/设备管理能力；右侧列 Careloop 的社区服务层；中间列待验证接口、正式报价、SLA、安装、维护和责任边界。所有 AICAN 主张附官方来源。不得写采购价格。
```

### Appendix C｜BOM 与报价状态

```text
生成附录“Site BOM & quotation status”。按烹饪核心、辅助设备、储存保温、出餐、清洁、网络/终端、安装改造、备件列出：数量占位、规格状态、报价状态、负责人、截止日期。任何价格都用 [[待正式报价]]，除非已上传正式报价文件。
```

### Appendix D｜食品安全、数据隐私与责任边界

```text
生成附录“Compliance by design”。食品安全包括持证主体、供应链、温控、清洗、留样/记录、消防和责任边界；数据包括最小化采集、授权、角色权限、留存周期、访问日志和事件响应。使用“试点前 Gate”表达，不声称已完成未提供的认证。
```

### Appendix E｜财务模型与三情景

```text
生成附录“Unit economics scenario model”。分 Site CapEx、Site Opex、Revenue、Rollout 四组变量，列 Conservative/Base/Upside。所有无真实依据的数值保留输入格，不自动生成。明确政策补贴只在符合资格时计入。输出应能解释主 deck Slide 20 的所有公式。
```

### Appendix F｜风险矩阵与 Gate

```text
生成附录“Risk → Control → Gate”。至少覆盖食品安全、设备故障、AI 误识别、用户不付费、站点成本、人员成本、数据隐私、扩张过快。每项只写：为什么重要、控制机制、通过 Gate。突出人工 Plan B、备件/SLA、预览确认和 1→3→10 扩张纪律。
```

### Appendix G｜南山 Pilot SOP 与指标

```text
生成附录“0–360 day pilot plan”。0–30 日进入社区；31–90 日 Engineering Pilot；91–180 日 Commercial Pilot；180–360 日标准化。每阶段列行动、负责人占位、输出、Pass Gate。必须测量真实支付、复购、每单人工分钟、设备利用率、维护成本、政策补贴影响和续约/扩站意向。
```

### Appendix H｜团队能力与缺口

```text
生成附录“Who can turn RMB 20M into real sites”。不用“谁讲哪一页”。按产品/用户、营养/菜单、工业设计/硬件、软件/AI、商业化、运营六项列：现有团队可证明能力、真实负责人、必须补齐的产业伙伴。需要补充的角色包括社区运营/养老机构、食品安全/营养顾问、AICAN/机电集成、数据安全/云运维、物业/政府项目、真实站点运营负责人。只使用真实照片与经历。
```

---

## 8. Skywork 二次修订 Prompts

### 8.1 全局减字与结论标题

```text
对整份 deck 做一次“评委投影阅读”重写：
1. 每页只保留一个可复述结论；
2. 标题改为结论句，不使用类别名；
3. 可见正文最多 3 个支撑点；
4. 删除所有逐句中英重复；
5. 优先扩大真实 UI、硬件、地图、流程和数字；
6. 任何正文不得低于 16 pt，标题不得换成两行以上；
7. 复杂说明移入讲稿或附录；
8. 不改变事实标签、来源与数字。
```

### 8.2 产品页重做

```text
重做 Slides 6–12，使其像真实产品与工程系统，而不是概念卡片合集。真实 UI 截图至少占页面 45%；所有截图裁切到关键动作与状态；架构最多 4 层、6 节点；状态机必须突出确认与人工接管；AICAN 与 Careloop 用清楚边界分开；没有真实截图的地方保留占位，不生成假 UI。
```

### 8.3 商业页重做

```text
重做 Slides 14、17–21。Slide 14 用 Payer–Value–Revenue；Slide 17 每阶段只留一个 Gate；Slide 18 明确 Prototype 与 Commercialization 的差异；Slide 19 用资金堆叠条且合计 100%；Slide 20 只用公式和三情景，不承诺回本期；Slide 21 将价值、壁垒与 Ask 收束为一个决策。所有规划数字标 PLANNING MODEL。
```

### 8.4 来源与证据清洗

```text
逐页审计所有数字、合作、产品能力和进展：
- 为每条外部主张添加可读来源名称、标题、年份与 URL；
- 删除 turn0search、turn1search、turn2file、filecite 等内部工具标记；
- 将无法核验的主张删除或改为 [[待补来源]]；
- 将候选场景改为 TO VALIDATE；
- 将演示 adapter 改为 DEMO ASSUMPTION；
- 将 2,000 万及所有预算改为 PLANNING MODEL；
- 将硬件价格改为 QUOTE REQUIRED。
输出一张“主张—页面—证据—状态—待补资料”的审计表。
```

### 8.5 视觉一致性修订

```text
统一整份 deck：暖白背景、深蓝标题、青绿产品流程、珊瑚红风险/Ask。每页最多两个强调色；统一标题位置、左右边距、页码、来源和证据标签。删除重复 Visual Reference/AICAN 标签、装饰性卡片墙、过多图标、廉价渐变和模糊图片。相邻页面使用不同但协调的构图轮廓，避免连续四页都是四卡片布局。
```

---

## 9. 最终事实与质量检查 Prompt

```text
请作为一名严格的比赛评委、产业投资人和合规审稿人，对最终 Careloop deck 做提交前检查。不要改写事实，先输出问题清单，再给出修订建议。

【内容检查】
1. Slide 2–3 的深圳/南山数字是否有政府来源？
2. Slide 6 能否在 30 秒内解释硬件、软件、人和数据？
3. Slide 7–8 是否明确 AICAN 是供应商公开能力与集成计划，而非 Careloop 自研或已签合作？
4. Slide 9 是否有订单状态机、确认和 Human Assist？
5. Slide 10 是否清楚说明自己点、帮他点、处理异常、产生数据？
6. Slide 11 是否有正常路径与失败转人工，并区分 adapter 与真实部署？
7. Slide 12 是否写 Operational Learning，而非已经形成 Data Moat？
8. Slide 13 是否回答每天谁运营、谁维护、谁处理异常？
9. Slide 14 是否一页讲清谁付钱、谁获益、如何收费？
10. Slide 15–16 是否没有虚构南山合作或补贴资格？
11. Slide 17 是否使用 1→3→10 Gate，不把扩张写成既成事实？
12. Slide 18 是否把 2,000 万定义为 Phase I funding target / planning envelope？
13. Slide 19 是否合计 100%，并写 NOT SUPPLIER QUOTATION？
14. Slide 20 是否删除 8 个月回本，改用公式和三情景？
15. Slide 21 是否同时收束家庭、物业、政府、Careloop 价值、逐步形成的壁垒和五项 Ask？

【事实检查】
- 搜索所有“已、获得、合作、签约、收入、用户、复购、准确率、节省、回本、部署、稳定”等词，逐项要求证据。
- 搜索所有金额、百分比和数量，确认来源或 PLANNING MODEL 标签。
- 搜索 AICAN，确认每处都有清晰归属和官方来源。
- 搜索 turn0search、filecite、[[待补]]，最终交付前不得遗留内部标记；未补事实必须删除或保留为明确占位版本，不得伪造。

【视觉检查】
- 每页一个结论；标题一眼可读；正文不小于 16 pt。
- UI 截图、来源、标签在投影上可读。
- 无文字溢出、重叠、截断、低清图片、异常换行。
- 相邻页面构图有变化，但色彩、字体、页脚一致。
- 主 PPT 没有复杂 BOM、参数、SOP 或密集财务表；这些进入附录。

【路演检查】
- 总时长 8–10 分钟。
- Slides 6–12 是“能否做出来”的核心证据。
- Slides 18–20 能回答“为什么要 2,000 万、怎么花、回报由什么决定”。
- 结尾不是泛化 Thank You，而是清楚的资源请求与下一步决策。

最后输出：A. 必须修复；B. 建议优化；C. 已通过；D. 缺失素材；E. 预计总时长。
```

---

## 10. 提交前人工检查清单

- [ ] 使用 v3 的 21 页结构，不是旧 14 页结构。
- [ ] 主 deck 在 8–10 分钟内可讲完。
- [ ] 封面主视觉是真实新版 UI，不是木板模型或泛化机器人。
- [ ] 深圳、南山和政策数字都有可读政府来源。
- [ ] AICAN 与 Careloop 的能力边界清楚。
- [ ] 软件页展示订单状态、确认和人工兜底。
- [ ] Demo 有正常路径、失败转人工和三套备份。
- [ ] 所有当前成果、演示假设、外部来源、待验证项和规划模型已正确标记。
- [ ] 没有虚构用户、收入、合作、补贴资格、报价或部署。
- [ ] 2,000 万写成 Phase I Funding Target / Planning Envelope。
- [ ] Slide 19 八个资金桶合计 100% / 2,000 万。
- [ ] Slide 20 没有“8 个月回本”承诺。
- [ ] 南山场景写候选/Benchmark，不写已签试点。
- [ ] 每页一个结论，正文不小于 16 pt，无文字墙。
- [ ] 没有 `turn0search`、`filecite`、模型指令或内部占位误留在最终提交版。
- [ ] 附录含技术、AICAN、BOM/报价、合规、财务、风险、Pilot SOP 和团队缺口。
- [ ] 结尾清楚提出政策、站点、产业伙伴、2,000 万资金和战略投资五类 Ask。

---

## 11. 一句话最终标准

如果评委看完只能复述一句话，应当是：

> Careloop 把成熟的厨房自动化能力接入老人、家属、工作人员和社区运营的订单闭环，从南山现有助餐网络开始，用 2,000 万元级 Phase I 资本验证并标准化一个可复制的 Community Care Station。
