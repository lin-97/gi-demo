# Agent 行为准则

> 适用于 Cursor、OpenCode、Codex 等 AI 编码助手。Cursor 经 `AGENTS.md` 内联本节每轮注入。

## 通用要求

- 始终使用**简体中文**与用户沟通。
- 未经用户明确要求，**不要**创建说明文档、执行 git commit/push、修改 git 配置。
- 改动范围最小化：只改与任务直接相关的代码，不顺手重构无关模块。
- 优先复用项目已有抽象与约定，禁止凭空引入新架构或重复造轮子。

## 应当

- 改代码前先阅读项目既有实现，保持风格一致。
- 优先复用项目内已有组件、composables、工具函数与 API 封装。
- 任务完成后，视情况运行 lint / typecheck / test（与改动相关时）。
- **按需读取** skills，不要预加载全部；写代码前按任务类型加载对应 skill（见 `AGENTS.md` 技能索引）。

## 不应

- 为已自动导入的 API / 组件写冗余 import。
- 引入与项目技术栈不符的 UI 库或全新抽象层。
- 猜测不存在的 API 路径、响应结构或配置项；以项目代码与类型定义为准。
- 在用户未要求时添加测试、文档或无关注释。

## 编码前必读 skill

| 任务 | 技能 |
|------|------|
| 写/改 `.vue` | `code-vue` |
| 写/改样式 | `code-css` |
| 写/改 `.ts` / composable | `code-ts` |
| 项目约定、Gi 组件 | `project-guide` |
| CRUD 列表/表单 | `project-crud` |
| API / Mock | `project-api` |
| 提交代码 | `git-commit` |
