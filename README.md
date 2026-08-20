# CareLoop v0.1.0

CareLoop 是面向社区食堂的 Web Demo，覆盖顾客点餐、代点确认、语音预览、工作人员协助、后厨制作和传送带配送模拟。

## 运行

```bash
npm install
npm run build
npm run start
```

顾客点餐入口为 <http://localhost:3100>，页面只展示本人点餐和为他人点餐。

工作人员独立工作台为 <http://localhost:3100/staff>，用于处理顾客协助会话、后厨制作和传送带配送。后端 API 位于 `/api`，WebSocket 位于 `/ws`。

统一运营后台为 <http://localhost:3100/admin>，包含运营概览、菜单管理和点单数据管理。后台接口统一位于 `/api/admin`。

## 验证

```bash
npm run lint
npm run test
npm run test:integration
npm run test:e2e
```

默认运行端口为 `3100`，也可以通过 `PORT` 环境变量覆盖。

支付、AICAN 和传送带均为 Demo 适配器，不接入真实扣款或物理设备。
