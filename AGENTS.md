# AGENTS.md

面向 AI 编码助手的项目指南。规范以 `.agents/` 为唯一来源；Cursor / OpenCode / Codex 等工具通过各自适配层读取。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3.5 + TypeScript + `<script setup>` |
| 构建 | Vite 7 |
| UI | Arco Design Vue（按需自动导入）+ `Gi*` 组件 |
| 状态 | Pinia + pinia-plugin-persistedstate |
| 路由 | Vue Router 4（Hash 模式） |
| 工具 | @vueuse/core、lodash-es、dayjs、xe-utils |
| Mock | vite-plugin-mock + mockjs（开发默认启用） |

## 常用命令

```bash
pnpm dev          # 开发（Mock，/mock 前缀）
pnpm build        # 生产构建
pnpm typecheck    # vue-tsc 类型检查
pnpm lint         # ESLint
pnpm lint:fix     # ESLint 自动修复
pnpm lint:style   # Stylelint（vue/scss/css）
```

包管理器以仓库实际为准（`package-lock.json` 存在时也可用 `npm`）。

## 路径别名

- `@` → `src/`
- `~` → 项目根目录

## 目录结构

```
src/
├── apis/          # 接口（按业务模块；标准 CRUD 用 getBaseApi）
├── components/    # Gi* 业务组件（自动注册）
├── hooks/         # useTable、useDict、usePagination 等
├── hooks/app/     # 业务域 hooks（如 useDept、useRole）
├── stores/        # Pinia
├── views/         # 页面（按模块分子目录）
├── router/        # 路由与守卫
├── utils/         # http、auth、regexp 等
├── types/         # global.d.ts、api.d.ts
mock/              # vite-plugin-mock
├── _data/         # 静态模拟数据
├── _base.ts       # defineMock
├── _utils.ts      # resultSuccess、getBaseApi 等
└── system/        # 按模块的 mock 路由
```

## 自动导入（勿重复 import）

由 `vite.config.ts` 配置，以下内容**无需手写 import**：

- **Vue API**：`ref`、`reactive`、`computed`、`watch`、`useTemplateRef` 等
- **Gi 组件**：`src/components/Gi*` 下组件（如 `GiPageLayout`、`GiButton`、`GiForm`）
- **Arco 组件**：`a-table`、`a-modal`、`a-select` 等
- **图标**：`icon-*`（Iconify `icon-park-outline`）

需要**类型**时再从 `@/components/index`、`@/apis/...` 显式引入。

## 全局类型（`src/types/`）

- `Status`：`'0' | '1'`（禁用/启用，与字典 `STATUS` 一致）
- `Gender`：`'1' | '2' | '3'`
- `Pagination`：`{ page, size }`
- `ApiRes<T>`、`PageRes<T>`：统一接口响应（见 `api.d.ts`）

## 规范文档（`.agents/rules/`）

| 文件 | 内容 |
|------|------|
| `.agents/rules/agent-behavior.md` | AI Agent 通用行为准则 |
| `.agents/rules/coding-standards.md` | Vue 3 + TS 通用命名、类型、Lint 约定 |
| `.agents/rules/vue.md` | Vue 3 通用 SFC、Emits、Ref、Composition API 约定 |
| `.agents/rules/css.md` | Vue 3 通用 CSS/BEM/Stylelint 约定 |

## 参考实现（改代码前先读）

| 场景 | 路径 |
|------|------|
| 标准 CRUD + 左树 | `src/views/system/user/index.vue` |
| 左右分栏 + 字典 | `src/views/system/dict/index.vue` |
| a-table + 列设置 | `src/views/table/custom3/index.vue` |
| 表单弹窗 | `src/views/system/user/UserFormModal.vue` |
| API + baseAPI | `src/apis/system/user.ts` |
| Mock CRUD | `mock/system/user.ts` |

## 技能文档（按需阅读，勿预加载）

| 场景 | 文件 |
|------|------|
| 项目总览 | `.agents/skills/project/SKILL.md` |
| CRUD 列表/表单 | `.agents/skills/crud-page/SKILL.md` |
| API 与 Mock | `.agents/skills/api-mock/SKILL.md` |

## 环境与联调

- 开发默认走 **Mock**（`/mock`），无需后端即可联调列表/表单。
- 对接真实后端时调整 `VITE_API_PREFIX` / `VITE_API_BASE_URL`，`vite.config.ts` 中 `/api` 代理指向 `VITE_API_BASE_URL`。
- 登录演示账号见 `README.md`（如 admin / 123456）。

## 组件命名说明

**Gi** 前缀表示全局业务组件（GiTable、GiForm、GiPageLayout 等），与 Arco 的 `a-*` 组件配合使用；扩展能力前先搜索 `src/components/Gi*` 是否已有实现。
