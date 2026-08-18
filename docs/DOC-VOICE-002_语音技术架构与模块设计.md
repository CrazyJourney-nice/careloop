# DOC-VOICE-002 语音技术架构与模块设计

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-002 |
| 版本 | v1.0 |
| 状态 | 开发基线 |
| 更新时间 | 2026-08-18 |

## 1. 架构原则

语音能力必须通过适配器隔离浏览器 API，领域层不直接依赖 `window`。当前使用浏览器识别和 TTS，测试使用 Mock；未来可替换为云端 ASR/TTS 或连续对话引擎。

```text
VoiceButton
  ↓
VoiceSessionController
  ├── SpeechRecognitionAdapter
  ├── TranscriptNormalizer
  ├── IntentParser
  ├── DishMatcher
  ├── ConfidencePolicy
  └── SpeechSynthesisAdapter
          ↓
     VoicePreview / Order Draft
```

## 2. 建议模块

### 2.1 SpeechRecognitionAdapter

封装 `webkitSpeechRecognition` / `SpeechRecognition`：

- `start(language, options)`
- `stop()`
- `abort()`
- `onResult(transcript, confidence, isFinal)`
- `onError(code)`
- `onEnd()`

默认配置：`continuous=false`、`interimResults=true`、`maxAlternatives=3`。单轮超时建议 8 秒，实际由前端可配置。

### 2.2 TranscriptNormalizer

处理数字、标点、口头停顿词和常见方言/同音字映射。规范化结果不能覆盖原始文本，必须同时保存 `rawText` 和 `normalizedText`。

示例：

```text
“两份番茄炒蛋，少盐少辣椒”
→ quantity=2, dish=番茄炒蛋, modifiers=[少盐, 不辣]
```

### 2.3 DishMatcher

按以下顺序匹配：精确名称 → 菜品别名 → 同义表达 → 拼音/同音候选 → 编辑距离和关键词组合。匹配必须基于当前食堂、当前营业状态和可售菜品。

### 2.4 IntentParser

输入规范化文本、语言、菜单和上下文，输出可校验的 JSON 意图，不执行下单副作用。

### 2.5 ConfidencePolicy

建议使用多因素分级，而不是只相信浏览器单一置信度：

- 高：ASR 置信度 ≥ 0.85，菜名精确匹配，槽位完整；展示结果并要求确认。
- 中：ASR 或菜品匹配 0.60~0.84；展示最多 3 个候选，让用户点击选择。
- 低：低于 0.60、槽位冲突、方言/噪声导致多个不一致候选；要求重说或转工作人员。
- 任何等级都不能绕过确认直接提交订单。

## 3. 浏览器兼容策略

启动时检测 `SpeechRecognition` 和 `speechSynthesis`。不支持识别时隐藏“说一说”或显示不可用提示，并保留手动点餐；TTS 不可用时显示文字提示。

识别权限、HTTPS、浏览器版本和设备麦克风是运行前置条件。生产环境必须使用 HTTPS；本地开发可使用 localhost。

## 4. 后续连续对话扩展点

首期会话对象需要保留：`sessionId`、`language`、`currentDraftId`、`slots`、`turns`、`lastIntent`。将来可将单轮解析器包装为状态机，不改变订单领域模型和接口版本。

