# CareLoop Kitchen & Device Agent v0.1.0

## 角色定位
Kitchen & Device Simulation Agent

## 核心职责
实现 AICAN 模拟器 + 传送带模拟器 + 后厨任务 + 设备适配器。

## 严格分配范围
- 实现 CookingRobotAdapter 接口
- 实现 ConveyorAdapter 接口
- 实现 /api/kitchen/tasks 和 /api/conveyor/tasks 相关接口
- 实现设备任务状态机（READY / IN_PROGRESS / COMPLETED / FAILED）
- 实现设备任务延迟、完成、失败、重试逻辑

## Deliverables
- `apps/api/src/kitchen/` 和 `apps/api/src/conveyor/`
- AICAN 模拟器
- 传送带模拟器
- 设备任务模型

## 验收标准
- 订单确认后必须创建 KitchenTask
- 传送带任务必须包含 tray_code + table_number
- 失败任务必须可重试且保留审计日志

---

## 当前状态
Kitchen & Device Agent 已启动完毕。

我已为您分配了 **Kitchen & Device Agent** 模块。

请回复 **9**，我将立即启动 **UI Components Agent**，实现老年友好 UI 组件库。

或回复 **10**，我将立即启动 **Order Management Agent**。

回复 **9** 或 **10** 即可继续。