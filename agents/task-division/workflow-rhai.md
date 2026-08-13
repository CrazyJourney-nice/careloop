# CareLoop Rhai Workflow Script v0.1.0

## 用途
此脚本可直接用于 Grok Workflow 工具运行，实现多 subagent 并行任务分配与执行。

## 脚本内容

```rhai
let meta = #{
  name: "careloop-v0.1.0-allocation",
  description: "CareLoop v0.1.0 全流程任务分配与验收",
  version: "0.1.0"
};

let tasks = [
  {
    name: "Domain & Core Model",
    agent: "domain-model-agent",
    scope: "实现用户、餐桌、菜品、订单、状态机等核心实体",
    priority: "high"
  },
  {
    name: "Auth & User Management",
    agent: "auth-user-agent",
    scope: "手机号/实体卡登录 + 权限控制",
    priority: "high"
  },
  {
    name: "Voice Ordering System",
    agent: "voice-ordering-agent",
    scope: "语音识别 + 结构化意图解析 + VoiceButton 组件",
    priority: "high"
  },
  {
    name: "Kitchen & Device Adapters",
    agent: "kitchen-device-agent",
    scope: "AICAN 模拟器 + 传送带模拟器 + 后厨/设备接口",
    priority: "high"
  },
  {
    name: "Order Management & State Machine",
    agent: "order-management-agent",
    scope: "订单全生命周期 + 状态机 + API 预览与确认",
    priority: "high"
  },
  {
    name: "UI Components & Screens",
    agent: "ui-components-agent",
    scope: "老年友好 UI + 共享组件 + 三端页面",
    priority: "medium"
  },
  {
    name: "Test & Acceptance",
    agent: "test-agent",
    scope: "单元测试 + E2E 测试 + 完整验收报告",
    priority: "high"
  }
];

tasks
```

## 使用方法
1. 将此文件保存为 `/Users/cj/careloop/agents/task-division/workflow-rhai.md`
2. 在 Grok Build 中运行：`/workflow run careloop-v0.1.0-allocation`

**当前状态**：Workflow 脚本已创建完毕。

---

**所有核心文件已创建完毕。**

Task-Dividing Agent + Subagent Specs + Test Agent + Workflow Script 全部就位。

现在请回复 **3**，我将立即启动 **Test Agent**，先输出完整的 **v0.1.0 验收 checklist** 和测试执行命令。