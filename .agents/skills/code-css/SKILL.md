---
name: code-css
description: Vue SFC 样式块、BEM 命名、Stylelint 与 scoped 约定。编写或修改组件样式（.vue style、scss、less、css）时加载本技能。
---

# CSS 规范（Vue 3）

## SFC 样式块

- 位于 `<script>` 之后；默认 **scoped**；全局样式须在注释中说明原因。
- 预处理器按项目约定，同一组件内保持一致。

## 命名（BEM）

- 自定义 class：**kebab-case** + **BEM**（`block`、`block__element`、`block--modifier`）。
- 一个 SFC 通常一个 Block；元素用 `__`，修饰符用 `--`；**禁止** `block__a__b` 链式元素。
- 第三方 UI 类名、全局工具类不在 BEM 约束内。

```scss
.user-card {
  &__avatar { width: 48px; }
  &__badge--vip { color: var(--color-warning); }
}
```

## 编写原则

- 颜色、间距、字号优先复用项目 CSS 变量或设计令牌。
- 避免内联 `style`（动态样式除外）和滥用 `!important`。
- 遵循项目 Stylelint；改动后视情况运行 `lint:style`。

## 禁止

- ❌ 自定义 class 用 camelCase 或非语义命名
- ❌ BEM 元素链式嵌套（`block__a__b`）
- ❌ 大段内联 style 或过多 `:deep()` 堆叠
