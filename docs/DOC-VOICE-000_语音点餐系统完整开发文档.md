# DOC-VOICE-000 语音点餐系统完整开发文档

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-000 |
| 版本 | v1.0 |
| 状态 | 可执行开发基线 |
| 适用项目 | CareLoop v0.3.0 |
| 更新时间 | 2026-08-19 |
| 设备 | 老人自助大屏、平板、手机浏览器 |
| 方案 | 浏览器 Web Speech API + speechSynthesis |
| 模式 | 首期单轮，预留连续对话 |

> 本文档是统一入口，合并需求、架构、数据模型、API、安全、测试、任务拆分和 Grok Agent 提示词。原 DOC-VOICE-001 至 DOC-VOICE-011 保留作专题参考。

## 1. 目标与范围

目标：将自然语言转换为必须经过确认的结构化订单草稿，降低老人点餐学习成本，并支持家属、工作人员、后厨和配送协同。

```text
麦克风 → Web Speech API → 文本规范化 → 意图/菜品解析
      → 候选预览 → 用户确认/修改 → 订单草稿
      → 最终确认 → 后厨制作 → 餐桌配送
```

首期包括：浏览器识别、浏览器 TTS、单轮交互、普通话/粤语/英文语言选择、复杂表达、数量、菜品、餐桌、口味、方言和模糊候选、手动修正、工作人员接管、临时转写保存。

首期不包括连续多轮对话、真实支付、真实设备控制、人脸识别、长期音频保存和未经授权的语音训练。

硬性规则：预览不能创建订单；低置信度不能直接下单；订单提交前必须明确确认；服务端重新校验菜品、价格、桌号和口味；失败必须提供手动点餐和工作人员协助；工作人员默认不能跳过顾客最终确认。

## 2. 交互规范

流程：进入点餐页 → 点击说一说并授权 → 正在听 → 正在理解 → 展示转写和结构化预览 → 确认/修改/重说 → 写入草稿 → 最终确认。

语音状态：idle、listening、transcribing、needs_confirmation、failed。

老人友好要求：语音按钮建议 64px，触摸区至少 44px，大字号高对比度，语音和文字同步反馈，一次只询问一个缺失信息，候选最多 3 个，并提供重新说、手动选择、请工作人员帮助。口味用独立标签展示。

示例：“我要两份不辣的鱼，再来一碗粥，鱼要软一点，A12桌。”预期为鱼 2 份、spicy=NONE、texture=EASY_TO_CHEW；小米粥 1 碗；桌号 A12。鱼的要求不得绑定到粥。

## 3. 架构

现有基线：packages/domain/src/voice/index.ts（解析器和 Mock）、packages/domain/src/models/Order.ts（订单）、src/api/orders.ts（API）、src/api/realtime.ts（WebSocket）、src/ui/（前端）、tests/（测试）。技术栈为 TypeScript、Express、Vite、WebSocket、Zod、Vitest、Playwright。

模块链路：VoiceButton → VoiceSessionController → SpeechRecognitionAdapter → TranscriptNormalizer → IntentParser/DishMatcher/ConfidencePolicy → Voice Preview API → Order Draft/Staff Assist → Existing Order → Kitchen → Conveyor。

浏览器配置：continuous=false、interimResults=true、maxAlternatives=3、单轮超时约 8 秒。检测不到 SpeechRecognition 时保留手动点餐；TTS 不可用时保留文字提示；生产必须 HTTPS。

## 4. 解析契约

意图：ADD_ITEM、REMOVE_ITEM、CHANGE_QUANTITY、SET_MODIFIER、SET_TABLE、QUERY_MENU、CONFIRM_ORDER、CANCEL_ORDER、ASK_FOR_STAFF、UNKNOWN。

```json
{
  "intent": "ADD_ITEM",
  "language": "zh-CN",
  "rawText": "我要一份少盐的鱼",
  "normalizedText": "我要1份少盐的清蒸鱼",
  "asrConfidence": 0.81,
  "confidence": 0.76,
  "needsConfirmation": true,
  "items": [{"dishId":"DISH-002","dishName":"清蒸鱼","quantity":1,"modifiers":{"salt":"LESS"}}],
  "tableQuery": null,
  "candidates": []
}
```

口味字段：salt、spicy、oil 为 NORMAL|LESS|NONE；onion、ginger 为 NORMAL|NONE；texture 为 NORMAL|SOFT|EASY_TO_CHEW。未提及字段使用 NORMAL 或 null，不能误写为 NONE。

匹配顺序：精确菜名 → 别名 → 关键词 → 拼音/同音/方言 → 编辑距离和菜单上下文。支持一份、两份、来两个、再加一碗、少盐、不辣、少油、不加葱、不加姜、软一点、易咀嚼及多菜品组合。

高置信度（ASR≥0.85且精确匹配）展示并确认；中置信度（0.60~0.84或别名/同音）展示候选；低置信度（<0.60、冲突或无匹配）重说、手动选择或工作人员。所有等级都必须确认。

## 5. 数据、临时存储和状态

VoiceSession 字段：id、userId、deviceType(KIOSK|TABLET|MOBILE)、language、status、rawTranscript、normalizedText、asrConfidence、intentConfidence、intentSnapshot、candidateSnapshot、audioRef、expiresAt、createdAt、updatedAt。

状态：ACTIVE → PREVIEW_READY → CONFIRMED → EXPIRED；ACTIVE → STAFF_ASSIST → CONFIRMED；ACTIVE → EXPIRED。

OrderItem.modifiers 必须以可校验结构保存 salt/spicy/oil/onion/ginger/texture；specialInstructions 只能作为补充文本。订单、后厨和配送必须展示同一份结构化口味。

默认保存转写、规范化文本、解析快照和候选；原始音频默认关闭。若启用 MediaRecorder，单段最长 10 秒，限制大小、MIME、权限并 24 小时清理。订单完成后删除音频，日志脱敏手机号、姓名和原始语音。

## 6. API 与事件

| 方法 | 路径 | 用途 |
|---|---|---|
| POST | /api/voice/sessions | 创建会话 |
| POST | /api/voice/sessions/:id/preview | 转写解析预览 |
| GET | /api/voice/sessions/:id | 获取会话 |
| POST | /api/voice/sessions/:id/corrections | 保存修正 |
| POST | /api/voice/sessions/:id/request-staff | 请求工作人员 |
| DELETE | /api/voice/sessions/:id | 清理临时数据 |
| POST | /api/orders/voice-preview | 兼容现有接口 |

错误码：VOICE_UNSUPPORTED、VOICE_PERMISSION_DENIED、VOICE_TIMEOUT、VOICE_EMPTY、VOICE_LOW_CONFIDENCE、VOICE_NO_DISH_MATCH、VOICE_AMBIGUOUS、VOICE_SESSION_EXPIRED。

WebSocket /ws 事件：voice.session_started、voice.transcript_updated、voice.preview_ready、voice.correction_saved、voice.staff_requested、voice.session_expired。事件必须含 eventId、sessionId、occurredAt、type、payload。

## 7. 异常、安全和工作人员接管

| 情况 | 处理 |
|---|---|
| 浏览器不支持/拒绝权限 | 文字提示并回到手动点餐 |
| 空文本/超时/噪声 | 提示重说，不创建订单 |
| 方言/吐字不清 | 候选卡，连续两次失败转工作人员 |
| 菜品下架/口味不支持 | 不加入草稿，提供替代或人工 |
| 会话过期 | 删除临时数据，重新开始 |
| 网络断开/重复点击 | 保留草稿，使用幂等键 |

工作人员流程：低置信度或请求帮助 → STAFF_ASSIST → claim → 修改菜品/数量/口味/桌号 → 提交预览 → 顾客确认 → 订单/后厨。记录修改前后值、操作人、时间，处理重复 claim，不默认跳过确认。

服务端必须校验权限、价格、菜单可售、桌号、口味枚举和幂等键；会话 ID 使用不可预测随机值；录音限制文件类型和大小；禁止真实密钥写入代码。

## 8. Subagent 任务和依赖

| 任务 | 责任 | 允许修改范围 | 依赖 |
|---|---|---|---|
| VOICE-A 领域契约 | VoiceSession、Intent、Modifier、OrderItem | packages/domain、领域测试 | 无 |
| VOICE-B 解析器 | 规范化、数量、口味、方言、候选 | domain voice、单测 | A |
| VOICE-C 后端 API | 会话、预览、修正、过期、事件 | src/api、集成测试 | A/B |
| VOICE-D 隐私存储 | 临时音频、清理、脱敏 | src/api/voice-storage.ts、测试 | A |
| VOICE-E 前端 | 按钮、预览、候选、TTS、兜底 | src/ui、E2E | C |
| VOICE-F 协助同步 | 工作人员、WebSocket、后厨一致性 | API、UI、集成/E2E | C/E |
| VOICE-G QA | 全量测试、兼容性、验收 | tests、验收文档 | A-F |

执行顺序：A →（B、D）→ C → E → F → G。每个 Agent 使用独立分支或 worktree，只修改授权范围，不删除测试，不引入真实支付/设备/密钥。

## 9. Grok Agent 可复制提示词

### VOICE-A：领域模型

> 你是 CareLoop 领域模型 Agent。实现本总文档的 VOICE-A。允许修改 packages/domain/src/voice/、packages/domain/src/models/Order.ts、packages/domain/src/models/OrderStatus.ts、tests/unit/domain.test.ts。定义 VoiceSession、VoiceTurn、ModifierProfile 和完整 Intent schema，支持全部十种意图，使用 zod，兼容现有 OrderStatus 和字段；补充空文本、低置信度、多候选和口味测试。禁止修改 UI、Express、真实语音、支付，禁止删除测试。完成前运行 npm run lint && npm run test -- --run tests/unit/domain.test.ts。回报修改文件、类型、测试结果、风险和未完成项。

### VOICE-B：解析器

> 你是 CareLoop 语音解析 Agent。实现本总文档的 VOICE-B。允许修改 packages/domain/src/voice/ 和 tests/unit/voice*.test.ts。实现 rawText/normalizedText、数量词、少盐/不辣/少油/不加葱/不加姜/软一点/易咀嚼、多菜品修饰词归属、别名、关键词、同音/拼音/方言候选、最多 3 个候选和置信度分级。正确解析“两份不辣的鱼，再来一碗粥，鱼要软一点”，不把鱼的要求绑定到粥。解析器必须是纯逻辑。禁止改 UI/API、保存音频、云端 ASR。运行 npm run lint && npm run test -- --run tests/unit，并回报规则、输入输出、测试和限制。

### VOICE-C：后端 API

> 你是 CareLoop 后端 API Agent。实现本总文档的 VOICE-C。允许修改 src/api/orders.ts、src/api/voice.ts、src/api/realtime.ts、src/api/index.ts、tests/integration/。实现 sessions、preview、get、corrections、request-staff、delete 接口。预览只写 VoiceSession，不创建 Order；服务端重新校验菜单、桌号、价格和 modifiers；低置信度只能候选或 STAFF_ASSIST；默认 24 小时过期；兼容 /api/orders/voice-preview；订单创建支持幂等键；广播 voice.preview_ready、voice.correction_saved、voice.staff_requested。禁止真实支付/ASR、删除旧接口、绕过 OrderStatus。运行 npm run lint && npm run test:integration && npm run test，并回报路由、状态、错误码和风险。

### VOICE-D：隐私存储

> 你是 CareLoop 隐私与临时数据 Agent。实现本总文档的 VOICE-D。允许修改 src/api/voice-storage.ts、src/api/voice.ts、临时数据测试和相关 docs。默认只保存转写、规范化文本、解析快照和候选，原始音频默认关闭；若启用 MediaRecorder，限制单段 10 秒、大小、MIME、权限并 24 小时过期。实现过期清理、删除级联清理、日志脱敏、非法文件拒绝。禁止长期音频、训练、第三方存储、修改订单。运行 npm run lint && npm run test，回报策略、清理机制、测试和风险。

### VOICE-E：前端

> 你是 CareLoop 前端语音 Agent。实现本总文档的 VOICE-E。允许修改 src/ui/、tests/e2e/。检测 SpeechRecognition/speechSynthesis；实现 idle/listening/transcribing/needs_confirmation/failed；配置 continuous=false、interimResults=true、maxAlternatives=3、约 8 秒超时；显示原文、菜品、数量、口味、桌号和置信度；最多 3 个候选；提供确认、修改、重说、手动选择、请求工作人员；TTS 与文字同时反馈；异常不白屏；最终提交必须点击确认；适配大屏、平板、手机，按钮建议 64px、触摸区至少 44px。禁止改领域/API、外部 UI 框架、绕过确认。运行 npm run lint && npm run build && npm run test:e2e，并回报组件、兼容降级、测试和问题。

### VOICE-F：工作人员与同步

> 你是 CareLoop 工作人员协助和实时同步 Agent。实现本总文档的 VOICE-F。流程必须是低置信度/请求帮助 → STAFF_ASSIST → claim → 修正菜品、数量、口味、桌号 → 提交预览 → 顾客确认 → 订单/后厨/配送。记录修改前后值、操作人、时间；处理重复 claim；用 WebSocket 同步；后厨只能看已确认且满足支付条件的订单；口味字段在各端一致。禁止真实通知、支付、删除后厨流程、跳过确认。运行 npm run lint && npm run test:integration && npm run test:e2e，回报状态、权限、事件和异常。

### VOICE-G：QA

> 你是 CareLoop QA Agent。根据本总文档验证单轮语音点餐。覆盖清晰普通话、复杂多菜品、吐字不清候选、方言/同音、权限拒绝、浏览器不支持、空文本、超时、重复提交、会话过期、工作人员接管、口味传递和确认约束。不得删除或放宽断言修复失败，允许修改 tests/ 和验收文档。运行 npm run lint、npm run build、npm run test、npm run test:integration、npm run test:e2e，输出通过项、失败项、阻塞项、兼容性、演示风险和发布建议。

## 10. 测试与验收

单元：意图 schema、数量、精确/别名/同音菜名、口味、多菜品、桌号、空文本、确认/取消/工作人员、置信度和候选排序。

集成：预览无副作用、确认约束、低置信度不进后厨、口味一致、会话过期、幂等、工作人员审计、WebSocket 事件。

E2E：清晰普通话、复杂表达、候选修正、连续失败转人工、权限失败手动兜底、语音预览到后厨配送闭环。

发布命令：

```bash
npm run lint
npm run build
npm run test
npm run test:integration
npm run test:e2e
```

发布门槛：全部通过；无未经确认下单、错误口味绑定、重复订单、白屏或无兜底；至少验证 Chrome 桌面和 Android Chrome/Chromium 平板。

## 11. 交付协议

分支：codex/voice-a-domain、codex/voice-b-parser、codex/voice-c-api、codex/voice-d-storage、codex/voice-e-ui、codex/voice-f-staff-realtime、codex/voice-g-qa。

标准回报：

```markdown
## 任务完成回报
- 任务编号：VOICE-X
- 分支/工作区：
- 修改文件：
- 新增接口或类型：
- 关键行为：
- 测试命令和结果：
- 未完成事项：
- 已知风险：
- 是否可以合并：是/否
```

主 Agent 合并前检查授权范围、测试、any/硬编码价格/真实密钥、确认约束、现有订单后厨传送带回归和文档同步；全部合并后再次运行五条发布命令。

连续对话待单轮稳定后开发，复用 VoiceSession、槽位、解析器和确认机制，新增 turns、上下文超时、逐槽位追问和打断处理，但不得绕过服务端校验和订单确认。
