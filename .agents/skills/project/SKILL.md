---
name: project
description: 后台管理模板的项目总览与前端强制规范。涵盖 Vue 3 + Arco Design + Gi 组件库、目录结构、自动导入、CRUD/API 约定与代码风格。在当前仓库内开发、新增页面、查阅架构或不确定项目规范时使用。
---

# 项目开发指南

> **适用范围**：本仓库 `src/**`、`mock/**`  
> **规范来源**：`.agents/rules/`（常驻）与本 skill（任务细节）

## 通用要求

详见 `.agents/rules/agent-behavior.md`；本项目补充见下文「本项目 Agent 约定」。

## 本项目 Agent 约定

- 与用户沟通使用**简体中文**。
- 优先复用 `Gi*`、`hooks`、`getBaseApi`、现有 mock 工具；新增页面/接口对齐参考页与 `getBaseApi` 约定。
- API / Mock 以 `src/apis`、`mock` 与类型定义为准，不要猜测路径。
- 涉及 CRUD、API、Mock 时按需读取 `.agents/skills/` 对应 skill。
- 改动后视情况运行 `pnpm typecheck`、`pnpm lint`、`pnpm lint:style`。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3.5 + TypeScript + `<script setup lang="ts">` |
| 构建 | Vite 7 |
| UI | Arco Design Vue（按需自动导入）+ 本地 `Gi*` 组件 |
| 状态 | Pinia + pinia-plugin-persistedstate |
| 路由 | Vue Router 4（Hash 模式） |
| HTTP | `@/utils/http`，统一响应类型 `ApiRes<T>`、`PageRes<T>` |
| 工具 | @vueuse/core、lodash-es、dayjs、xe-utils |
| Mock | vite-plugin-mock + mockjs（开发默认启用） |

每个 SFC 必须 `defineOptions({ name: 'XxxYyy' })`；通用 Vue 规范见 `.agents/rules/vue.md`，本项目约定见下文「本项目 Vue 约定」。

## 路径别名

- `@` → `src/`
- `~` → 项目根目录

## 目录约定

```
src/
├── apis/          # 接口（按业务模块分文件，标准 CRUD 用 getBaseApi）
├── components/    # Gi* 业务组件 + 部分通用组件
├── hooks/         # 组合式函数（useTable、useDict 等）
├── hooks/app/     # 业务域 hooks（useDept、useRole）
├── stores/        # Pinia
├── views/         # 页面（按模块分子目录）
├── router/        # 路由与守卫
├── utils/         # http、auth、regexp、deepClone 等
├── types/         # 全局类型（global.d.ts、api.d.ts）
mock/              # vite-plugin-mock 模拟数据
```

页面文件命名：

```
src/views/{module}/index.vue           # 列表页
src/views/{module}/XxxFormModal.vue    # 新增/编辑弹窗（有表单时必建）
src/apis/{module}/{name}.ts            # 类型定义 + CRUD API（或 apis/system/user.ts）
mock/{module}/{name}.ts                # 与 API 路径一致的 Mock
```

## 全局类型（`src/types/`）

- `Status`：`'0' | '1'`（禁用/启用，与字典 `STATUS` 一致）
- `Gender`：`'1' | '2' | '3'`
- `Pagination`：`{ page, size }`
- `ApiRes<T>`、`PageRes<T>`：统一接口响应（分页 `data` 为 `{ records, total }`）

## CRUD 列表页（强制遵循）

新建/修改表格页时，**必须**参考并遵循：

- 参考实现：`src/views/system/user/index.vue`、`UserFormModal.vue`
- Hook：`@/hooks/useTable`
- API 模板：`src/apis/system/user.ts` + `getBaseApi`
- 详细步骤：读取并遵循 [crud-page](../crud-page/SKILL.md)

核心结构：

1. `GiPageLayout` 布局（可选 `#left` 树/分类）
2. `queryParams`（reactive）+ 搜索区 + `GiButton`（search/reset）
3. `tableColumns`（`TableColumnData[]`，复杂列用 `lang="tsx"` + `render`）
4. `useTable` 绑定 `listAPI` 与 `deleteAPI`
5. `XxxFormModal` ref，`defineExpose({ add, edit })`，`@save-success="search"`

分页类型：`PageRes<T>`（`records` + `total`）。Mock 与接口详见 [api-mock](../api-mock/SKILL.md)。

## API 层模板

```typescript
import { getBaseApi } from '@/apis/base'
import http from '@/utils/http'

export interface ListItem {
  id: string
  name: string
  status: Status
}

/** 标准 CRUD */
export const baseAPI = getBaseApi<ListItem>({ baseUrl: '/system/xxx' })

/** 非标准接口 */
export function customAction(params: Pagination) {
  return http.get<PageRes<Item[]>>('/system/xxx/customAction', params)
}
```

- 开发环境 `VITE_API_PREFIX = '/mock'`（`.env.development`）
- 禁止绕过 `@/utils/http` 裸用 axios

## 代码风格

- 遵循 `@antfu/eslint-config`（`eslint.config.js`）：箭头参数括号、1TBS、无尾随逗号；Vue block 顺序 `[['script', 'template'], 'style']`；宏顺序 `defineOptions/defineModel/defineProps/defineEmits/defineSlots`，`defineExpose` 最后。
- 布局放 `src/layout/`，Gi 组件放 `src/components/Gi*`，业务 Hook 放 `hooks/` 或 `hooks/app/`。
- 空字符串查询条件传 API 前建议转为 `undefined`。
- 通用规范见 `.agents/rules/coding-standards.md`、`vue.md`、`css.md`；本项目补充见下文。

## 本项目编码约定

- 路径别名：`@` → `src/`，`~` → 项目根；禁止 `../../../` 穿越。
- 组件全局前缀 **`Gi`** 仅用于 `src/components/Gi*` 全局组件。
- 目录：`src/views` 页面、`src/components` 组件、`src/apis/<domain>/` + `type.ts` 接口类型、`src/types` 公共类型、`src/hooks` composables。
- API 统一 `@/utils/http`；状态 Pinia + `pinia-plugin-persistedstate`。
- 图标 `@iconify/vue`；样式从 scss/less 导入，避免内联。
- 业务注释中文，标识符英文。
- 检查：`pnpm lint`、`pnpm lint:style`、`pnpm typecheck`。

## 本项目 Vue 约定

- 每个 SFC 必须 `defineOptions({ name: 'XxxYyy' })`，名称与路由/模块对应，并与路由表 `name` 一致以支持缓存。
- **自动导入**（`vite.config.ts`，勿重复 import）：
  - Vue API：`ref`、`reactive`、`computed`、`watch`、`useTemplateRef` 等
  - Gi 组件：`src/components/Gi*`（如 `GiPageLayout`、`GiButton`、`GiForm`）
  - Arco 组件：`a-table`、`a-modal`、`a-select` 等
  - 图标：`icon-*`（Iconify `icon-park-outline`）
- Gi 组件模板用 **PascalCase**；Arco 用 `a-*` 前缀；禁止手动 import Gi/Arco（类型除外）。
- 表格列复杂时用 `lang="tsx"` + `TableColumnData[]` 的 `render`；字典字段用 `useDict(['STATUS'])` 等。
- `dayjs` 默认导入变量名必须为 **`Dayjs`**（大写），禁止小写 `dayjs`。
- 深拷贝使用 `@/utils` 的 `deepClone`，禁止 `JSON.parse(JSON.stringify())`。
- Vue 参考页：`src/views/system/user/index.vue`、`UserFormModal.vue`、`src/views/table/custom3/index.vue`

## 本项目样式

- 全局样式：`src/styles/index.scss`（变量 `var.scss`、混入 `mixin.scss`、Arco 主题 `arco-ui/`）
- Stylelint：`pnpm lint:style`
- 列表页常用工具类：`g-row-tool`（工具栏行）、`g-table`（表格）、`g-full-column`（左栏撑满）、`g-mb`（下边距）
- BEM 示例：`src/views/login/LoginLeft.vue`

## 子技能（按需阅读）

| 场景 | 技能 |
|------|------|
| 新建 CRUD 列表页、表格、弹窗表单 | [crud-page](../crud-page/SKILL.md) |
| 新增接口、Mock、baseAPI | [api-mock](../api-mock/SKILL.md) |

## 参考页面

- 标准 CRUD + 左树：`src/views/system/user/index.vue`
- 左右分栏 + 字典：`src/views/system/dict/index.vue`
- GiTableSetting + a-table：`src/views/table/custom3/index.vue`
- 表单弹窗：`src/views/system/user/UserFormModal.vue`

通用 Agent / 编码规范见 `.agents/rules/`；本项目参考页见上文。

## 开发命令

```bash
pnpm dev          # 开发（Mock 已启用）
pnpm build        # 构建
pnpm typecheck    # 类型检查
pnpm lint         # ESLint
pnpm lint:style   # Stylelint
```

## 禁止事项

- ❌ 绕过 `@/utils/http` 直接裸用 axios
- ❌ 表格页自行实现分页/删除逻辑，而不使用 `useTable`
- ❌ 新建列表页不参考 `system/user` 与 [crud-page](../crud-page/SKILL.md) 约定
