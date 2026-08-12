# CareLoop Intelligent Community Canteen Ordering System

## Full-Stack Development Guide v0.1.0

> **English note:** This document defines the product scope, architecture, implementation tasks, agent prompts, acceptance criteria, and test requirements for the CareLoop Web Demo.

**文档版本：** v0.1.0  
**文档状态：** 开发基线 / Demo 版本规划  
**适用范围：** 大学生商业比赛 Demo、单个试点食堂、Web 全端  
**最后更新：** 2026-08-12

---

## 1. 文档目的 / Document Purpose

本指导书用于指导 CareLoop 社区食堂智能点餐系统的产品设计、前端开发、后端开发、语音交互开发、测试和比赛演示。

本版本的目标不是立即接入真实支付、AICAN 机器人协议或真实传送带，而是构建一个业务闭环完整、交互可信、可扩展到多家食堂的 Web Demo。

本版本必须能够演示以下完整链路：

```text
自主点餐 / 为他人点餐
        ↓
语音或图形化选择菜品
        ↓
口味与健康要求确认
        ↓
固定编号餐桌确认
        ↓
订单确认
        ↓
后厨制作任务
        ↓
AICAN 模拟设备任务
        ↓
传送带模拟配送到指定桌号
        ↓
顾客查看订单完成状态
```

---

## 2. 版本和范围定义 / Version and Scope

### 2.1 当前版本编号 / Current Version

当前开发指导书编号为 **v0.1.0**。

版本号采用语义化规则：

```text
MAJOR.MINOR.PATCH
```

- `MAJOR`：产品核心架构或业务模型发生不兼容变化。
- `MINOR`：新增完整业务模块或用户能力。
- `PATCH`：Bug 修复、文案、样式、测试和小范围接口调整。

建议版本路线：

| 版本 | 目标 |
|---|---|
| v0.1.0 | 产品设计基线和 Demo 技术方案 |
| v0.2.0 | 基础账户、菜品、订单和大屏点餐闭环 |
| v0.3.0 | 语音点餐和口味偏好 |
| v0.4.0 | 为他人点餐、确认和通知 |
| v0.5.0 | 工作人员协助、后厨端和订单状态同步 |
| v0.6.0 | 餐桌配送和传送带模拟 |
| v0.7.0 | 地图导航、实体卡模拟和演示数据 |
| v0.8.0 | 综合联调、异常流程和视觉优化 |
| v1.0.0 | 比赛演示候选发布版本 |

每次发布必须新增或更新对应版本的 Markdown 变更记录，并写明：

- 新增能力
- 修改内容
- 已知问题
- 测试范围
- 测试结果
- 是否适合现场演示

### 2.2 当前明确范围 / Confirmed Scope

本版本确定的业务条件如下：

- 当前为单个试点食堂，数据模型必须支持未来多食堂。
- 所有终端均使用 Web 实现。
- 用户需要姓名和手机号，不需要身份证或老年卡身份信息。
- 支持自主点餐和为他人点餐。
- 支持微信、支付宝、线下现金支付的业务抽象；当前 Demo 不实现真实支付扣款。
- 食堂不提供外送，订单就餐方式为到店就餐。
- 支持固定编号餐桌。
- 支持自定义口味，例如少盐、少油、不辣、不加葱、不加姜。
- 支持普通话、粤语和英文语音交互的产品流程设计。
- 支持模糊菜品识别，但必须经过用户确认。
- 每家食堂至少有一名工作人员，并提供工作人员协助模式。
- 被代点人员收到通知并确认后，订单才进入制作流程。
- 实体卡支持绑定和刷卡登录；刷脸取餐不属于核心功能，暂不实现。
- AICAN 和传送带均使用适配器与模拟器，不研究真实设备指令协议。
- 日均约 500 人，架构需要为午餐高峰和未来多店扩展预留空间。

### 2.3 明确不在 v0.1.0 Demo 内的内容 / Out of Scope

- 真实微信支付或支付宝支付扣款。
- 真实 AICAN 机器人协议接入。
- 真实传送带控制、传感器和物理安全。
- 人脸识别、刷脸取餐和生物特征存储。
- 外卖、配送到家和骑手系统。
- 复杂会员积分、营销、优惠券和财务结算。
- 生产级医疗诊断或自动生成健康建议。

---

## 3. 产品目标和成功标准 / Product Goals and Success Criteria

### 3.1 产品目标

CareLoop 需要帮助老人以更低的学习成本完成点餐，同时让家人、朋友和工作人员可以可靠地协助老人完成点餐，并将订单要求准确传递到后厨和餐桌配送流程。

### 3.2 Demo 成功标准 / Demo Success Criteria

> **English note:** The Demo is successful only when the complete journey is visible across customer, kitchen, and conveyor views. Device integrations may be simulated, but business states must be real and consistent.

比赛现场至少应完成以下四个场景：

#### 场景 A：老人自主点餐

用户进入大屏端，选择或说出菜品，设置口味，选择 A12 桌，确认订单，后厨看到订单，订单进入制作和配送状态。

#### 场景 B：为他人点餐

张三在移动端为李阿姨点餐，李阿姨收到站内通知或模拟通知，确认订单，张三或李阿姨选择支付方式，订单进入后厨。

#### 场景 C：语音识别失败和工作人员接管

用户说出模糊需求，系统无法可靠匹配，显示候选结果或进入“需要工作人员帮助”，工作人员修改菜品、口味和桌号后提交。

#### 场景 D：餐桌配送

后厨将订单标记为制作完成，传送带端显示托盘和桌号，点击“开始配送”后显示配送中和已送达，顾客端同步更新。

### 3.3 核心质量指标

Demo 阶段建议达到：

- 关键页面加载后不出现空白页或未处理异常。
- 订单从创建到完成状态变化可完整演示。
- 所有关键提交操作有确认反馈。
- 语音识别错误时不创建错误订单。
- 未确认的代点订单不会进入后厨。
- 餐桌编号始终使用系统中的合法桌号。
- 订单特殊要求在顾客端、工作人员端和后厨端一致显示。
- 刷新页面后，已创建订单仍可恢复。

---

## 4. 用户角色和权限 / Roles and Permissions

### 4.1 用户角色

| 角色 | 主要能力 |
|---|---|
| 顾客 | 为自己点餐、查看订单、维护偏好、选择桌号 |
| 代点人 | 为他人创建订单、查看确认状态、选择付款方式 |
| 被代点人 | 接收通知、确认或拒绝订单、查看订单 |
| 工作人员 | 协助点餐、接管会话、修正订单、处理异常 |
| 后厨人员 | 查看制作任务、修改制作状态 |
| 食堂管理员 | 管理菜品、桌号、营业时间、设备和订单 |
| 系统管理员 | 管理食堂、用户权限和系统配置 |

### 4.2 账户模型

订单必须分离以下三个身份：

```text
created_by_user_id   下单操作人
customer_user_id     实际就餐人
payer_user_id        付款人，可为空
```

例如：

```text
张三为李阿姨点餐
下单人：张三
就餐人：李阿姨
付款人：张三或李阿姨
```

### 4.3 权限原则

- 普通顾客只能查看和管理自己的订单。
- 代点人可以查看自己创建的代点订单。
- 被代点人必须确认订单，除非以后增加预授权功能。
- 工作人员可以接管需要协助的会话，但所有修改必须留下操作记录。
- 后厨人员只能处理已经确认并进入制作流程的订单。
- 管理员可以配置业务数据，但不能无审计地修改历史订单。

---

## 5. 总体技术架构 / System Architecture

### 5.1 推荐架构 / Recommended Architecture

> **English note:** Use a modular monolith for the pilot. Keep domain boundaries and adapter interfaces clean so the system can later evolve into a multi-canteen platform or split services without rewriting the core order model.

第一阶段采用模块化单体，避免过早拆分微服务：

```text
Web Frontend
 ├── Customer Mobile UI
 ├── Elder Kiosk UI
 ├── Staff Console
 ├── Kitchen Display
 ├── Conveyor Simulator
 └── Admin Console
          ↓ REST API + WebSocket
Backend Modular Monolith
 ├── Auth Module
 ├── User Module
 ├── Canteen Module
 ├── Menu Module
 ├── Preference Module
 ├── Order Module
 ├── Notification Module
 ├── Kitchen Module
 ├── Robot Adapter
 ├── Conveyor Adapter
 └── Map Adapter
          ↓
PostgreSQL / Demo Event Store / External API Adapters
```

### 5.2 技术建议 / Technology Recommendations

- 前端：React + TypeScript。
- 后端：Node.js + TypeScript，或项目已有后端技术栈。
- 数据库：PostgreSQL。
- 实时通信：WebSocket；若项目尚未引入，可先使用轮询，随后升级。
- 前端状态：TanStack Query 加轻量本地状态管理。
- 表单校验：Zod 或同类 schema 校验库。
- API 文档：OpenAPI。
- 单元测试：Vitest/Jest + 后端测试框架。
- 端到端测试：Playwright。
- 代码质量：ESLint、Prettier、TypeScript strict mode。

如果后端使用 Python，必须使用 UV 管理依赖和运行测试，不能直接使用系统 Python 或手工 pip 安装。

### 5.3 推荐目录结构

```text
careloop/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── domain/
│   ├── ui/
│   ├── api-client/
│   └── config/
├── database/
│   ├── migrations/
│   └── seed/
├── docs/
│   ├── DEVELOPMENT_GUIDE_v0.1.0.md
│   └── CHANGELOG.md
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── fixtures/
└── README.md
```

---

## 6. 核心业务流程 / Core Business Flows

### 6.1 自主点餐流程

```text
进入系统
  ↓
刷实体卡 / 输入手机号 / 游客 Demo 模式
  ↓
选择语言
  ↓
选择菜品或进入语音点餐
  ↓
设置数量和口味
  ↓
查看偏好、健康要求和过敏提醒
  ↓
选择固定编号餐桌
  ↓
确认订单
  ↓
选择支付方式
  ↓
提交制作
```

### 6.2 为他人点餐流程

```text
代点人登录
  ↓
选择“为他人点餐”
  ↓
选择联系人或输入姓名和手机号
  ↓
选择菜品、口味和桌号
  ↓
选择付款人
  ↓
创建待确认订单
  ↓
被代点人收到通知
  ↓
被代点人确认 / 拒绝 / 请求修改
  ↓
确认后进入后厨
```

### 6.3 工作人员接管流程

```text
用户点击“需要工作人员帮助”
  ↓
系统创建 StaffSession
  ↓
工作人员认领会话
  ↓
工作人员查看语音文本和候选菜品
  ↓
工作人员修改或补充信息
  ↓
用户口头或点击确认
  ↓
工作人员提交订单
```

### 6.4 后厨和配送流程

```text
订单 CONFIRMED
  ↓
创建 KitchenTask
  ↓
后厨开始制作
  ↓
制作完成
  ↓
创建 RobotTask 和 ConveyorTask
  ↓
分配托盘和桌号
  ↓
开始配送
  ↓
标记已送达
```

---

## 7. 订单状态机 / Order State Machine

> **English note:** The backend is the single source of truth for order state. Frontend clients may request transitions, but they must never mutate order status locally as final truth.

### 7.1 主订单状态 / Primary Order States

```text
DRAFT
  ↓
PENDING_CONFIRMATION
  ↓
CONFIRMED
  ↓
PAYMENT_PENDING / PAID / PAY_AT_COUNTER
  ↓
SENT_TO_KITCHEN
  ↓
COOKING
  ↓
READY_FOR_DELIVERY
  ↓
DELIVERING
  ↓
DELIVERED
  ↓
COMPLETED
```

### 7.2 异常状态

- `CANCELLED`：用户或工作人员取消。
- `REJECTED`：被代点人拒绝。
- `NEEDS_STAFF`：需要工作人员处理。
- `DELIVERY_FAILED`：传送带模拟配送失败。
- `PAYMENT_FAILED`：支付模拟失败。

### 7.3 状态转换规则 / Transition Rules

| 当前状态 | 允许转换 | 执行者 |
|---|---|---|
| DRAFT | PENDING_CONFIRMATION、CONFIRMED | 顾客/工作人员 |
| PENDING_CONFIRMATION | CONFIRMED、REJECTED、CANCELLED | 被代点人/代点人 |
| CONFIRMED | PAYMENT_PENDING、PAID、PAY_AT_COUNTER | 顾客/工作人员 |
| PAID/PAY_AT_COUNTER | SENT_TO_KITCHEN | 系统 |
| SENT_TO_KITCHEN | COOKING | 后厨 |
| COOKING | READY_FOR_DELIVERY | 后厨 |
| READY_FOR_DELIVERY | DELIVERING | 传送带端/工作人员 |
| DELIVERING | DELIVERED、DELIVERY_FAILED | 传送带端/工作人员 |
| DELIVERED | COMPLETED | 系统/工作人员 |

所有状态转换必须经过后端校验，不能仅由前端修改状态。

---

## 8. 数据库设计 / Database Design

### 8.1 核心表

#### users

```text
id UUID PRIMARY KEY
name VARCHAR(100) NOT NULL
phone VARCHAR(30) UNIQUE NOT NULL
preferred_language VARCHAR(20) DEFAULT 'zh-CN'
created_at TIMESTAMP NOT NULL
updated_at TIMESTAMP NOT NULL
```

#### canteens

```text
id UUID PRIMARY KEY
name VARCHAR(150) NOT NULL
address TEXT NOT NULL
latitude DECIMAL(10,7)
longitude DECIMAL(10,7)
status VARCHAR(30) NOT NULL
created_at TIMESTAMP NOT NULL
```

#### tables

```text
id UUID PRIMARY KEY
canteen_id UUID NOT NULL REFERENCES canteens(id)
table_number VARCHAR(30) NOT NULL
area VARCHAR(80)
capacity INTEGER
status VARCHAR(30) NOT NULL
UNIQUE(canteen_id, table_number)
```

#### dishes

```text
id UUID PRIMARY KEY
canteen_id UUID NOT NULL REFERENCES canteens(id)
name VARCHAR(120) NOT NULL
description TEXT
price_cents INTEGER NOT NULL
category VARCHAR(50) NOT NULL
available BOOLEAN NOT NULL DEFAULT TRUE
allergens JSONB NOT NULL DEFAULT '[]'
supported_modifiers JSONB NOT NULL DEFAULT '[]'
image_url TEXT
```

#### preferences

```text
id UUID PRIMARY KEY
user_id UUID NOT NULL REFERENCES users(id)
type VARCHAR(30) NOT NULL
name VARCHAR(100) NOT NULL
severity VARCHAR(30) NOT NULL
source VARCHAR(30) NOT NULL
active BOOLEAN NOT NULL DEFAULT TRUE
confirmed_at TIMESTAMP
```

`type` 可取 `TASTE`、`HEALTH`、`ALLERGY`。  
`severity` 可取 `OPTIONAL`、`DEFAULT`、`WARNING`、`CRITICAL`。

#### orders

```text
id UUID PRIMARY KEY
order_number VARCHAR(40) UNIQUE NOT NULL
canteen_id UUID NOT NULL REFERENCES canteens(id)
created_by_user_id UUID NOT NULL REFERENCES users(id)
customer_user_id UUID NOT NULL REFERENCES users(id)
payer_user_id UUID REFERENCES users(id)
table_id UUID NOT NULL REFERENCES tables(id)
source VARCHAR(30) NOT NULL
status VARCHAR(40) NOT NULL
payment_method VARCHAR(30)
language VARCHAR(20)
voice_transcript TEXT
special_instructions TEXT
created_at TIMESTAMP NOT NULL
updated_at TIMESTAMP NOT NULL
```

#### order_items

```text
id UUID PRIMARY KEY
order_id UUID NOT NULL REFERENCES orders(id)
dish_id UUID NOT NULL REFERENCES dishes(id)
dish_name_snapshot VARCHAR(120) NOT NULL
unit_price_cents INTEGER NOT NULL
quantity INTEGER NOT NULL
modifiers JSONB NOT NULL DEFAULT '[]'
allergen_warnings JSONB NOT NULL DEFAULT '[]'
```

必须保存菜名和价格快照，防止菜品后续修改影响历史订单。

#### device_tasks

```text
id UUID PRIMARY KEY
order_id UUID NOT NULL REFERENCES orders(id)
type VARCHAR(30) NOT NULL
status VARCHAR(30) NOT NULL
payload JSONB NOT NULL
attempt_count INTEGER NOT NULL DEFAULT 0
last_error TEXT
created_at TIMESTAMP NOT NULL
updated_at TIMESTAMP NOT NULL
```

`type` 可取 `AICAN`、`CONVEYOR`、`NOTIFICATION`。

### 8.2 实体卡

```text
physical_cards
 ├── id
 ├── user_id
 ├── card_token_hash
 ├── status
 ├── issued_at
 └── last_used_at
```

实体卡只保存不可逆 token 或 token 的哈希，不在卡内保存姓名和手机号。

---

## 9. API 设计 / API Design

> **English note:** API contracts must be stable, validated on the server, and documented before frontend integration. Never trust raw speech or browser state as an authorized order mutation.

### 9.1 认证和用户

```http
POST /api/auth/request-code
POST /api/auth/verify-code
GET  /api/users/me
PATCH /api/users/me
GET  /api/users/me/preferences
POST /api/users/me/preferences
PATCH /api/users/me/preferences/:id
```

### 9.2 食堂、桌位和菜品

```http
GET /api/canteens
GET /api/canteens/:canteenId
GET /api/canteens/:canteenId/tables
GET /api/canteens/:canteenId/menu
GET /api/canteens/:canteenId/dishes/:dishId
```

### 9.3 订单

```http
POST /api/orders/preview
POST /api/orders
GET  /api/orders/:orderId
POST /api/orders/:orderId/confirm
POST /api/orders/:orderId/reject
POST /api/orders/:orderId/cancel
POST /api/orders/:orderId/assign-table
POST /api/orders/:orderId/payment-intent
```

`POST /api/orders/preview` 必须在正式创建订单前执行：

- 校验菜品存在性
- 校验库存和营业状态
- 应用口味偏好
- 检查过敏原
- 计算价格
- 返回需要用户确认的内容

### 9.4 工作人员

```http
GET  /api/staff/sessions
POST /api/staff/sessions/:id/claim
PATCH /api/staff/sessions/:id
POST /api/staff/sessions/:id/submit-order
GET  /api/staff/exceptions
POST /api/staff/exceptions/:id/resolve
```

### 9.5 后厨和设备

```http
GET  /api/kitchen/tasks
POST /api/kitchen/tasks/:id/start
POST /api/kitchen/tasks/:id/complete
GET  /api/conveyor/tasks
POST /api/conveyor/tasks/:id/dispatch
POST /api/conveyor/tasks/:id/deliver
```

### 9.6 WebSocket 事件

```text
order.created
order.confirmed
order.status_changed
kitchen.task_created
kitchen.task_completed
conveyor.task_dispatched
conveyor.task_delivered
notification.created
staff.session_updated
```

WebSocket 事件只负责实时通知，最终状态仍以 API 查询结果为准。

---

## 10. 语音点餐实现细节 / Voice Ordering Implementation

> **English note:** Speech recognition is an input channel, not an ordering authority. The pipeline must be: Speech-to-Text → Intent Parsing → Menu Matching → Business Validation → User Confirmation → Order Mutation.

### 10.1 语音流程

```text
开始录音
  ↓
浏览器获得麦克风权限
  ↓
ASR 转文字
  ↓
语言识别
  ↓
自然语言解析
  ↓
菜品词典匹配
  ↓
业务规则校验
  ↓
展示候选结果
  ↓
用户确认
  ↓
写入购物车或订单草稿
```

### 10.2 结构化意图

语音解析层只能输出受约束的结构：

```json
{
  "intent": "ADD_ITEM",
  "language": "zh-CN",
  "confidence": 0.91,
  "items": [
    {
      "dish_query": "红烧肉",
      "quantity": 1,
      "modifiers": ["不加姜", "少盐"]
    }
  ],
  "table_query": null,
  "needs_confirmation": true
}
```

支持的意图：

- `ADD_ITEM`
- `REMOVE_ITEM`
- `CHANGE_QUANTITY`
- `SET_MODIFIER`
- `SET_TABLE`
- `QUERY_MENU`
- `CONFIRM_ORDER`
- `CANCEL_ORDER`
- `ASK_FOR_STAFF`
- `UNKNOWN`

### 10.3 模糊匹配规则 / Fuzzy Matching Rules

系统可使用菜品别名、分类、拼音、常用口语和编辑距离进行候选匹配，但必须满足：

- 置信度高于阈值才自动推荐。
- 多个候选时展示候选卡片。
- 低置信度时进入澄清问题。
- 不能仅凭模糊文本直接提交订单。

示例：

```text
“土豆丝” → 酸辣土豆丝、清炒土豆丝
“清淡的肉菜” → 返回肉类菜品并按少盐少油排序
“那个汤” → 根据当前菜单上下文匹配汤类
```

### 10.4 语言支持

初始语言配置：

```text
zh-CN：普通话
yue：粤语
en-US：英语
```

语言适配器必须隐藏具体供应商，接口建议为：

```ts
interface SpeechAdapter {
  transcribe(audio: Blob, language?: string): Promise<TranscriptionResult>
}

interface IntentParser {
  parse(text: string, context: ConversationContext): Promise<OrderIntent>
}
```

Demo 环境允许使用模拟语音输入，但页面必须展示完整的“录音—识别—解析—确认”交互。

### 10.5 安全规则 / Safety Rules

- 语音文本不得直接执行数据库写操作。
- 订单提交前必须经过预览和确认。
- 严重过敏提示必须在顾客端和后厨端同时显示。
- 语音识别失败必须有人工协助入口。
- 录音数据默认不长期保存；如保存 Demo 数据，必须标明为测试数据。

---

## 11. 前端交互和视觉规范 / Frontend UX and Visual Rules

### 11.1 老年友好规范

- 默认正文不小于 20px。
- 主要按钮不小于 56px 高。
- 大屏模式下主要操作区域不小于 72px 高。
- 文本和背景保持高对比度。
- 不用颜色作为唯一状态表达方式。
- 每一步只要求用户完成一个主要任务。
- 语音和按钮操作必须互相可替代。
- 错误信息要说明下一步怎么做。
- 关键提交动作需要清晰复述。

### 11.2 共享组件

```text
AppShell
RoleSwitcher
LanguageSelector
VoiceButton
DishCard
ModifierSelector
PreferenceBanner
AllergenWarning
TablePicker
OrderSummary
OrderStatusTimeline
StaffHelpButton
NotificationToast
KitchenOrderCard
ConveyorTaskCard
```

### 11.3 大屏和移动端差异

| 能力 | 大屏端 | 移动端 |
|---|---|---|
| 登录 | 实体卡、手机号、Demo 模式 | 手机号登录 |
| 菜品展示 | 大卡片、少内容 | 可滚动菜单和分类 |
| 桌位选择 | 平面图和大按钮 | 列表和搜索 |
| 语音 | 按钮明显、支持工作人员接管 | 浏览器麦克风 |
| 代点 | 可由工作人员操作 | 核心功能 |
| 导航 | 简化食堂位置 | 地图 API 和导航按钮 |

---

## 12. 设备适配和模拟方案 / Device Adapters and Simulators

> **English note:** AICAN and conveyor integrations must be isolated behind adapters. Demo simulators should reproduce the same task lifecycle as real devices so production integration can replace the adapter only.

### 12.1 AICAN 适配器

```ts
interface CookingRobotAdapter {
  createCookingTask(input: CookingTaskInput): Promise<DeviceTaskResult>
  getTaskStatus(taskId: string): Promise<DeviceTaskStatus>
  cancelTask(taskId: string): Promise<void>
}
```

Demo 模拟器应支持：

- 创建任务
- 延迟后自动变为制作中
- 点击后变为制作完成
- 随机或手动触发失败
- 返回设备任务编号

### 12.2 传送带适配器

```ts
interface ConveyorAdapter {
  dispatch(input: ConveyorTaskInput): Promise<DeviceTaskResult>
  markDelivered(taskId: string): Promise<void>
  simulateFailure(taskId: string): Promise<void>
}
```

传送带任务至少包含：

```json
{
  "order_id": "order-1024",
  "tray_code": "TRAY-001",
  "table_number": "A12",
  "destination": "A12",
  "status": "READY"
}
```

### 12.3 实体卡模拟

Demo 可以用以下方式模拟刷卡：

- 输入卡号 token。
- 点击“模拟刷卡”。
- 使用二维码链接模拟卡片绑定。

真实 NFC/RFID 设备接入时，只替换卡片读取适配器，不改变用户和订单业务逻辑。

---

## 13. 地图功能 / Map and Navigation

移动端需要提供：

- 食堂地址
- 经纬度
- 营业时间
- 联系电话
- 无障碍说明
- 开始导航按钮

地图适配器建议为：

```ts
interface MapAdapter {
  getPlace(canteenId: string): Promise<Place>
  getRoute(input: RouteInput): Promise<RouteResult>
  getNavigationUrl(place: Place): string
}
```

Demo 阶段可以展示地图卡片、静态位置和“开始导航”按钮；真实地图 API 密钥必须通过环境变量配置，不能提交到代码仓库。

---

## 14. UI 设计基线 / UI Design Baseline

### 14.1 UI 设计目标

CareLoop 的 UI 必须体现“极简适老化”：老人无需理解复杂菜单、状态或设备术语，也能完成点餐、确认桌号、查看送餐进度和结束用餐。

**English UI contract:** The interface must be calm, readable, high-contrast, responsive, and forgiving. Every voice action must have a visible text equivalent, and every automated state must have a clear human-readable explanation.

### 14.2 视觉设计 Tokens

| Token | 推荐值 | 用途 |
|---|---|---|
| `--paper` | `#F8F5ED` | 暖白/米黄页面背景 |
| `--paper-2` | `#FFFDF8` | 卡片背景 |
| `--ink` | `#193B3B` | 主文字 |
| `--muted` | `#6F7F7A` | 次要文字 |
| `--teal` | `#0F6864` | 主操作按钮、进行中状态 |
| `--teal-dark` | `#084D4D` | 深色背景、标题 |
| `--coral` | `#DD5B47` | 语音激活、提醒、危险操作 |
| `--yellow` | `#F2C45A` | ETA、健康提示、等待状态 |
| `--mint` | `#DCEEE5` | 偏好标签、成功状态 |

字号规则：

- 正文不小于 `18px`。
- 大标题不小于 `30px`。
- 老人大屏主要按钮高度不小于 `72px`，移动端不小于 `56px`。
- 辅助说明可以使用 `15px–16px`，但不能承担关键操作信息。
- 关键状态必须同时使用文字、图标和颜色表达。

### 14.3 双端模式

顶部固定显示模式切换：

```text
[ 老人自用模式 ] [ 子女代点模式 ]
```

#### 老人自用模式

- 首页突出问候语和当前订单状态。
- 页面底部或主要视觉中心放置巨大的“语音点餐”按钮。
- 显示“等待点餐、正在做菜、传送带运输、已送达”等简短状态。
- 显示工作人员帮助入口。
- 默认隐藏复杂健康档案编辑，避免认知负担。

#### 子女代点模式

- 显示被照护人的健康档案标签。
- 支持选择高血压、高血糖、需要减脂、牙口不好等标签。
- 展示 AI 推荐健康套餐 Set Menu。
- 支持修改菜品、口味、餐桌和付款人。
- 下单后显示：“已为父母下单，当前桌号：X”。

### 14.4 页面结构

单文件预览位于：

[careloop-ui-preview.html](/Users/cj/careloop/careloop-ui-preview.html)

正式实现应拆为以下路由或页面组件，但必须保持预览版中的交互语义：

```text
/kiosk
 ├── WelcomeHero
 ├── VoiceOrderingCard
 ├── OrderStatusTimeline
 ├── ConveyorMap
 └── MealCompletionPanel

/customer
 ├── ModeSwitcher
 ├── HealthProfilePanel
 ├── AISetMenuCard
 ├── MenuAndModifierPanel
 └── ProxyOrderConfirmation
```

### 14.5 语音主按钮和听觉反馈

语音按钮必须具备以下状态：

| 状态 | 视觉 | 文案 | 行为 |
|---|---|---|---|
| `idle` | 深青色圆形按钮、呼吸灯 | 语音点餐 | 点击开始录音 |
| `listening` | 番茄红、呼吸灯增强 | 正在聆听 | 再次点击结束录音 |
| `transcribing` | 禁止重复点击、显示处理中 | 正在识别 | 等待 ASR 返回 |
| `needs_confirmation` | 显示识别文本和候选项 | 请确认 | 用户确认或修改 |
| `failed` | 显示错误和工作人员入口 | 没听清，请再说一次 | 重试或人工协助 |

TTS 播报必须同时配套：

- 扬声器图标。
- “正在播报/语音播报已开启”文字。
- “再播报一次”按钮。
- 可切换普通话、粤语、English 的语言按钮。

**English interaction rule:** Never use animation alone to communicate system state. Pair every motion effect with a label, icon, or spoken feedback.

### 14.6 传送带地图和动效

地图不使用抽象机器人路线，而使用：

```text
开放式厨房 → 传送带轨道 → 对应桌台
```

必须显示：

- 开放式厨房节点。
- 传送带轨道。
- 托盘或菜品图标。
- 目标桌号，例如 `A12`。
- ETA 倒计时，例如“约 8 分钟”。
- 菜品即将上桌的提示。

动效实现要求：

- 传送带使用平滑、低刺激的循环动效。
- 托盘沿轨道移动，不能突然跳跃。
- 动效不应阻塞按钮点击。
- 用户开启减少动效时，使用静态进度替代。

建议支持：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

### 14.7 订单时间轴

订单生成后显示五步 Timeline：

```text
点餐成功 → AI 烹饪中 → 传送带运输 → 抵达桌面 → 自动回收翻桌
```

状态要求：

- 已完成步骤使用勾选图标。
- 当前步骤使用高亮和轻微呼吸效果。
- 未开始步骤使用低对比度灰色。
- 每一步都必须有文字，不能只显示图标。
- 页面刷新后根据后端订单状态重建 Timeline。

### 14.8 送达和用餐完成

餐品抵达时，顾客端显示高优先级确认层：

```text
您的饭菜已送达，请慢用
```

要求：

- 使用大字号和高对比度。
- 同时进行 TTS 播报。
- 提供关闭和“我知道了”按钮。
- 不得遮挡紧急工作人员帮助入口。

用餐结束后显示唯一主操作：

```text
✓ 用餐完毕 · 回收餐盘
```

点击后依次触发：

```text
订单 COMPLETED → 传送带回收 → 桌面洗消安排 → 桌位恢复可用
```

Demo 阶段可模拟回收和洗消状态，但必须通过后端事件更新，不应只在前端改文案。

### 14.9 Responsive Layout

至少支持以下布局：

| 断点 | 适用场景 | 布局 |
|---|---|---|
| `>= 1050px` | 大屏、桌面 | 双栏 Dashboard，左侧订单/地图，右侧状态/操作 |
| `761px–1049px` | 平板、窄桌面 | 主内容单列，辅助卡片双列 |
| `<= 760px` | 手机 | 单列卡片、模式切换横向填充、地图自适应 |

响应式验收：

- 任何断点不出现横向滚动。
- 主要按钮始终可见且可点击。
- 订单状态和桌号不被折叠隐藏。
- 手机端不使用依赖 hover 的操作。
- 大屏端不将关键操作放在页面最底部之外。

### 14.10 UI 验收标准

- [ ] 正文最小字号达到 18px。
- [ ] 大标题达到 30px 以上。
- [ ] 老人模式和子女代点模式可以随时切换。
- [ ] 老人模式有巨大的语音点餐按钮和呼吸灯。
- [ ] 语音按钮支持 idle、listening、transcribing、confirmation、failed 状态。
- [ ] 子女模式支持健康标签和 AI Set Menu 推荐。
- [ ] 地图显示开放式厨房、传送带、目标桌号和 ETA。
- [ ] 订单 Timeline 包含五个业务步骤。
- [ ] 送达时显示大字确认和 TTS 入口。
- [ ] 用餐完毕会触发回收和洗消状态。
- [ ] 760px 以下无横向滚动。
- [ ] 支持 `prefers-reduced-motion`。
- [ ] 关键状态不只依赖颜色或动画。

---

## 15. Agent 协作开发 Prompts / Agent-Ready Instructions

> **English note:** Every Agent must inspect the repository first, preserve existing user changes, implement only the assigned scope, and report exact commands and results. “Looks good” is not a test result.

以下 prompts 采用 **English-first** 编写，可直接复制给开发 Agent。中文仅用于补充业务语境和产品术语。每个 Agent 必须先检查现有代码和工作区状态，不得覆盖用户已有修改。

### 15.0 Agent 通用执行协议 / Universal Agent Execution Protocol

Copy the following protocol before assigning any implementation task:

```text
You are working on the CareLoop Intelligent Community Canteen Ordering System.

Before changing anything:
1. Inspect the repository structure, existing code, package manager, environment files, and test commands.
2. Check the current git diff and preserve all existing user changes.
3. Read the relevant versioned development guide and implement only the assigned scope.
4. Do not invent external integrations when a simulator or adapter is specified.
5. Do not mark work as complete without running the relevant checks.

When finished, report:
- Files changed.
- Design decisions and assumptions.
- Commands actually executed.
- Exact test results, including pass/fail counts.
- Known limitations and follow-up work.

If a requirement is ambiguous, make the smallest safe assumption, document it, and continue unless it would change the product scope or data model.
```

**Expected effect / 预期效果：** 统一 Agent 的工作方式，减少误改代码、跳过测试和虚构完成结果。

### Prompt A：项目架构 Agent

```text
You are the CareLoop architecture agent. Inspect the existing repository, dependencies, startup commands, and test commands. Design the modular Web full-stack architecture for the v0.1.0 Demo.

Business context: there is one pilot canteen, but the database must support multiple canteens. All terminals are Web applications. The system supports customers, proxy orderers, order recipients, staff, kitchen operators, conveyor operators, and administrators. AICAN and conveyor integrations must use adapters and simulators for now.

Requirements:
1. Preserve all existing user changes.
2. Propose the directory structure, module boundaries, environment variables, startup commands, and test commands.
3. Define the relationships among User, Canteen, Table, Dish, Preference, Order, OrderItem, KitchenTask, DeviceTask, and Notification.
4. Define the order state machine and every allowed transition.
5. Write API contracts for REST endpoints and WebSocket events.
6. Reuse the existing stack when possible; do not refactor without a documented reason.
7. Before editing, report important findings. After editing, run the existing checks and report exact results.

Expected deliverables:
- Architecture document.
- Directory structure.
- Data model draft.
- REST and WebSocket API inventory.
- Startup and test instructions.
- Risks and unresolved questions.
```

Expected effect / 预期效果：建立前后端 Agent 可共同遵循的技术基线，不实现业务页面。

### Prompt B：后端领域模型 Agent

```text
You are the CareLoop backend domain-model agent. Implement the user, canteen, table, dish, preference, and order domain model required by v0.2.0.

The model must support:
- created_by_user_id, customer_user_id, and payer_user_id as separate order identities.
- Fixed numbered tables.
- Dish name and price snapshots on order items.
- Taste preferences, health requirements, and critical allergies.
- Self-orders and proxy orders.
- A server-enforced order state machine that rejects illegal transitions.
- canteen_id on all canteen-scoped entities, even though there is currently one pilot canteen.

Requirements:
1. Read the existing code and database migrations first.
2. Reuse the existing ORM and validation framework.
3. Add unit tests for every order-state transition.
4. Add tests for duplicate submission, invalid table numbers, unavailable dishes, and critical allergy warnings.
5. Keep API response shapes stable and return readable machine-checkable error codes.
6. Do not implement real payments; store only payment method and simulated payment status.

Definition of done: migrations run successfully, seed data loads successfully, and all core domain tests pass.
```

Expected effect / 预期效果：后端可以安全创建、预览、确认和查询订单，并阻止非法状态修改。

### Prompt C：老人大屏 Agent

```text
You are the CareLoop elder-kiosk experience agent. Implement the /kiosk Web experience for older adults with limited digital experience and possible visual or motor constraints.

Pages:
1. Home: start ordering, my orders, and request staff assistance.
2. Menu: large dish cards, categories, quantities, and taste modifiers.
3. Voice ordering: recording state, transcript, candidate dishes, and retry action.
4. Order confirmation: dishes, quantities, modifiers, allergy warnings, and table number.
5. Table selection: fixed numbered tables with both click and text-entry methods.
6. Order status: confirmed, cooking, ready for delivery, delivering, and delivered.

Interaction requirements:
- Use a default body font size of at least 20px and primary buttons at least 56px high.
- Every consequential submission must have a confirmation step.
- Voice and button interactions must be interchangeable.
- Recognition failure must provide a visible staff-assistance path.
- The frontend must never submit an unconfirmed speech result as an order.
- Provide a Demo mode that can complete the full flow with preset utterances.

After implementation, run type checks, unit tests, and end-to-end tests. Report exact results and provide screenshots or page-path evidence.
```

Expected effect / 预期效果：老人可以用少步骤完成点餐，即使语音失败也能完成流程。

### Prompt D：移动端和代点 Agent

```text
You are the CareLoop mobile proxy-ordering agent. Implement the responsive mobile Web experience for self-ordering and ordering on behalf of another person.

The experience must support:
- A Demo phone-number login flow.
- Ordering for oneself.
- Selecting or entering the recipient's name and phone number.
- Selecting a table, dishes, taste modifiers, and payer.
- Creating the order in PENDING_CONFIRMATION.
- Recipient confirmation, rejection, or staff-assistance request.
- A notification center showing pending confirmations.
- The canteen address and a navigation button.

Do not implement real WeChat or Alipay payments. Show payment-method selection and simulated payment results only.

Tests:
- Verify that a proxy order cannot bypass recipient confirmation and enter the kitchen.
- Verify that orderer, recipient, and payer identities remain distinct.
- Verify that a rejected order does not create a KitchenTask.
- Verify that the narrow mobile layout has no horizontal overflow.
```

Expected effect / 预期效果：可以演示“张三为李阿姨点餐—李阿姨确认—订单进入后厨”的完整链路。

### Prompt E：语音点餐 Agent

```text
You are the CareLoop voice-ordering agent. Implement a replaceable speech adapter and a structured intent-parsing layer.

Supported languages: zh-CN Mandarin, yue Cantonese, and en-US English.

Supported intents: ADD_ITEM, REMOVE_ITEM, CHANGE_QUANTITY, SET_MODIFIER, SET_TABLE, QUERY_MENU, CONFIRM_ORDER, CANCEL_ORDER, ASK_FOR_STAFF, and UNKNOWN.

Implementation requirements:
1. Separate speech-to-text, intent parsing, dish matching, and order business rules.
2. Make the ASR provider replaceable.
3. Provide simulated voice input so the Demo does not depend on a live network.
4. Fuzzy matching may produce candidates but must never submit an order directly.
5. Validate every parsed result against a schema.
6. Add tests for “less salt”, “not spicy”, “no ginger”, “two portions”, and “table A12”.
7. Low confidence, multiple candidates, and unknown dishes must trigger clarification or staff assistance.
8. Critical allergy requirements must be prominent in the confirmation card.

Output: adapter interfaces, structured JSON schemas, test fixtures, error-handling strategy, and frontend usage examples.
```

Expected effect / 预期效果：用户的自然语言能够转成可校验的点餐意图，错误时不会产生错误订单。

### Prompt F：后厨和设备模拟 Agent

```text
You are the CareLoop kitchen and device-simulation agent. Implement the /kitchen and /conveyor Web views, plus simulator versions of the AICAN and conveyor adapters.

Requirements:
1. The kitchen view must have columns for queued, cooking, ready, and handed to conveyor.
2. Each order card must show table number, dishes, quantities, taste modifiers, and allergy warnings.
3. Create device tasks only after cooking is completed.
4. The AICAN simulator must support created, cooking, completed, and failed states.
5. The conveyor simulator must show tray code and destination table.
6. Support dispatch, delivered, and delivery-failed states.
7. All state changes must be produced by the backend and synchronized to the customer view through WebSocket events.
8. A failed device task must be retryable by staff without creating a duplicate order.

Tests:
- Only confirmed orders may enter the kitchen.
- Delivery cannot start before cooking is complete.
- The destination must be a valid table number.
- Failed tasks can be retried and retain an audit log.
```

Expected effect / 预期效果：可以在比赛中直观看到订单从后厨流向目标餐桌。

### Prompt G：综合测试 Agent

```text
You are the CareLoop integration-test agent. Run static checks, unit tests, integration tests, and Playwright end-to-end tests against the current repository.

At minimum, cover:
1. The complete self-ordering flow.
2. Proxy ordering and recipient confirmation.
3. Recipient rejection.
4. Voice fuzzy matching and confirmation.
5. Staff takeover after speech recognition failure.
6. Fixed table-number validation.
7. Consistent allergy warnings.
8. Kitchen preparation and conveyor delivery.
9. WebSocket state synchronization.
10. Order recovery after page refresh.
11. Narrow mobile and large-screen layouts.
12. Simulated payment-method selection.

Never treat “the test command started successfully” as a passing test. Report:
- Exact commands executed.
- Exact result for each command.
- Pass, fail, and skipped counts.
- Reproduction steps for every failure.
- Screenshot or video paths.
- Whether the Demo release standard is met.
```

Expected effect / 预期效果：得到可审计的测试报告，而不是只给出“看起来正常”的主观结论。

---

## 16. 测试策略 / Testing Strategy

### 15.1 单元测试 / Unit Tests

重点测试纯业务逻辑：

- 订单状态转换。
- 菜品和桌号校验。
- 价格计算。
- 偏好应用。
- 过敏原判断。
- 语音意图 schema 校验。
- 模糊菜品候选排序。
- 代点确认规则。
- 设备任务重试规则。

### 15.2 集成测试 / Integration Tests

重点测试模块之间的交互：

- 创建订单后产生通知。
- 确认订单后产生 KitchenTask。
- 后厨完成后产生 ConveyorTask。
- 拒绝订单不产生后厨任务。
- 工作人员修改后订单内容正确保存。
- WebSocket 推送与数据库状态一致。

### 15.3 端到端测试 / End-to-End Tests

建议使用 Playwright，至少建立以下测试：

```text
e2e/self-order.spec.ts
e2e/proxy-order.spec.ts
e2e/staff-assistance.spec.ts
e2e/kitchen-conveyor.spec.ts
e2e/voice-order.spec.ts
e2e/responsive-layout.spec.ts
```

### 15.4 可访问性和视觉测试

- 检查键盘操作和焦点顺序。
- 检查按钮文字是否清晰。
- 检查颜色对比度。
- 检查大屏主要按钮尺寸。
- 检查手机端无横向滚动。
- 检查错误、加载和空状态。
- 对关键页面保存截图，作为版本回归基线。

### 15.5 测试数据

必须准备固定 seed 数据：

- 1 个试点食堂。
- 至少 12 张编号餐桌，包括 A01、A02、A12、B01 等。
- 至少 12 道菜品。
- 至少 3 种可选口味。
- 至少 3 个用户：老人、代点人、工作人员。
- 至少 2 个严重过敏示例。
- 至少 3 个代点订单状态。
- 至少 3 个设备任务状态。

测试数据必须明确标记为 Demo 数据，不能使用真实个人信息。

---

## 17. 测试要求和当前测试结果 / Test Requirements and Current Results

> **English note:** Planned tests and executed tests must be separated. A test is marked PASS only when the command was actually executed and the result is recorded.

### 16.1 当前版本已完成检查

本文件是 v0.1.0 的开发指导书，当前已完成：

- 已确认试点业务边界。
- 已确认多端 Web 形态。
- 已确认固定编号餐桌。
- 已确认自主点餐和代点模型。
- 已确认工作人员协助模式。
- 已确认普通话、粤语和英文语音范围。
- 已确认 AICAN、传送带和支付采用适配器/模拟方案。
- 已定义版本编号规则。
- 已定义开发 Agent prompts。
- 已定义测试范围和 Demo 成功标准。

### 16.2 当前尚未执行的测试

由于本版本尚未开始实现业务代码，以下结果必须标记为“待执行”，不能宣称已通过：

| 测试项 | 当前结果 |
|---|---|
| 类型检查 | 待执行 |
| 前端单元测试 | 待执行 |
| 后端单元测试 | 待执行 |
| API 集成测试 | 待执行 |
| Playwright 端到端测试 | 待执行 |
| 语音真实识别测试 | 待执行 |
| 粤语识别测试 | 待执行 |
| 大屏视觉测试 | 待执行 |
| 移动端响应式测试 | 待执行 |
| 后厨到传送带联调 | 待执行 |
| 比赛现场演示排练 | 待执行 |

### 16.3 测试结果填写规范

后续每个版本必须把以下模板填入对应版本的开发文档或变更日志：

```markdown
## 测试结果 v0.x.x

执行时间：YYYY-MM-DD HH:mm
执行环境：操作系统、Node/Python 版本、数据库版本

### 命令

- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`

### 结果

- 类型检查：PASS / FAIL
- 单元测试：PASS，xx passed / xx total
- 集成测试：PASS，xx passed / xx total
- 端到端测试：PASS，xx passed / xx total
- 视觉检查：PASS / FAIL

### 已知问题

- 问题描述
- 复现步骤
- 影响范围
- 临时解决方案

### 发布判断

- 是否允许进入下一版本：是 / 否
- 是否适合比赛演示：是 / 否
```

---

## 18. 开发顺序 / Implementation Roadmap

### Sprint 1：项目基础和数据模型

- 初始化前后端工程。
- 配置数据库和迁移。
- 建立多食堂、桌位、用户、菜品和订单模型。
- 加载 Demo seed 数据。
- 完成订单状态机。

验收：可以通过 API 创建和查询草稿订单，非法状态转换会被拒绝。

### Sprint 2：自主点餐闭环

- 实现大屏首页。
- 实现菜品浏览。
- 实现购物车和口味选择。
- 实现桌号选择。
- 实现订单确认和模拟支付。
- 实现订单状态页。

验收：不使用语音也可以完整完成自主点餐。

### Sprint 3：语音点餐

- 接入 ASR 适配器。
- 实现模拟语音数据。
- 实现意图解析。
- 实现模糊匹配和澄清。
- 实现普通话、粤语、英文切换。

验收：语音结果必须先预览确认，错误识别不会直接下单。

### Sprint 4：代点和通知

- 实现代点人和被代点人。
- 实现待确认订单。
- 实现确认、拒绝和请求协助。
- 实现通知中心。

验收：未确认的代点订单不会进入后厨。

### Sprint 5：工作人员和后厨

- 实现工作人员工作台。
- 实现会话接管。
- 实现后厨订单卡片。
- 实现制作状态。
- 实现实时状态同步。

验收：工作人员可以修正语音订单，后厨可以看到最终确认内容。

### Sprint 6：AICAN 和传送带模拟

- 实现设备适配器。
- 实现 AICAN 模拟任务。
- 实现传送带模拟调度。
- 实现配送状态。

验收：订单可以从后厨进入传送带并显示到目标桌号。

### Sprint 7：地图、实体卡和 Demo 包装

- 实现食堂位置卡片。
- 实现导航入口。
- 实现实体卡模拟绑定和登录。
- 准备比赛 seed 数据。
- 准备演示脚本和异常备用路径。

验收：现场按照演示脚本可在规定时间内稳定完成全流程。

---

## 19. Demo 演示脚本 / Demo Runbook

### 主路径

```text
1. 打开 /kiosk
2. 模拟刷卡登录李阿姨
3. 选择粤语或普通话
4. 点击语音输入
5. 说：“我要一份少盐的红烧肉，不要姜，再来一碗小米粥，送到 A12 桌。”
6. 展示识别文本和结构化结果
7. 用户确认
8. 展示订单进入制作中
9. 打开 /kitchen
10. 点击制作完成
11. 打开 /conveyor
12. 点击开始配送
13. 点击已送达
14. 回到 /kiosk 展示订单完成
```

### 代点路径

```text
1. 打开移动端
2. 张三选择“为他人点餐”
3. 选择李阿姨
4. 选择菜品、少盐、A12 桌
5. 选择由张三付款
6. 打开李阿姨的通知视图
7. 李阿姨确认
8. 后厨端收到订单
```

### 备用路径

如果真实语音识别、网络或设备模拟失败，必须能够通过“使用示例语句”“工作人员接管”和“模拟设备完成”继续完成演示。

---

## 20. 风险和处理策略 / Risks and Mitigations

| 风险 | 处理方式 |
|---|---|
| 老人语音识别错误 | 复述确认、候选选择、工作人员接管 |
| 粤语识别不稳定 | 预置 Demo 语句和可切换普通话模式 |
| 网络不稳定 | 模拟数据、本地状态恢复、备用演示路径 |
| 订单状态不一致 | 后端状态机为唯一事实来源 |
| AICAN 协议未知 | 使用适配器，不把设备协议写死在订单模块 |
| 传送带真实控制复杂 | Demo 先做状态模拟 |
| 过敏信息误用 | 强提醒、人工确认，不自动提供医疗结论 |
| 多食堂扩展困难 | 所有核心表和接口加入 canteen_id |
| 页面不适合老人 | 大字体、大按钮、少步骤、真实用户测试 |
| 比赛现场失败 | 预置数据、可控语音、模拟设备和端到端排练 |

---

## 21. v0.1.0 验收清单 / v0.1.0 Acceptance Checklist

- [ ] 本指导书已保存到 `docs/DEVELOPMENT_GUIDE_v0.1.0.md`。
- [ ] 团队确认产品范围和不包含范围。
- [ ] 团队确认订单中的下单人、就餐人和付款人模型。
- [ ] 团队确认固定桌号命名方式。
- [ ] 团队确认 Demo 使用的菜品和用户数据。
- [ ] 团队确认前后端技术栈。
- [ ] 团队确认真实 ASR 或模拟 ASR 的选择。
- [ ] 团队确认通知使用站内通知还是外部消息模拟。
- [ ] 团队确认比赛现场演示主路径。
- [ ] 团队确认每个版本必须有测试结果记录。

---

## 22. 后续版本文档要求 / Requirements for Future Versions

从 v0.2.0 开始，每一版开发书必须保留以下结构：

1. 版本编号和发布日期。
2. 本版本目标。
3. 相比上一版本的变更。
4. 新增或修改的数据库结构。
5. 新增或修改的 API。
6. 新增或修改的页面和交互。
7. 对应 Agent prompts。
8. 实现验收标准。
9. 实际测试命令和测试结果。
10. 已知问题和下一版本计划。

版本不得只写“功能完成”，必须提供可复核的测试证据。
