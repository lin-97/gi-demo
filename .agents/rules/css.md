# CSS 规范（Vue 3）

适用于 Vue 3 单文件组件（SFC）的样式编写约定。

## SFC 样式块

- 样式块位于 `<script>` 之后：`<style lang="scss|less|css" scoped?>`。
- 遵循项目的 ESLint/Vue block-order 规则（通常为 template → script → style）。
- 默认使用 **scoped**，避免污染全局；需要全局样式时须在注释中说明原因。
- 预处理器（SCSS/LESS）与纯 CSS 按项目既有约定选用，同一组件内保持一致。

## 命名约定

- 自定义 class 使用 **kebab-case**。
- 组件内自定义 class 推荐 **BEM**（Block Element Modifier）。
- 第三方 UI 库自带类名、项目全局工具类不在 BEM 约束范围内；仅约束本组件新增的 class。

## BEM 结构

| 类型 | 格式 | 示例 |
|------|------|------|
| Block（块） | `block` | `user-card`、`search-form` |
| Element（元素） | `block__element` | `user-card__avatar`、`search-form__input` |
| Modifier（修饰符） | `block--modifier` 或 `block__element--modifier` | `user-card--compact`、`search-form__btn--disabled` |

约定：

- **Block** 对应当前组件语义，一个 SFC 通常只设一个 Block。
- **Element** 用双下划线 `__` 连接 Block；多级语义用 `-` 连接，**禁止** `block__a__b` 链式元素写法。
- **Modifier** 用双连字符 `--` 表示状态或变体（如 `--active`、`--disabled`、`--compact`）。
- 在 `<style scoped>` 中优先用预处理器嵌套表达 BEM（`&__element`、`&--modifier`）。

```vue
<template>
  <div class="user-card">
    <img class="user-card__avatar" :src="avatar" alt="">
    <div class="user-card__body">
      <h3 class="user-card__name">{{ name }}</h3>
      <span class="user-card__badge user-card__badge--vip">VIP</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  display: flex;
  gap: 12px;

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  &__name {
    margin: 0;
    font-size: 16px;
  }

  &__badge {
    font-size: 12px;

    &--vip {
      color: var(--color-warning, #faad14);
    }
  }
}
</style>
```

## 编写原则

- 颜色、间距、字号优先复用项目 CSS 变量或设计令牌，避免魔法数字。
- 动画与过渡可复用的，抽到公共样式；组件内只写与布局/状态相关的差异。
- 避免内联 `style`；动态样式（如宽高、坐标）等场景除外。
- 尽量避免 `!important`；确需覆盖第三方样式时注明原因。

## Stylelint

- 遵循项目已配置的 Stylelint 规则（如 standard、scss、recommended-vue、recess-order 等）。
- 属性顺序以 Stylelint 输出为准；class 命名推荐 BEM/kebab-case。
- 样式改动后按项目脚本执行 lint（如 `lint:style`）。

## 禁止事项

- ❌ 自定义 class 使用 camelCase 或非语义命名（如 `.headerTitle`、`.activeBtn`）
- ❌ BEM 元素链式嵌套（如 `block__a__b`，应扁平为 `block__a-b`）
- ❌ 滥用 `!important` 覆盖样式
- ❌ 在组件内写大段内联 `style`（特殊动态样式除外）
- ❌ 在 scoped 样式中依赖未声明的深度选择器穿透（`:deep()` 等）堆叠过多层级
