# GitHub Pages 部署说明

## 最终网址

仓库为 `CrazyJourney-nice/careloop`，默认 Pages 地址是：

```text
https://crazyjourney-nice.github.io/careloop/
```

三个演示入口：

```text
顾客端：https://crazyjourney-nice.github.io/careloop/
员工端：https://crazyjourney-nice.github.io/careloop/staff.html
管理端：https://crazyjourney-nice.github.io/careloop/admin.html
```

## 首次启用

1. 将 `.github/workflows/deploy-careloop-demo.yml` 和 `2skywork` 推送到 `main`。
2. 打开 GitHub 仓库 `CrazyJourney-nice/careloop`。
3. 进入 `Settings` → `Pages`。
4. 在 `Build and deployment` 下将 `Source` 设为 `GitHub Actions`。
5. 进入 `Actions`，打开 `Deploy CareLoop Demo to GitHub Pages`。
6. 如果推送没有自动触发，点击 `Run workflow`，选择 `main` 后运行。
7. 等待 `build` 和 `deploy` 两个任务变绿。
8. 打开正式 Pages 地址完成验收。

## 自动部署规则

以下文件推送到 `main` 时会自动重新部署：

- `2skywork/**`
- `.github/workflows/deploy-careloop-demo.yml`

工作流执行：

```text
cd 2skywork
npm ci
npm run build
```

然后将 `2skywork/dist` 发布到 GitHub Pages。

## 比赛前验收

1. 使用无痕窗口打开顾客端。
2. 点击“重置演示数据”。
3. 使用文字智能识别生成订单并提交。
4. 在第二个标签页打开员工端，认领并修正会话。
5. 完成后厨制作和配送状态。
6. 在第三个标签页打开管理端，检查订单并上下架菜品。
7. 返回顾客端确认菜品和状态同步。
8. 刷新三个标签页，确认页面正常且没有 404。

需要清除所有演示数据时，打开：

```text
https://crazyjourney-nice.github.io/careloop/?reset=1
```

## 重要限制

- GitHub Pages 是静态托管，不运行 Express 后端。
- 页面是原始 `src/ui` 顾客端、员工端和管理后台的镜像，仅将服务端接口替换为浏览器兼容层。
- 此演示版有意使用浏览器 `localStorage` 和 `BroadcastChannel`。
- 多标签页同步要求页面来自同一个 Pages 域名，并在同一浏览器中打开。
- 不同设备之间不会共享订单，这是比赛演示版的预期行为。
- 浏览器清理站点数据后，演示数据会恢复为空；页面内可随时重置。

## 常见问题

### Pages 显示 404

确认 `Settings` → `Pages` → `Source` 已选择 `GitHub Actions`，并检查 Actions 中最近一次部署是否成功。

### 页面能打开但样式或脚本 404

确认 `vite.config.js` 保留：

```js
base: './'
```

### 修改代码后网页没有变化

确认改动已经推送到 `main`，等待新的 Actions 部署完成，然后强制刷新浏览器。

### Actions 没有自动运行

工作流只监听 `2skywork/**` 和工作流文件本身。也可以在 Actions 页面使用 `Run workflow` 手动部署。
