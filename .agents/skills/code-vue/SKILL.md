---
name: code-vue
description: Vue 3 Composition API、SFC 块顺序、defineEmits、useTemplateRef、响应式约定。编写或修改 .vue 文件时加载本技能。
---

# Vue 规范（Vue 3）

适用于 Composition API + `<script setup lang="ts">`。样式见 [code-css](../code-css/SKILL.md)。

## 基础

- 新组件一律 **Composition API** + `<script setup>`，禁止 Options API。
- 需要组件名时用 `defineOptions({ name: 'ComponentName' })`；路由页 `name` 与路由配置一致。
- 块顺序：`<template>` → `<script setup>` → `<style>`（遵循项目 ESLint block-order）。

## Script 内顺序

类型导入 → 第三方 → Vue API → 项目模块 → `defineOptions` → `defineModel` → `defineProps` + `withDefaults` → `defineEmits` → `defineSlots` → 常量/函数 → `ref`/`reactive` → `computed` → 方法 → 生命周期/`watch` → `defineExpose`

## 自动导入

已自动注册的 API / 组件不要重复 import；仅需类型时用 `import type`。以 `vite.config` 与现有代码为准。

## 模板

- 事件名、插槽名 **kebab-case**；组件 **PascalCase**。
- 受控表单优先 `v-model`；复杂逻辑抽到 `computed` 或方法，不要写在模板里。
- 子组件通过 props/emits 通信，避免随意访问父组件实例。

## defineEmits

使用**基于类型的函数调用签名**，禁止数组 / tuple 形式：

```typescript
// ✅
const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'change', value: string): void
}>()

// ❌ defineEmits<{ submit: [] }>() 或 tuple 形式
```

## 模板 Ref

优先 **`useTemplateRef`**（Vue 3.5+）；模板 `ref` 属性值与参数字符串一致。

```typescript
const formRef = useTemplateRef<FormInstance>('formRef')
// template: <form ref="formRef">
```

## 响应式

- 原始值 `ref`，对象 `reactive`，派生 `computed`。
- 解构 reactive 注意响应性丢失，必要时 `toRefs`。
- 深拷贝优先 `structuredClone` 或项目工具，禁止 `JSON.parse(JSON.stringify())`。

## defineExpose

仅暴露父组件确实需要调用的方法或属性（如弹窗 `open`/`close`/`reset`）。

## 禁止

- ❌ Options API、重复自动导入、defineEmits tuple 形式
- ❌ 无关 `ref()` 绑定模板 ref（优先 `useTemplateRef`）
- ❌ 模板中写复杂业务逻辑
