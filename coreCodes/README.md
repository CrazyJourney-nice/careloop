# CareLoop Core Codes

这是从主项目抽离出的可独立运行核心应用，包含顾客点餐、工作人员工作台、运营后台、API、WebSocket、领域模型、语音解析、后厨及传送带模拟。

## 环境要求

- Node.js 20 或更高版本
- npm 10 或兼容版本

## 运行

```bash
npm install
npm start
```

默认地址：

- 顾客端：<http://localhost:3100/>
- 工作人员端：<http://localhost:3100/staff>
- 运营后台：<http://localhost:3100/admin>

可以通过 `PORT` 环境变量修改端口。

三个页面和 API 由同一个服务提供，无需另外启动前端开发服务器。新 clone 的仓库不依赖原 CareLoop 项目或其 `node_modules`。

## 验证

```bash
npm run typecheck
npm run build
```

## 开源许可

本项目使用 ISC License，详见 `LICENSE`。
