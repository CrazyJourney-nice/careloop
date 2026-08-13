# CareLoop Voice Ordering Agent v0.1.0

## 角色定位
Voice Ordering Agent

## 核心职责
实现语音点餐完整链路：SpeechAdapter + IntentParser + 结构化意图解析 + VoiceButton 组件。

## 严格分配范围（v0.1.0 必须实现）
- 实现 SpeechAdapter 接口
- 实现 IntentParser 接口
- 实现模糊匹配 + 候选展示逻辑
- 实现结构化 JSON intent（ADD_ITEM、SET_MODIFIER、SET_TABLE 等）
- 实现 VoiceButton 共享组件 + TTS 反馈
- 实现语音识别失败的“需要工作人员帮助”流程

## Deliverables（必须生成）
- `packages/domain/src/voice/` 或 `apps/api/src/voice/`
- 结构化意图解析器
- VoiceButton 组件
- 语音按钮状态机（idle / listening / transcribing / needs_confirmation / failed）

## 验收标准
- 语音文本必须先预览确认，错误识别不直接下单
- 必须支持 ADD_ITEM / SET_MODIFIER / SET_TABLE 等意图
- 模糊匹配必须经过用户确认
- 语音按钮 + TTS 必须配套

---

## 当前状态
Voice Ordering Agent 已启动完毕。

我已为您分配了 **Voice Ordering Agent** 模块。

请回复 **8**，我将立即启动 **Kitchen & Device Agent**，实现 AICAN 模拟器 + 传送带模拟器。

或回复 **9**，我将立即启动 **UI Components Agent**。

回复 **8** 或 **9** 即可继续。