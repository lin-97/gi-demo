---
name: project
description: 后台管理模板的项目总览与开发约定。涵盖 Vue 3 + Arco Design + Gi 组件库、目录结构、自动导入与全局类型。在当前仓库内开发、新增页面、查阅架构或不确定项目规范时使用。
---

# 项目开发指南

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3.5 + TypeScript + `<script setup>` |
| 构建 | Vite 7 |
| UI | Arco Design Vue（按需导入） |
| 状态 | Pinia + pinia-plugin-persistedstate |
| 路由 | Vue Router 4（Hash 模式） |
| 工具 | @vueuse/core、lodash-es、dayjs、xe-utils |
| 图表/编辑器 | ECharts、wangEditor、CodeMirror 等 |

## 路径别名

- `@` → `src/`
- `~` → 项目根目录

## 自动导入（无需手写 import）

- **Vue API**：`ref`、`reactive`、`computed`、`watch`、`useTemplateRef` 等（见 `vite.config.ts` → `unplugin-auto-import`）
- **Gi 组件**：`src/components/Gi*` 目录下组件自动注册（如 `GiPageLayout`、`GiButton`、`GiForm`）
- **Arco 组件**：`a-table`、`a-modal` 等按需自动导入
- **图标**：`icon-*` 来自 Iconify `icon-park-outline` 集合

手动导入场景：需要 **类型** 时从 `@/components/index`、`@/apis/...` 引入。

## 目录约定

```
src/
├── apis/          # 接口（按业务模块分文件，配合 getBaseApi）
├── components/    # Gi* 业务组件 + 部分通用组件
├── hooks/         # 组合式函数（useTable、useDict 等）
├── hooks/app/     # 业务域 hooks（useDept、useRole）
├── stores/        # Pinia
├── views/         # 页面（按模块分子目录）
├── router/        # 路由与守卫
├── utils/         # http、auth、regexp 等
├── types/         # 全局类型（global.d.ts、api.d.ts）
mock/              # vite-plugin-mock 模拟数据
```

## 全局类型（`src/types/`）

- `Status`：`'0' | '1'`（禁用/启用，与字典 `STATUS` 一致）
- `Gender`：`'1' | '2' | '3'`
- `Pagination`：`{ page, size }`
- `ApiRes<T>`、`PageRes<T>`：统一接口响应格式

## 页面命名

每个页面组件使用 `defineOptions({ name: 'XxxYyy' })`，名称与路由/模块对应，如 `SystemUser`、`SystemDict`。

## 常用样式类

- `g-row-tool`：列表页工具栏行（左右分布）
- `g-table`：表格容器
- `g-full-column`：左侧树等区域纵向撑满
- `g-mb`：下边距

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

## 开发命令

```bash
pnpm dev          # 开发（Mock 已启用）
pnpm build        # 构建
pnpm typecheck    # 类型检查
pnpm lint         # ESLint
pnpm lint:style   # Stylelint
```

## 注意事项

- 优先复用现有 `Gi*` 组件与 `hooks`，勿重复造轮子
- 列表页表格列复杂时用 `lang="tsx"` + `TableColumnData[]` 的 `render`
- 状态字段与字典编码保持一致（如 `status` 用 `useDict(['STATUS'])`）
- 不要擅自新增说明性 md 文档，除非用户明确要求
