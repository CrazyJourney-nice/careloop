# DOC-VOICE-005 语音会话与订单数据模型

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-005 |
| 版本 | v1.0 |
| 状态 | 开发基线 |
| 更新时间 | 2026-08-18 |

## 1. VoiceSession

建议新增临时会话模型：

```text
id                 会话 ID
userId             当前用户
deviceType         KIOSK | TABLET | MOBILE
language           zh-CN | zh-HK | en-US
status             ACTIVE | PREVIEW_READY | CONFIRMED | STAFF_ASSIST | EXPIRED
rawTranscript      原始转写
normalizedText     规范化文本
asrConfidence      ASR 置信度
intentConfidence   解析置信度
intentSnapshot     结构化意图 JSON
candidateSnapshot  候选 JSON
audioRef           临时音频引用，可为空
expiresAt          过期时间
createdAt / updatedAt
```

## 2. 临时数据保留

- 默认只保留本次会话的转写、候选和解析快照。
- 如果产品需要录音纠错，前端使用 `MediaRecorder` 生成短音频，单段最长 10 秒，标记用户同意后上传。
- 音频和转写默认保存 24 小时，后台清理任务删除过期数据；Demo 可用内存或临时目录模拟。
- 订单完成后不再保留原始音频；订单只保存用户确认后的结构化结果和必要的审计文本。
- 不将老人语音或音频用于训练，除非另行获得明确授权。

## 3. OrderItem 扩展

现有 `modifiers: any` 应逐步替换为可校验结构：

```json
{
  "salt": "LESS",
  "spicy": "NONE",
  "oil": "NORMAL",
  "onion": "NONE",
  "ginger": "NORMAL",
  "texture": "EASY_TO_CHEW"
}
```

保留 `specialInstructions` 作为无法结构化的补充文本，但后厨展示必须优先展示结构化标签。

## 4. 状态流转

```text
ACTIVE → PREVIEW_READY → CONFIRMED → EXPIRED
ACTIVE → STAFF_ASSIST → CONFIRMED
ACTIVE → EXPIRED
```

订单状态必须继续遵守现有 `OrderStatus` 状态机。语音会话确认不等于订单支付或进入后厨；二者必须按现有订单流程分别完成。

