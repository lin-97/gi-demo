<template>
  <li class="gi-option-item" :class="{ more: more, active: active }" @click="handleClick">
    <section class="wrap">
      <span class="icon-wrapper">
        <slot name="icon">
          <component :is="icon" :size="16" :stroke-width="2"></component>
        </slot>
      </span>
      <slot
        ><span>{{ label }}</span></slot
      >
    </section>
    <IconRight v-if="more" />
  </li>
</template>

<script setup lang="ts" name="GiOptionItem">
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  // more
  more: {
    type: Boolean,
    default: false
  },
  // 选中高亮
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.gi-option-item {
  padding: 0 5px 0 10px;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  color: var(--color-text-2);
  font-size: 14px;
  .wrap {
    display: flex;
    align-items: center;
    .icon-wrapper {
      margin-right: 4px;
      display: flex;
      align-items: center;
    }
  }
  &.active,
  &:hover {
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
  }
  &.more {
    justify-content: space-between;
  }
}
</style>
