# CareLoop Subagent Specs v0.1.0

## 各 Subagent 能力清单

### 1. Task-Dividing Agent
**角色**：任务分配器（已启动）
**职责**：接收用户指令后，根据 `DEVELOPMENT_GUIDE_v0.1.0.md`，严格按照文档边界分配任务。
**当前状态**：已准备就绪，可随时重新分配。

### 2. Domain & Core Model Agent
**子agent名称**：`domain-model-agent`
**主要职责**：
- 实现用户、canteen、table、dish、preference、order、order_item、device_task 等核心实体
- 实现订单状态机（DRAFT → DELIVERED）
- 实现数据库模型（PostgreSQL migrations + seed）
- 实现 OpenAPI 规范

**分配范围**（严格）：
- 只分配 v0.1.0 文档 8.1 核心表
- 只分配 7.1 主订单状态 + 7.2 异常状态
- 只分配 9.1~9.6 API 合约

**Deliverables**：
- `/packages/domain/src/`（或 `apps/api/src/domain/`）
- 数据库 migrations
- seed data
- OpenAPI spec

**Acceptance Criteria**（直接引用文档）：
- 核心表必须存在
- 订单状态机必须完整
- 所有状态转换必须经过后端校验

### 3. Auth & User Management Agent
**子agent名称**：`auth-user-agent`
**主要职责**：
- 实现 `/api/auth/request-code` 和 `/api/auth/verify-code`
- 实现用户实体（手机号、实体卡、偏好等）
- 实现权限控制（created_by_user_id、customer_user_id、payer_user_id）
- 实现 /api/users/me 相关接口

**Deliverables**：
- 用户模型 + 数据库表
- 认证模块
- 权限中间件

### 4. Voice Ordering Agent
**子agent名称**：`voice-ordering-agent`
**主要职责**：
- 实现语音适配器接口（SpeechAdapter）
- 实现结构化意图解析（IntentParser）
- 实现模糊匹配 + 候选展示逻辑
- 实现语音按钮 + TTS 反馈 UI 组件

**Deliverables**：
- 语音识别 + 意图解析层
- 结构化 JSON schema
- 共享组件 `VoiceButton`、`ModifierSelector`

**Acceptance Criteria**：
- 语音文本必须先预览确认，错误识别不直接下单
- 必须支持 ADD_ITEM / SET_MODIFIER / SET_TABLE 等意图
- 模糊匹配必须经过用户确认

### 5. Kitchen & Device Simulation Agent
**子agent名称**：`kitchen-device-agent`
**主要职责**：
- 实现 AICAN 模拟器（CookingRobotAdapter）
- 实现 传送带模拟器（ConveyorAdapter）
- 实现 /api/kitchen/tasks 和 /api/conveyor/tasks 相关接口
- 实现设备任务状态机

**Deliverables**：
- 设备模拟器
- 后厨任务 + 传送带任务
- 模拟延迟、完成、失败、重试逻辑

**Acceptance Criteria**：
- 订单确认后必须创建 KitchenTask
- 传送带任务必须包含 tray_code + table_number
- 失败任务必须可重试且保留审计日志

### 6. Order Management & State Machine Agent
**子agent名称**：`order-management-agent`
**主要职责**：
- 实现订单全生命周期状态机
- 实现订单预览（/api/orders/preview）
- 实现确认、拒绝、取消、支付意图等接口
- 实现 WebSocket 事件通知

**Deliverables**：
- 订单状态机完整实现
- 所有状态转换后端校验
- WebSocket 广播

### 7. UI Components & Screens Agent
**子agent名称**：`ui-components-agent`
**主要职责**：
- 实现老年友好 UI 规范（大按钮、高对比、20px+ 字体）
- 实现共享组件（RoleSwitcher、LanguageSelector、VoiceButton、OrderSummary、TablePicker、PreferenceBanner 等）
- 实现 kiosk / customer / staff 三端页面
- 实现传送带地图 + 动效

**Deliverables**：
- React + TypeScript 组件库
- 所有页面组件
- 响应式适配（大屏/移动端）

### 8. Test Agent
**子agent名称**：`test-agent`
**主要职责**：
- 执行所有单元测试、集成测试、E2E 测试
- 生成完整验收报告
- 验证所有场景（场景 A、B、C、D）

**Deliverables**：
- Vitest/Jest 测试套件
- Playwright E2E 测试
- 验收报告（包含 PASS/FAIL 统计）

---

**Task-Dividing Agent 状态**：已启动完毕。

现在请回复 **2** 或 **3**，我将立即启动对应的 subagent 并输出详细分配清单。