# Vue 规范（Vue 3）

适用于 Vue 3 + Composition API + `<script setup>` 的组件开发约定。

## 基础要求

- 新组件一律使用 **Composition API** + `<script setup lang="ts">`**，禁止 Options API。
- 需要组件名时（调试、keep-alive、路由缓存等）使用 `defineOptions({ name: 'ComponentName' })`。
- 路由级页面组件的 `name` 建议与路由配置保持一致。

## 组件块顺序

- `<template>` → `<script setup lang="ts">` → `<style>`（样式见 `.agents/rules/css.md`）。
- 遵循项目 ESLint/Vue block-order 规则。

## Script 内推荐顺序

1. 类型导入 `import type ...`
2. 第三方库 / UI 组件
3. Vue API（`ref`、`reactive`、`computed`、`watch` 等）
4. 项目内模块（composables、utils、components 等）
5. `defineOptions`（如有）
6. `defineModel`（如有）
7. `defineProps` + `withDefaults`
8. `defineEmits`（事件名 kebab-case）
9. `defineSlots`（如有）
10. 常量 / 工具函数 / composables 解构
11. 响应式数据 `ref` / `reactive`
12. `computed` 派生数据
13. 方法（推荐 `handle` 前缀，如 `handleSubmit`）
14. 生命周期 / 副作用（`onMounted`、`watch` 等）
15. `defineExpose` 放最后（如需要）

## 自动导入

若项目配置了 `unplugin-auto-import`、`unplugin-vue-components` 等，**遵循项目已有约定**：

- 已自动注册的 API / 组件不要重复手写 import。
- 仅需 **类型** 时使用 `import type`。
- 不确定是否自动导入时，以项目 `vite.config` 与现有代码为准。

## 模板约定

- 模板保持单根节点（或遵循 Vue 3.3+ 多根节点的项目约定）。
- 事件名、插槽名使用 **kebab-case**。
- 受控表单优先 `v-model`；修饰符与命名参数按 Vue 3 语法书写。
- 布尔 prop / 双向绑定使用显式写法（如 `:visible="visible"`、`v-model:visible="visible"`）。
- 复杂列表/表格渲染可使用 `lang="tsx"` 或 render 函数，按项目既有模式选用。

## 组件注册与引用

- 全局 / 局部组件在模板中使用 **PascalCase**（如 `<UserCard />`）。
- 不要手动 import 已由自动导入注册的组件（类型导入除外）。
- 子组件通过 props / emits 通信，避免随意访问父组件实例。

## defineEmits

- 使用**基于类型的函数调用签名**，禁止数组 / tuple 形式。
- 无参事件：`(e: 'event-name'): void`；有参事件将参数写在 `e` 之后。

```typescript
// ✅
const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'change', value: string): void
}>()

// ❌
const emit = defineEmits<{ submit: [] }>()
const emit = defineEmits<{ change: [value: string] }>()
```

## 模板 Ref

- 获取**子组件实例**或 **DOM 元素**时，优先使用 **`useTemplateRef`**（Vue 3.5+）；低版本可用 `ref` + 同名模板 ref，与项目约定保持一致。
- 模板上的 `ref` 属性值与 `useTemplateRef('...')` 参数字符串一致。

```vue
<script setup lang="ts">
import type { FormInstance } from './types'

const formRef = useTemplateRef<FormInstance>('formRef')

function submit() {
  formRef.value?.validate()
}
</script>

<template>
  <form ref="formRef" @submit.prevent="submit">
    <!-- ... -->
  </form>
</template>
```

## defineExpose

- 仅暴露父组件确实需要调用的方法或属性。
- 弹窗、表单等封装组件常用 `defineExpose({ open, close, reset })` 模式。

## 响应式

- 原始值用 `ref`，对象用 `reactive`；派生状态用 `computed`。
- 避免无必要的大对象 `reactive`；从 composable 返回时保持结构清晰。
- 解构 reactive 对象时注意响应性丢失，必要时用 `toRefs`。

## 禁止事项

- ❌ 使用 Options API 编写新组件
- ❌ 重复 import 已自动注册的 API / 组件（类型除外）
- ❌ 用无关的 `ref()` 命名绑定模板 ref 导致语义混乱（优先 `useTemplateRef`）
- ❌ `defineEmits` 使用数组 / tuple 形式
- ❌ 在模板中写复杂业务逻辑，应抽到 `computed` 或方法
- ❌ 使用 `JSON.parse(JSON.stringify())` 做深拷贝（优先 `structuredClone` 或项目提供的工具）

样式相关约定见 `.agents/rules/css.md`。
