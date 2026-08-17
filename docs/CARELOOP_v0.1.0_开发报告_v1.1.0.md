# CareLoop v0.1.0 开发报告（复开发版）

**文档版本：** v1.1.0  
**项目版本：** v0.1.0  
**日期：** 2026-08-17  
**状态：** Demo 闭环已实现，进入可复验状态

## 实现内容

- 修复工程依赖、TypeScript strict 编译和 ESLint 9 配置。
- 实现订单状态机及服务端转换校验：草稿、待确认、确认、支付、后厨、制作、待配送、配送、送达、完成和异常状态。
- 实现订单预览、创建、确认、拒绝、取消、支付意图、语音预览接口。
- 实现固定桌号、菜单、用户、偏好、食堂接口和 Demo seed 数据。
- 实现 SpeechAdapter、MockSpeechAdapter、IntentParser、模糊别名匹配和确认前预览；识别失败可转工作人员。
- 实现工作人员会话、认领、修正/提交占位流程。
- 实现 KitchenSimulator、ConveyorSimulator、任务状态转换、托盘号、桌号和审计日志。
- 实现 WebSocket `/ws` 连接及订单/厨房/传送带/工作人员事件广播。
- 实现响应式顾客、代点、工作人员、后厨/传送带统一 Demo 页面，包含大按钮、语音反馈、桌位选择和传送带动效。
- 增加参考 PostgreSQL migration、OpenAPI 文档、README 和 CHANGELOG。

## 测试结果

在 2026-08-17 执行：

| 命令 | 结果 |
|---|---|
| `npm run build` | PASS，TypeScript 和 Vite 构建成功 |
| `npm run lint` | PASS |
| `npm run test` | PASS，2 个测试文件、6 个测试通过 |
| `npm run test:unit` | PASS |
| `npm run test:integration` | PASS，2 个测试通过 |
| `npm run test:e2e` | PASS，2 个 Playwright 场景通过 |

Playwright 覆盖：顾客选择菜品并触发确认预览；语音未知需求显示 `UNKNOWN` 并进入工作人员协助入口。

## 已知限制

- 运行时仍使用内存 Demo Store，PostgreSQL migration 是参考交付物，尚未接入数据库驱动。
- 真实 ASR、微信/支付宝扣款、地图 API、AICAN 和传送带物理控制不在 v0.1.0 范围内。
- Staff 提交订单和通知中心已提供 API 协议与会话基础，尚未扩展为完整独立工作台流程。

## 现场演示结论

当前版本适合进行本地 Demo 演示和核心流程验收；现场演示应使用模拟支付、示例语音文本和模拟设备按钮，并准备 API 服务启动与依赖安装步骤。
