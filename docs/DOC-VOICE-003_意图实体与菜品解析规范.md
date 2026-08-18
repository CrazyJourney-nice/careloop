# DOC-VOICE-003 意图、实体与菜品解析规范

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-003 |
| 版本 | v1.0 |
| 状态 | 开发基线 |
| 更新时间 | 2026-08-18 |

## 1. 意图枚举

```text
ADD_ITEM          添加菜品
REMOVE_ITEM       删除菜品
CHANGE_QUANTITY   修改数量
SET_MODIFIER      设置口味或健康要求
SET_TABLE         设置餐桌
QUERY_MENU        查询菜单
CONFIRM_ORDER     确认当前预览
CANCEL_ORDER      取消当前操作
ASK_FOR_STAFF     请求工作人员
UNKNOWN           无法识别
```

## 2. 结构化输出

```json
{
  "intent": "ADD_ITEM",
  "language": "zh-CN",
  "rawText": "我要两份不辣的番茄炒蛋，再来一碗粥",
  "normalizedText": "我要2份不辣的番茄炒蛋，再来1碗小米粥",
  "confidence": 0.78,
  "needsConfirmation": true,
  "items": [
    {
      "dishId": "DISH-005",
      "dishQuery": "番茄炒蛋",
      "quantity": 2,
      "modifiers": {"salt": "normal", "spicy": "none", "texture": "normal"}
    },
    {
      "dishId": "DISH-007",
      "dishQuery": "小米粥",
      "quantity": 1,
      "modifiers": {"salt": "normal", "spicy": "normal", "texture": "normal"}
    }
  ],
  "tableQuery": null,
  "candidates": []
}
```

## 3. 结构化口味字段

每个订单明细保存独立字段，推荐：

```text
salt: NORMAL | LESS | NONE
spicy: NORMAL | LESS | NONE
oil: NORMAL | LESS | NONE
onion: NORMAL | NONE
ginger: NORMAL | NONE
texture: NORMAL | SOFT | EASY_TO_CHEW
```

未提及的要求必须为 `NORMAL` 或 `null`，不能把“未识别”误写成“不要”。菜品不支持某项要求时，必须提示用户并让其选择保留、删除或请求工作人员。

## 4. 复杂表达解析

解析器应覆盖：

- 数量：一份、两份、来两个、要一碗、再加一份。
- 否定：不要辣、不放葱、别加姜、清淡一点。
- 程度：少盐、少油、微辣、软一点。
- 组合：一份鱼和一份青菜；前一道少盐，后一 道不辣。
- 口语/别名：肉菜→红烧肉，粥→小米粥，土豆丝→酸辣土豆丝。
- 桌号：A12、A12桌、坐 A 12、我要 A 区 12 号桌。

当修饰词无法明确归属某道菜时，应将其作为候选待确认，不得自动套用到全部菜品。

## 5. 老人吐字不清和方言策略

- 开启 `maxAlternatives=3`，保留多个候选转写。
- 建立按食堂配置的菜品别名、粤语/方言词和常见同音字词典。
- 结合菜单上下文进行纠错，例如“番茄炒蛋”优先于不存在的同音词。
- 低置信度时展示“您是不是要……”候选卡，而不是仅显示“识别失败”。
- 连续两次低置信度或用户点击“不是这些”后，自动创建工作人员会话。
- 支持用户点击菜品、口味和桌号完成修正。
- 原始转写保留用于本次纠错，但不得在界面上把不确定内容显示成已确认事实。

