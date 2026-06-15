# AGENTS.md

面向 AI 编码助手的项目指南。规范以 `.agents/` 为唯一来源。

## 常驻规则（Agent 行为准则）

> 源文件：`.agents/rules/agent.md`（修改后请同步本节）

- 始终使用**简体中文**与用户沟通。
- 未经用户明确要求，**不要**创建说明文档、执行 git commit/push、修改 git 配置。
- 改动范围最小化；优先复用项目已有抽象，禁止凭空引入新架构。
- 改代码前先阅读项目既有实现；任务完成后视情况运行 lint / typecheck。
- **按需读取** skills，不要预加载全部。

**编码前按任务加载 skill：**

| 任务 | 技能 |
|------|------|
| 写/改 `.vue` | `.agents/skills/code-vue/SKILL.md` |
| 写/改样式 | `.agents/skills/code-css/SKILL.md` |
| 写/改 `.ts` / composable | `.agents/skills/code-ts/SKILL.md` |
| 项目约定、Gi 组件 | `.agents/skills/project-guide/SKILL.md` |
| CRUD 列表/表单 | `.agents/skills/project-crud/SKILL.md` |
| API / Mock | `.agents/skills/project-api/SKILL.md` |
| 提交代码（git commit） | `.agents/skills/git-commit/SKILL.md` |

## 按需技能（`.agents/skills/`）

| 场景 | 文件 |
|------|------|
| TS 命名、导入、Lint | `code-ts/SKILL.md` |
| Vue SFC、Emits、Ref | `code-vue/SKILL.md` |
| 样式、BEM、Stylelint | `code-css/SKILL.md` |
| 项目总览、技术栈、Gi 约定 | `project-guide/SKILL.md` |
| CRUD 列表/表单 | `project-crud/SKILL.md` |
| API 与 Mock | `project-api/SKILL.md` |
| Git 提交 | `git-commit/SKILL.md` |

## 快速入口

```bash
pnpm dev          # 开发（Mock，/mock 前缀）
pnpm build        # 生产构建
pnpm typecheck    # vue-tsc
pnpm lint         # ESLint
pnpm lint:style   # Stylelint
```

- 路径别名：`@` → `src/`，`~` → 项目根目录
- 开发默认 Mock；联调真实后端见 `vite.config.ts` 与 `.env`
- 登录演示账号见 `README.md`（如 admin / 123456）
