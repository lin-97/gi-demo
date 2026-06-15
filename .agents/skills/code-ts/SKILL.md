---
name: code-ts
description: Vue 3 + TypeScript 命名、导入顺序、目录组织与 Lint 约定。编写或修改 .ts/.js 代码、新增 composable 或工具函数时加载本技能。
---

# TypeScript 规范（Vue 3）

Vue SFC 见 [code-vue](../code-vue/SKILL.md)，样式见 [code-css](../code-css/SKILL.md)。

## 命名

- 组件 / 文件名：**PascalCase**；变量 / 函数：**camelCase**（事件处理推荐 `handle` 前缀）。
- 常量：需要时 **UPPER_SNAKE_CASE**；Composables：`use` 前缀。
- Props camelCase；模板事件名与 emits 定义 **kebab-case**。
- 样式 class：**kebab-case** + BEM（见 [code-css](../code-css/SKILL.md)）；全局组件前缀遵循项目统一约定。

## TypeScript

- `import type` 与值导入分离；对象结构优先 `interface`，联合/工具类型用 `type`。
- Props 默认值：`withDefaults(defineProps<Type>(), { ... })`；避免 `any`。
- 公共类型集中管理；领域类型靠近业务模块。

## 导入顺序

1. 类型导入 → 2. 第三方 → 3. Vue/官方库 → 4. 项目内部（composables、组件、utils、样式）

不要重复 import 已自动注册的符号（类型除外）。

## 组织

- 遵循项目现有目录划分；单文件建议不超过 400 行，超出应拆分。
- 可复用 UI 放组件目录；跨页面逻辑抽 composables；纯函数抽 utils。
- 路径别名遵循项目配置，避免 `../../../` 穿越。

## Lint

- 遵循项目 ESLint、Stylelint、tsconfig，不擅自关闭规则。
- 必要的 `eslint-disable` / `@ts-expect-error` 须注释说明原因。
