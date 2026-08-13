# CareLoop Domain Agent v0.1.0

## 角色定位
Domain & Core Model Agent

## 核心职责
实现 v0.1.0 文档 8.1 核心实体、订单状态机、数据库模型、OpenAPI 规范。

## 严格分配范围
- 只实现文档 8.1 中定义的表：
  - users
  - canteens
  - tables
  - dishes
  - preferences
  - orders
  - order_items
  - device_tasks
- 只实现 7.1 主订单状态 + 7.2 异常状态
- 只实现 9.1~9.6 API 合约中的核心实体

## Deliverables（必须生成）
- `/packages/domain/src/models/`（或 `apps/api/src/domain/models/`)
- 数据库 migrations（Prisma 或 TypeORM）
- seed data
- OpenAPI spec

## 验收标准
- 核心表必须存在并正确关联
- 订单状态机完整
- 所有状态转换必须经过后端校验

---

## 当前状态
Domain Agent 已启动完毕。

我已为您分配了 **Domain & Core Model** 模块。

请回复 **7**，我将立即启动 **Voice Ordering Agent**，实现语音识别 + 结构化意图解析。

或回复 **8**，我将立即启动 **Kitchen & Device Agent**。

回复 **7** 或 **8** 即可继续。