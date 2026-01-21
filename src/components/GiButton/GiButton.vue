<template>
  <a-button v-bind="buttonProps" @click="emit('click')">
    <template v-if="BUTTON_MAP[props.type].icon" #icon>
      <component :is="BUTTON_MAP[props.type].icon"></component>
    </template>
    <template #default>
      <slot>{{ BUTTON_MAP[props.type].text }}</slot>
    </template>
  </a-button>
</template>

<script setup lang='ts'>
import type { ButtonProps as AButtonProps } from '@arco-design/web-vue'
import type { ButtonProps as Props } from './type'
import { IconDelete, IconEdit, IconExport, IconImport, IconPlus, IconSearch, IconUpload } from '@arco-design/web-vue/es/icon'

const props = withDefaults(defineProps<Props>(), {
  type: ''
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const BUTTON_MAP: Record<string, { icon: any, text: string, status?: AButtonProps['status'], type?: AButtonProps['type'] }> = {
  add: { icon: IconPlus, text: '新增' },
  edit: { icon: IconEdit, text: '编辑' },
  delete: { icon: IconDelete, text: '删除', status: 'danger' },
  search: { icon: IconSearch, text: '搜索' },
  reset: { icon: undefined, text: '重置', type: 'secondary' },
  upload: { icon: IconUpload, text: '上传', type: 'secondary' },
  import: { icon: IconImport, text: '导入', type: 'secondary' },
  export: { icon: IconExport, text: '导出', type: 'secondary' }
}

const buttonProps = computed(() => {
  const type = ['primary', 'secondary', 'outline', 'dashed', 'text', undefined].includes(props.type) ? props.type : BUTTON_MAP[props.type].type || 'primary'
  return {
    ...props,
    type: type as AButtonProps['type'],
    status: BUTTON_MAP[props.type].status || 'normal'
  }
})
</script>

<style lang='scss' scoped></style>
