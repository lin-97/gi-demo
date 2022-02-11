<template>
  <a-space :size="15" class="gi-text-radio">
    <a-button
      :type="item.value === modelValue ? 'primary' : 'text'"
      v-for="item in list"
      :key="item.value"
      @click="handleClick(item)"
      >{{ item.label }}</a-button
    >
  </a-space>
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
  :deep(.arco-btn-text) {
    color: var(--color-text-2);
  }
}
</style>
