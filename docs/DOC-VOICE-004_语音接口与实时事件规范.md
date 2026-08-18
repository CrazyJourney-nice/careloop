# DOC-VOICE-004 语音接口与实时事件规范

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-004 |
| 版本 | v1.0 |
| 状态 | 开发基线 |
| 更新时间 | 2026-08-18 |

## 1. 现有接口调整

现有 `POST /api/orders/voice-preview` 保留，但请求和响应扩展为以下结构。

### 请求

```json
{
  "sessionId": "VS-20260818-001",
  "language": "zh-CN",
  "rawText": "我要一份少盐的鱼",
  "asrConfidence": 0.81,
  "alternatives": ["我要一份少盐的鱼", "我要一份少盐的鸡"]
}
```

### 响应

```json
{
  "sessionId": "VS-20260818-001",
  "intent": {"intent": "ADD_ITEM", "confidence": 0.76, "needsConfirmation": true},
  "transcript": {"rawText": "我要一份少盐的鱼", "normalizedText": "我要1份少盐的清蒸鱼"},
  "items": [{"dishId": "DISH-002", "dishName": "清蒸鱼", "quantity": 1, "modifiers": {"salt": "LESS"}}],
  "candidates": [],
  "nextAction": "CONFIRM_PREVIEW"
}
```

## 2. 建议新增接口

| 方法 | 路径 | 用途 |
|---|---|---|
| POST | `/api/voice/sessions` | 创建语音会话 |
| POST | `/api/voice/sessions/:id/preview` | 提交转写文本并解析 |
| GET | `/api/voice/sessions/:id` | 获取会话和当前预览 |
| POST | `/api/voice/sessions/:id/corrections` | 用户修正候选 |
| POST | `/api/voice/sessions/:id/request-staff` | 请求工作人员 |
| DELETE | `/api/voice/sessions/:id` | 清除临时语音数据 |

订单创建接口只接受已确认的结构化购物篮，不接受未经确认的原始文本直接下单。

## 3. WebSocket 事件

沿用 `/ws`，新增：

```text
voice.session_started
voice.transcript_updated
voice.preview_ready
voice.correction_saved
voice.staff_requested
voice.session_expired
```

事件统一包含 `eventId`、`sessionId`、`occurredAt`、`type` 和 `payload`。事件只用于同步 UI，最终订单状态仍以订单 API 为准。

## 4. 错误码

```text
VOICE_UNSUPPORTED       浏览器不支持语音识别
VOICE_PERMISSION_DENIED 用户拒绝麦克风
VOICE_TIMEOUT           录音超时
VOICE_EMPTY             未识别到有效文本
VOICE_LOW_CONFIDENCE    置信度过低
VOICE_NO_DISH_MATCH     没有匹配菜品
VOICE_AMBIGUOUS         存在多个候选
VOICE_SESSION_EXPIRED   会话已过期
```

