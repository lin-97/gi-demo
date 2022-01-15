<template>
  <div class="option-item" :class="{ more: mode === 'more' }" @click="handleClick">
    <section class="wrap">
      <component :is="icon" size="16" :stroke-width="2" style="margin-right: 2px"></component>
      <slot
        ><span>{{ label }}</span></slot
      >
    </section>
    <IconRight v-if="mode === 'more'" />
  </div>
</template>

<script setup lang="ts">
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
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
  .wrap {
    display: flex;
    align-items: center;
  }
  &:hover {
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
  }
  &.more {
    justify-content: space-between;
  }
}
</style>
