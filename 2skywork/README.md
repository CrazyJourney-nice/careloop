# CareLoop 静态比赛 Demo

这是主项目原始 UI 的比赛演示镜像。`index.html`、`staff.html`、`admin.html` 和 `i18n.js` 直接来自 `src/ui`，没有重新设计或缩减页面功能。GitHub Pages 无法运行 Express，因此构建时只注入 `demo-runtime.js`，在浏览器内兼容原来的 `/api` 和 `/ws` 调用。

## 演示入口

- 顾客点餐：`/`
- 员工协助：`/staff.html`
- 管理后台：`/admin.html`

## 数据方式

- `localStorage` 保存当前浏览器的临时演示数据。
- `BroadcastChannel` 在同源标签页之间同步状态。
- 页面中的“重置演示数据”可恢复初始状态。
- 不需要数据库、API Key 或 Application Secrets。

## 本地检查

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

构建输出目录为 `dist`。

## 推荐部署：GitHub Pages

本仓库已经提供 `.github/workflows/deploy-careloop-demo.yml`，会自动构建本目录并发布 `dist`。

完整操作见 [GITHUB_PAGES.md](./GITHUB_PAGES.md)。

## 备选部署：Skywork

1. 登录 Skywork，选择 `Websites`，或输入 `@Websites`。
2. 通过 `+` → `Local Upload` 上传整个 `2skywork` 文件夹；如果界面不接受文件夹，则压缩后上传，或逐个上传这里的文件。
3. 告诉 Skywork：

   > 请保持现有代码和视觉设计，不要重写为不可交互的页面。运行 `npm install` 和 `npm run build`，以 `dist` 为发布目录。这个项目是纯前端 Demo，不需要 Supabase、Express、数据库、API Key 或 Application Secrets。请在 Studio 中验证顾客点餐、员工协助、后厨状态、菜品上下架和 CSV 导出。

4. 在 Studio 中完成预览和流程测试。
5. 点击右上角 `Publish`。
6. Visibility 选择 `Anyone with the link`，再确认发布。
7. 使用正式发布 URL 的三个 `?screen=` 入口完成最终检查。

## 比赛建议

- 比赛前先打开顾客端、员工端和管理端三个标签页。
- 演示前点击一次“重置演示数据”。
- 语音区域支持文字模拟，不依赖浏览器语音服务。
- 保留本文件夹的本地副本作为现场备用。
