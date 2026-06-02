# AGENTS.md

面向 AI 编码助手的项目指南。本项目是基于 Vue 3 + Vite + TypeScript + Arco Design Vue 的中后台管理模板，开发时优先复用现有 `Gi*` 组件与 `hooks`，保持与参考页面一致的风格。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3.5 + TypeScript + `<script setup>` |
| 构建 | Vite 7 |
| UI | Arco Design Vue（按需自动导入） |
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

## 编码约定

### Vue 页面

- 使用 **Composition API** + `<script setup lang="ts">`；表格列复杂时用 `lang="tsx"`。
- 每个页面组件设置：`defineOptions({ name: 'ModuleFeature' })`（如 `SystemUser`）。
- 列表页常用样式类：`g-row-tool`、`g-table`、`g-full-column`、`g-mb`。

### 标准 CRUD 列表页

1. 布局：`GiPageLayout`（可选 `#left` 树/分类）。
2. 数据：`useTable({ listAPI, deleteAPI, immediate, rowKey })`。
3. 工具栏/操作列：`GiButton`（`add` | `edit` | `delete` | `search` | `reset` 等）。
4. 表格：`a-table`，`row-key="id"`，列用 `TableColumnData[]` + TSX `render`。
5. 状态展示：`GiCellStatus` / `GiCellGender` 等；字典用 `useDict(['STATUS'] as const)`。
6. 表单弹窗：子组件 `GiForm` + `defineExpose({ add, edit })`，保存后 `emit('save-success')` 并 `search()`。

### API 层

- 每模块一个文件，如 `src/apis/system/user.ts`。
- 标准 CRUD：`export const baseAPI = getBaseApi<ListItem>({ baseUrl: '/system/user' })`。
- 路径约定：`getList` | `getDetail` | `add` | `update` | `delete`（见 `src/apis/base.ts`）。
- 非标准接口用 `http.get/post` 单独声明。
- 请求封装：`src/utils/http.ts`，`baseURL` = `VITE_API_PREFIX`；Token 头字段 `token`；`success === false` 会提示并 reject；401 跳转登录。

### Mock

- 开发环境 `VITE_API_PREFIX = '/mock'`（`.env.development`）。
- 新模块：`mock/{module}/{name}.ts` 使用 `defineMock` + `getBaseApi`，列表返回 `{ total, records }`。
- 静态数据放 `mock/_data/`；URL 与前端 `baseUrl` 保持一致。

### 状态与字典

- 业务状态字段与字典编码对齐（如 `status` 配 `STATUS`）。
- 空字符串查询条件传 API 前建议转为 `undefined`。

## 参考实现（改代码前先读）

| 场景 | 路径 |
|------|------|
| 标准 CRUD + 左树 | `src/views/system/user/index.vue` |
| 左右分栏 + 字典 | `src/views/system/dict/index.vue` |
| a-table + 列设置 | `src/views/table/custom3/index.vue` |
| 表单弹窗 | `src/views/system/user/UserFormModal.vue` |
| API + baseAPI | `src/apis/system/user.ts` |
| Mock CRUD | `mock/system/user.ts` |

## 深入文档（按需阅读）

仓库内 Cursor 技能（比本文更细）：

| 场景 | 文件 |
|------|------|
| 项目总览 | `.cursor/skills/project/SKILL.md` |
| CRUD 列表/表单 | `.cursor/skills/crud-page/SKILL.md` |
| API 与 Mock | `.cursor/skills/api-mock/SKILL.md` |

## Agent 行为准则

**应当：**

- 改动范围最小化，只改与任务相关的文件。
- 优先复用 `Gi*`、`hooks`、`getBaseApi`、现有 mock 工具，不重复造轮子。
- 新增页面/接口时对齐参考页与 `getBaseApi` 路径约定。
- 改完后在合适时运行 `pnpm typecheck` / `pnpm lint`（若任务涉及类型或规范）。

**不应：**

- 擅自新增说明性 Markdown 文档（除非用户明确要求）。
- 为已自动导入的 API/组件写冗余 import。
- 引入与项目风格不符的 UI 库或全新抽象层。
- 猜测不存在的 API 路径或响应结构；以 `src/apis`、`mock` 与类型定义为准。
- 在未要求时执行 `git commit`、推远程或修改 git 配置。

## 环境与联调

- 开发默认走 **Mock**（`/mock`），无需后端即可联调列表/表单。
- 对接真实后端时调整 `VITE_API_PREFIX` / `VITE_API_BASE_URL`，`vite.config.ts` 中 `/api` 代理指向 `VITE_API_BASE_URL`。
- 登录演示账号见 `README.md`（如 admin / 123456）。

## 组件命名说明

**Gi** 前缀表示全局业务组件（GiTable、GiForm、GiPageLayout 等），与 Arco 的 `a-*` 组件配合使用；扩展能力前先搜索 `src/components/Gi*` 是否已有实现。
