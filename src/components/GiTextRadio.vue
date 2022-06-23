<template>
  <a-space :size="10" class="gi-text-radio">
    <a-button
      v-for="item in list"
      :key="item.value"
      :type="item.value === modelValue ? 'primary' : 'text'"
      @click="handleClick(item)"
      >{{ item.label }}</a-button
    >
  </a-space>
</template>

<script setup lang="ts" name="GiTextRadio">
import type { PropType } from 'vue'
const emit = defineEmits(['update:modelValue', 'change'])

type Item = {
  label: string
  value: string | number
}

defineProps({
  // 绑定的值
  modelValue: {
    type: [Number, String],
    default: ''
  },
  // 数据列表
  list: {
    type: Array as PropType<Item[]>,
    default: () => []
  }
})

const handleClick = (item: Item) => {
  emit('update:modelValue', item.value)
  emit('change', item)
}
</script>

<style lang="scss" scoped>
.gi-text-radio {
  :deep(.arco-btn-text) {
    color: var(--color-text-2);
  }
}
</style>
