# CareLoop v0.1.0

CareLoop 是面向社区食堂的 Web Demo，覆盖顾客点餐、代点确认、语音预览、工作人员协助、后厨制作和传送带配送模拟。

## 运行

```bash
npm install
npm run build
npm run start
```

打开 <http://localhost:3100>。后端 API 位于 `/api`，WebSocket 位于 `/ws`。

## 验证

```bash
npm run lint
npm run test
npm run test:integration
npm run test:e2e
```

默认运行端口为 `3100`，也可以通过 `PORT` 环境变量覆盖。

支付、AICAN 和传送带均为 Demo 适配器，不接入真实扣款或物理设备。
