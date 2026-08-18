# DOC-VOICE-009 语音点餐可执行开发总方案

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-009 |
| 版本 | v1.0 |
| 状态 | 可执行开发方案 |
| 适用项目 | CareLoop v0.3.0 |
| 更新时间 | 2026-08-18 |

## 1. Agent 执行目标

将当前 CareLoop v0.1.0 的语音 Demo 升级为可演示、可测试、可继续扩展的单轮语音点餐系统：

```text
浏览器麦克风
  → Web Speech API
  → 原始转写与规范化
  → 结构化意图
  → 菜品/桌号/口味候选
  → 用户确认
  → 订单草稿
  → 最终订单确认
  → 后厨和配送实时同步
```

硬性规则：

1. 语音解析永远不能直接创建已确认订单。
2. 所有不确定菜名必须显示候选并等待用户选择。
3. 口味要求必须存储为订单明细结构化字段，不得只写备注。
4. 识别失败必须有手动点餐和工作人员协助出口。
5. 每个 Agent 只能修改自己任务卡中列出的文件范围。
6. Agent 完成后必须运行任务卡规定的验证命令，并报告修改文件、测试结果和遗留问题。

## 2. 当前代码基线

主要位置：

```text
packages/domain/src/voice/index.ts       现有 IntentParser、MockSpeechAdapter
packages/domain/src/models/Order.ts      订单与 OrderItem
packages/domain/src/models/OrderStatus.ts 订单状态
src/api/orders.ts                         订单、语音预览、工作人员接口
src/api/realtime.ts                       WebSocket 广播
src/api/index.ts                          Express 与 /ws 启动
src/ui/                                   Vite 前端入口
tests/unit/domain.test.ts                 领域测试
tests/integration/api.test.ts             API 测试
tests/e2e/core-flow.spec.ts               E2E 测试
```

现有接口和模型必须优先兼容；若必须破坏兼容，Agent 必须在回报中说明原因并同步更新测试和文档。

## 3. 任务依赖图

```text
VOICE-A 领域契约与数据模型
   ├── VOICE-B 解析器与匹配
   ├── VOICE-C 后端语音会话 API
   │      └── VOICE-E 前端语音交互
   └── VOICE-D 临时数据与安全

VOICE-E 前端语音交互
   └── VOICE-F 工作人员协助与实时同步

VOICE-A + VOICE-B + VOICE-C + VOICE-E + VOICE-F
   └── VOICE-G 集成测试与验收
```

可并行：VOICE-A、VOICE-D、VOICE-B（但 B 依赖 A 的类型定义时先合并 A）。

必须串行：A → C → E → F → G。

## 4. Agent 编排规则

建议由主 Agent 负责：

- 建立任务分支或隔离工作区。
- 按依赖顺序分派任务。
- 合并前运行全量测试。
- 解决跨任务类型冲突。
- 最后更新 CHANGELOG 和本文件的完成状态。

每个 Subagent 不得：

- 修改其他任务卡未授权的模块。
- 删除现有测试来绕过失败。
- 添加真实支付、真实设备控制或人脸识别。
- 将低置信度结果自动提交订单。
- 引入云端服务、密钥或环境变量而未在回报中说明。

## 5. 统一完成定义

任务只有同时满足以下条件才算完成：

- 代码实现完成，类型检查通过。
- 新增或修改测试覆盖正常和失败路径。
- 不破坏原有订单、后厨、传送带流程。
- 文档中的 API 或数据结构与代码一致。
- 运行任务卡指定命令并记录结果。
- 回报中明确列出未完成事项，而不是只说“完成”。

## 6. 推荐执行批次

### 批次 1：基础契约

执行 VOICE-A、VOICE-B、VOICE-D。VOICE-B 可先使用现有模型临时开发，最终必须对齐 A。

### 批次 2：服务端

执行 VOICE-C，完成会话、预览、修正、工作人员接管和过期清理接口。

### 批次 3：前端

执行 VOICE-E，完成 VoiceButton、预览卡、候选选择、TTS 和手动兜底。

### 批次 4：联动

执行 VOICE-F，打通工作人员端、WebSocket 和订单明细展示。

### 批次 5：质量

执行 VOICE-G，完成测试、兼容性记录和验收报告。

