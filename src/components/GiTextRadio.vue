<template>
  <div class="gi-text-radio">
    <div
      class="item"
      :class="{ active: item.value === modelValue }"
      v-for="item in list"
      :key="item.value"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  // 绑定的值
  modelValue: {
    type: [Number, String],
    default: ''
  },
  // 数据列表
  list: {
    type: Array,
    default: () => []
  }
})

type Item = {
  label: string
  value: string | number
}
const handleClick = (item: Item) => {
  emit('update:modelValue', item.value)
  emit('change', item)
}
</script>

<style lang="scss" scoped>
.gi-text-radio {
  display: flex;
  > .item {
    height: 28px;
    padding: 0 14px;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    transition: all 0.15s;
    &:hover {
      color: var(--color-text-2);
      background: var(--color-secondary-hover);
    }
    &.active {
      color: #fff;
      background: rgba(var(--primary-6));
    }
  }
}
</style>
