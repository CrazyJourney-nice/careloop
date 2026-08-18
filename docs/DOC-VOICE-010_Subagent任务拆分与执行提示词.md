# DOC-VOICE-010 Subagent 任务拆分与执行提示词

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-010 |
| 版本 | v1.0 |
| 状态 | 可直接分派 |
| 更新时间 | 2026-08-18 |

> 使用方式：主 Agent 为每个任务启动一个独立 Subagent，将对应“可复制提示词”完整发送给 Grok Agent。每个任务应使用独立分支或 worktree；任务完成后由主 Agent 合并。

## VOICE-A：领域契约与数据模型 Agent

### 责任

定义语音会话、结构化口味、意图输出和订单明细类型，保证前后端共用同一契约。

### 允许修改

```text
packages/domain/src/voice/
packages/domain/src/models/Order.ts
packages/domain/src/models/OrderStatus.ts
tests/unit/domain.test.ts
```

### 交付物

- `ModifierProfile` 类型和 Zod schema。
- `VoiceSession`、`VoiceSessionStatus`、`VoiceTurn` 类型。
- 完整的 `OrderIntent` schema，保留现有枚举兼容性。
- `OrderItem.modifiers` 从 `any` 逐步收紧为可校验结构。
- 对应单元测试。

### 可复制提示词

```text
你是 CareLoop 项目的领域模型 Agent。请在当前仓库实现 DOC-VOICE-010 的 VOICE-A 任务。

目标：定义可供前端和后端共同使用的语音会话、结构化口味和意图契约，并兼容现有订单流程。

必须支持：
1. Intent：ADD_ITEM、REMOVE_ITEM、CHANGE_QUANTITY、SET_MODIFIER、SET_TABLE、QUERY_MENU、CONFIRM_ORDER、CANCEL_ORDER、ASK_FOR_STAFF、UNKNOWN。
2. ModifierProfile：salt、spicy、oil、onion、ginger、texture；未提及字段不能被错误解释为 NONE。
3. VoiceSession：id、userId、deviceType、language、status、rawTranscript、normalizedText、asrConfidence、intentConfidence、intentSnapshot、candidateSnapshot、audioRef、expiresAt、createdAt、updatedAt。
4. 所有外部输入使用 zod 校验；不得依赖 any 绕过类型检查。
5. 不改变 OrderStatus 的业务语义，不删除现有字段。

先阅读现有 packages/domain/src/voice/index.ts、Order.ts、OrderStatus.ts 和测试，再实现最小必要修改。补充正常、空文本、低置信度、多个候选和口味字段测试。

禁止：修改 UI、修改 Express 路由、接入真实语音服务、删除测试。

完成前运行：npm run lint && npm run test -- --run tests/unit/domain.test.ts
最终回报必须包含：修改文件、核心类型、测试命令与结果、兼容性风险、未完成事项。
```

## VOICE-B：语音解析与菜品匹配 Agent

### 责任

实现老人吐字不清、方言、同音词、口语数量和复杂口味表达的单轮解析。

### 允许修改

```text
packages/domain/src/voice/
tests/unit/voice*.test.ts
```

### 交付物

- TranscriptNormalizer。
- DishMatcher，支持精确、别名、关键词、同音/拼音候选。
- IntentParser，支持多菜品和修饰词归属。
- 候选排序和置信度策略。
- 至少 20 个中文表达测试，包括失败路径。

### 可复制提示词

```text
你是 CareLoop 的语音解析 Agent。请实现单轮语音文本解析，不调用网络服务。

目标：把老人可能说得不完整、带方言或口语化的中文，转换成必须经过确认的结构化意图。

必须实现：
1. 保留 rawText，同时产生 normalizedText。
2. 支持“一份、两份、来两个、再加一碗”等数量表达。
3. 支持“少盐、不辣、少油、不加葱、不加姜、软一点、易咀嚼”。
4. 支持“我要两份不辣的鱼，再来一碗粥，鱼要软一点”这类多菜品表达，并正确绑定修饰词。
5. 支持菜品精确名、别名、关键词、常见同音/拼音候选；当前菜单不可售时不能匹配为可下单菜品。
6. 输出候选数组，最多 3 个；存在歧义时 needsConfirmation 必须为 true。
7. 置信度按解析质量分级：高 >=0.85，中 0.60~0.84，低 <0.60；无论分级都不能直接下单。
8. 连续两次低置信度的计数留给会话层，不要在解析器内产生 API 副作用。

先阅读现有 IntentParser、MockSpeechAdapter 和菜单模型。保持纯函数优先，避免访问 Express、Map 全局状态或浏览器对象。

禁止：修改订单路由、修改 UI、保存音频、接入云端 ASR。

完成前运行：npm run lint && npm run test -- --run tests/unit
最终回报包含：解析规则、典型输入输出、修改文件、测试结果和已知无法识别的表达。
```

## VOICE-C：语音会话与预览 API Agent

### 责任

提供无副作用的语音预览、修正、确认前会话和过期处理。

### 允许修改

```text
src/api/orders.ts
src/api/voice.ts
src/api/realtime.ts
src/api/index.ts
tests/integration/
```

### 交付物

- `POST /api/voice/sessions`。
- `POST /api/voice/sessions/:id/preview`。
- `GET /api/voice/sessions/:id`。
- `POST /api/voice/sessions/:id/corrections`。
- `POST /api/voice/sessions/:id/request-staff`。
- `DELETE /api/voice/sessions/:id`。
- 过期会话拒绝确认；预览接口无订单副作用。
- 幂等键防止重复创建订单。

### 可复制提示词

```text
你是 CareLoop 的后端 API Agent。请实现 DOC-VOICE-010 的 VOICE-C 任务。

目标：把语音会话和预览流程接入现有 Express API，同时保证“解析预览”和“订单提交”严格分离。

必须实现以下接口：
POST /api/voice/sessions
POST /api/voice/sessions/:id/preview
GET /api/voice/sessions/:id
POST /api/voice/sessions/:id/corrections
POST /api/voice/sessions/:id/request-staff
DELETE /api/voice/sessions/:id

规则：
1. 预览只写 VoiceSession，不创建 Order。
2. 服务端重新校验菜品可售、餐桌合法、口味字段和用户权限。
3. 低置信度或歧义结果只能返回候选或进入 STAFF_ASSIST，不能进入后厨。
4. sessionId 使用随机不可预测值；会话默认 24 小时过期。
5. 删除接口清理临时 transcript、candidate、audioRef。
6. 保持现有 /api/orders/voice-preview 兼容，必要时让其调用新服务。
7. 订单创建必须支持 idempotency key，重复请求返回同一结果。
8. 通过现有 broadcast 发布 voice.preview_ready、voice.correction_saved、voice.staff_requested。

先阅读现有 orders.ts、realtime.ts、api/index.ts 和 integration tests。尽量抽取 service/repository，而不是继续扩大单个路由文件。

禁止：真实支付、真实音频识别、删除旧接口、绕过 OrderStatus。

完成前运行：npm run lint && npm run test:integration && npm run test
最终回报包含：路由清单、状态流转、错误码、测试结果和需要主 Agent 决策的兼容性问题。
```

## VOICE-D：临时音频、隐私与清理 Agent

### 责任

设计可选的短期音频保存，不让音频数据成为默认长期数据。

### 允许修改

```text
src/api/voice-storage.ts
src/api/voice.ts
tests/integration/voice-storage.test.ts
docs/
```

### 可复制提示词

```text
你是 CareLoop 的隐私与临时数据 Agent。请实现语音会话临时数据策略。

默认策略：只保存 rawTranscript、normalizedText、解析快照和候选；原始音频保存能力默认关闭。若实现 MediaRecorder 上传接口，必须限制单段 10 秒、大小、MIME 类型，并设置 24 小时过期。

必须实现：过期时间、清理函数、删除会话时级联删除临时数据、日志脱敏、不可执行文件拒绝，以及单元/集成测试。

禁止：长期保存音频、模型训练、修改业务订单、接入第三方存储。

完成前运行：npm run lint && npm run test
回报包含：默认隐私策略、清理机制、测试结果和剩余安全风险。
```

## VOICE-E：前端语音交互 Agent

### 责任

实现大屏、平板、手机均可使用的语音按钮、预览卡、候选选择、TTS 和手动兜底。

### 允许修改

```text
src/ui/
tests/e2e/
```

### 可复制提示词

```text
你是 CareLoop 的前端语音交互 Agent。请实现单轮语音点餐 UI。

必须实现：
1. 检测 SpeechRecognition 和 speechSynthesis，不支持时保留手动点餐。
2. VoiceButton 状态：idle、listening、transcribing、needs_confirmation、failed。
3. SpeechRecognition 配置 continuous=false、interimResults=true、maxAlternatives=3；单轮超时约 8 秒。
4. 识别结果显示 raw transcript、结构化菜品、数量、口味、餐桌和置信度提示。
5. 候选菜品最多显示 3 个，用户点击后才能替换当前候选。
6. 提供确认、修改、重新说、手动选择、请求工作人员。
7. 使用浏览器 speechSynthesis 播报关键反馈，同时显示文字。
8. 麦克风拒绝、超时、空文本、低置信度、网络失败不白屏。
9. 不把语音预览直接提交为订单；订单最终提交必须有明确点击确认。
10. 适配老人大屏、平板和手机，按钮触摸区域至少 44px，语音按钮建议 64px。

先阅读现有 src/ui 和 E2E 测试，遵循项目已有 UI 风格；如果当前 UI 结构不足，新增最小组件，不重写无关页面。

禁止：修改领域模型、修改后端数据结构、加入外部 UI 框架、绕过 API 确认。

完成前运行：npm run lint && npm run build && npm run test:e2e
回报包含：组件清单、浏览器兼容降级、关键截图/录屏（如环境支持）、测试结果和已知问题。
```

## VOICE-F：工作人员协助与实时同步 Agent

### 责任

让语音失败后工作人员可以接管、修改并提交待确认订单，同时同步后厨和顾客端。

### 允许修改

```text
src/api/orders.ts
src/api/realtime.ts
src/ui/
tests/integration/
tests/e2e/
```

### 可复制提示词

```text
你是 CareLoop 的工作人员协助和实时同步 Agent。请完成语音失败后的接管闭环。

流程：低置信度/用户请求帮助 → STAFF_ASSIST 会话 → 工作人员 claim → 修正菜品、数量、口味、桌号 → 提交预览 → 顾客确认 → 才能进入现有订单、后厨和配送流程。

必须保证：
1. 工作人员修改前后值可审计。
2. 工作人员不能替顾客跳过最终确认，除非现有产品明确允许；本任务默认不允许。
3. 通过 WebSocket 广播会话状态和订单状态。
4. 后厨只看 CONFIRMED/已支付或柜台支付的订单。
5. 结构化 modifiers 在顾客、工作人员、后厨页面一致。
6. 加入抢占/重复 claim 的冲突处理。

先阅读现有 staff sessions、kitchen、conveyor 和 realtime 实现，不破坏已有订单状态机。

禁止：真实通知服务、真实支付、删除已有后厨流程。

完成前运行：npm run lint && npm run test:integration && npm run test:e2e
回报包含：状态流转、权限边界、事件清单、测试结果和异常场景。
```

## VOICE-G：测试与发布验收 Agent

### 责任

补齐语音专属测试、跨模块回归和发布报告。

### 允许修改

```text
tests/
docs/DOC-VOICE-007_测试方案与验收标准.md
docs/CHANGELOG_VOICE.md
```

### 可复制提示词

```text
你是 CareLoop 的质量验收 Agent。请根据 DOC-VOICE-001 至 DOC-VOICE-010 验证单轮语音点餐。

必须覆盖：清晰普通话、复杂多菜品表达、老人吐字不清的候选、方言/同音候选、麦克风拒绝、浏览器不支持、空文本、超时、重复提交、会话过期、工作人员接管、口味字段传递、订单进入后厨前的确认约束。

不得通过删除或放宽断言来修复失败。若发现实现缺陷，先写出失败测试；只有任务范围允许时才修复。

运行：npm run lint、npm run build、npm run test、npm run test:integration、npm run test:e2e。
输出一份验收结果：通过项、失败项、阻塞项、浏览器兼容性、现场演示风险和明确的发布建议。
```

