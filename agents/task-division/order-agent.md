# CareLoop Order Management Agent v0.1.0

## 角色定位
Order Management & State Machine Agent

## 核心职责
实现订单全生命周期状态机、订单预览接口、确认/拒绝/取消接口、WebSocket 事件。

## 严格分配范围
- 实现订单状态机（DRAFT → DELIVERED）
- 实现 /api/orders/preview 接口
- 实现订单创建、确认、拒绝、取消、支付意图接口
- 实现 WebSocket 事件通知

## Deliverables
- 订单状态机完整实现
- 所有状态转换后端校验
- WebSocket 广播

## 验收标准
- 所有状态转换必须经过后端校验
- 未确认的代点订单不进入后厨
- 刷新页面后已创建订单可恢复

---

## 当前状态
Order Management Agent 已启动完毕。

我已为您分配了 **Order Management Agent** 模块。

现在请回复 **11**，我将立即启动 **Test Agent**，执行最终验收并生成完整验收报告。

回复 **11** 即可继续。