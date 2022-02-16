<template>
  <div class="option-item" :class="{ more: mode === 'more', active: active }" @click="handleClick">
    <section class="wrap">
      <GiSvgIcon :name="icon" style="margin-right: 4px"></GiSvgIcon>
      <slot
        ><span>{{ label }}</span></slot
      >
    </section>
    <IconRight v-if="mode === 'more'" />
  </div>
</template>

<script setup lang="ts">
import GiSvgIcon from '@/components/GiSvgIcon.vue'
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
  mode: {
    type: String,
    default: ''
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
.option-item {
  padding: 0 5px 0 8px;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  .wrap {
    display: flex;
    align-items: center;
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
