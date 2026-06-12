# 编码规范（Vue 3 + TypeScript）

适用于 Vue 3 + TypeScript 前端项目的通用编码约定。Vue SFC 细节见 `vue.md`，样式见 `css.md`。

## 基础规范

- 路径别名、目录结构遵循**项目既有配置**（如 `tsconfig`、`vite.config`）；避免 `../../../` 式相对路径穿越。
- `.vue` 文件与模板中的组件使用 **PascalCase**（`UserCard.vue` / `<UserCard />`）。
- 样式 class 推荐 **kebab-case**；组件内自定义 class 推荐 BEM（见 `css.md`）。
- 单文件建议不超过 400 行，超出应拆分组件或模块。
- 注释语言、标识符语言遵循项目约定；代码标识符使用英文，含义清晰。

## 命名规范

- **组件名**：PascalCase。
- **变量 / 函数**：camelCase；事件处理函数推荐 `handle` 前缀（如 `handleSubmit`）。
- **常量**：需要时使用 UPPER_SNAKE_CASE。
- **Props / Emits**：props 用 camelCase；模板事件名与 emits 定义用 kebab-case。
- **Composables**：推荐 `use` 前缀（如 `useUserList`）。
- **全局组件前缀**（如有）：遵循项目统一前缀，不要自创多套命名。

## TypeScript 规范

- `import type` 与值导入分离。
- 对象结构优先 `interface`；联合类型、工具类型用 `type`。
- 组件 props 默认值使用 `withDefaults(defineProps<Type>(), { ... })`。
- 避免 `any`；确实需要时使用显式类型或窄化。
- Composables、工具函数适当使用泛型提升类型安全。
- 公共类型集中管理；领域类型靠近业务模块，按项目目录约定放置。

## Vue 相关（摘要）

以下细则见 `vue.md`，此处不重复：

- Composition API + `<script setup>`
- `defineOptions` / `defineProps` / `defineEmits` / `defineExpose`
- 模板 ref、`v-model`、事件与插槽命名

## 导入与排序

推荐分组（同组内按字母序）：

1. 类型导入
2. 第三方库
3. Vue / 官方库
4. 项目内部（composables、组件、utils、样式、资源）

- 不要重复 import 已由自动导入注册的符号（类型除外）。
- 静态资源、样式按项目约定引入，避免大段内联样式。

## 目录与组织

- 遵循项目现有目录划分（如 `components`、`views`、`composables`、`stores` 等）。
- 可复用 UI 放组件目录；页面级逻辑放 views 或路由对应模块。
- 跨页面逻辑抽到 composables；纯函数抽到 utils。
- 常量、枚举集中管理，避免魔法字符串散落。

## 代码质量与 Lint

- 遵循项目 **ESLint**、**Stylelint**、**tsconfig** 配置，不擅自关闭规则。
- 必要的 `eslint-disable` / `@ts-expect-error` 须注释说明原因。
- Vue 相关 lint（block 顺序、宏顺序、事件命名等）以项目 ESLint 配置为准。

## 最佳实践

- **组件封装**：优先复用项目 UI 库与已有封装；透传 props / attrs 时保持 API 一致。
- **类型安全**：接口、props、emits、composables 返回值均提供类型。
- **响应式**：原始值用 `ref`，对象用 `reactive`，派生用 `computed`（详见 `vue.md`）。
- **性能**：模板避免复杂计算；大列表考虑分页、虚拟滚动或拆分；按需加载路由与组件。
- **代码复用**：重复逻辑下沉 composable 或 utils，不要复制粘贴。

## 提交流程与检查

- 包管理器与锁文件以仓库为准；变更依赖时同步更新 lockfile。
- 提交前按项目脚本执行检查（如 `lint`、`typecheck`、`test`、`build`）。
- 新文件默认带类型；避免无类型的 `any` 扩散。
