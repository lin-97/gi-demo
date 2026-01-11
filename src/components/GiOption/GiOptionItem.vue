<!--
  @file GiOptionItem 组件 - 选项列表项
  @description 提供统一的选项列表项样式，支持图标和更多操作
-->
<template>
  <li class="gi-option-item" :class="{ 'gi-option-item--more': props.more, 'gi-option-item--active': props.active }"
    @click="handleClick">
    <div class="gi-option-item__wrapper">
      <span class="gi-option-item__icon">
        <slot name="icon">
          <GiSvgIcon :name="props.icon" />
        </slot>
      </span>
      <slot>
        <span class="gi-option-item__label">{{ props.label }}</span>
      </slot>
    </div>
    <IconRight v-if="props.more" />
  </li>
</template>

<script setup lang="ts">
import type { OptionItemProps as Props } from './type'

defineOptions({ name: 'GiOptionItem' })

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  label: '',
  more: false,
  active: false
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

/** 处理点击事件 */
const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.gi-option-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 5px 0 10px;
  font-size: 14px;
  line-height: 34px;
  color: var(--color-text-2);
  cursor: pointer;
  user-select: none;

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }

  &--active,
  &:hover {
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
  }

  &--more {
    justify-content: space-between;
  }
}
</style>
