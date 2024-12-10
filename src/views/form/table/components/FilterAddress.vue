<template>
  <a-popover v-model:popup-visible="popupVisible" trigger="click">
    <IconEdit class="icon-edit" :class="{ 'has-value': !!address }" @click="popupVisible = true" />
    <template #content>
      <a-space>
        <a-input v-model="address" style="width: 150px" placeholder="请输入地址" allow-clear />
        <a-button type="primary" @click="onConfirm">确定</a-button>
      </a-space>
    </template>
  </a-popover>
</template>

<script lang='ts' setup>
import { IconEdit } from '@arco-design/web-vue/es/icon'

const emit = defineEmits<{
  (e: 'confirm', value: string): void
}>()

const popupVisible = ref(false)
const address = ref('')

const onConfirm = () => {
  emit('confirm', address.value)
  popupVisible.value = false
}
</script>

<style lang='scss' scoped>
.icon-edit {
  cursor: pointer;

  &.has-value {
    color: rgba(var(--primary-6));
  }
}
</style>
