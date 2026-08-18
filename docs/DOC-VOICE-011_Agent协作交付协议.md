# DOC-VOICE-011 Agent 协作交付协议

| 项目 | 内容 |
|---|---|
| 文档编号 | DOC-VOICE-011 |
| 版本 | v1.0 |
| 状态 | Agent 协作规范 |
| 更新时间 | 2026-08-18 |

## 1. 分支命名

```text
codex/voice-a-domain
codex/voice-b-parser
codex/voice-c-api
codex/voice-d-storage
codex/voice-e-ui
codex/voice-f-staff-realtime
codex/voice-g-qa
```

如果 Grok Agent 不支持分支，必须使用独立 worktree 或在执行前记录 `git status`，完成后只提交任务范围内的文件。

## 2. 共享契约变更流程

VOICE-A 完成后，主 Agent 将领域类型作为冻结契约。后续 Agent 如果需要改变字段，必须：

1. 在任务回报中说明字段变更原因。
2. 同时更新调用方和测试。
3. 不删除旧字段，除非提供迁移兼容。
4. 更新 DOC-VOICE-003、DOC-VOICE-004 和本协议。

## 3. 标准回报模板

```markdown
## 任务完成回报

- 任务编号：VOICE-X
- 分支/工作区：
- 修改文件：
- 新增接口或类型：
- 关键行为：
- 测试命令：
- 测试结果：
- 未完成事项：
- 已知风险：
- 是否可以合并：是/否
```

## 4. 合并前检查

主 Agent 合并任何任务前检查：

- 是否只修改授权范围。
- 是否新增了测试。
- 是否出现 `any`、硬编码价格、绕过确认或真实密钥。
- 是否影响已有 `/api/orders`、后厨、传送带 E2E。
- 是否同步更新接口文档。

合并全部任务后运行：

```bash
npm run lint
npm run build
npm run test
npm run test:integration
npm run test:e2e
```

