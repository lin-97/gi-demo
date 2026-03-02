<template>
  <a-button v-bind="buttonProps" @click="emit('click')">
    <template v-if="buttonConfig?.icon" #icon>
      <component :is="buttonConfig.icon" />
    </template>
    <template #default>
      <slot>{{ buttonConfig?.text }}</slot>
    </template>
  </a-button>
</template>

<script setup lang="ts">
import type { ButtonProps as AButtonProps } from '@arco-design/web-vue'
import type { Component } from 'vue'
import type { ButtonProps as Props } from './type'
import { IconDelete, IconDownload, IconEdit, IconImport, IconPlus, IconSearch, IconUpload } from '@arco-design/web-vue/es/icon'
import { computed } from 'vue'

defineOptions({
  name: 'GiButton'
})

const props = withDefaults(defineProps<Props>(), {
  type: ''
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

/** 按钮配置类型 */
interface ButtonConfig {
  icon?: Component
  text: string
  status?: AButtonProps['status']
  type?: AButtonProps['type']
}

/** 按钮类型映射表 */
const BUTTON_MAP: Record<string, ButtonConfig> = {
  add: { icon: IconPlus, text: '新增' },
  edit: { icon: IconEdit, text: '编辑' },
  delete: { icon: IconDelete, text: '删除', status: 'danger' },
  search: { icon: IconSearch, text: '搜索' },
  reset: { icon: undefined, text: '重置', type: 'secondary' },
  upload: { icon: IconUpload, text: '上传', type: 'secondary' },
  import: { icon: IconImport, text: '导入', type: 'secondary' },
  export: { icon: IconDownload, text: '导出', type: 'secondary' }
}

/** Arco 原生按钮类型 */
const ARCO_BUTTON_TYPES: AButtonProps['type'][] = ['primary', 'secondary', 'outline', 'dashed', 'text']

/** 当前按钮配置 */
const buttonConfig = computed<ButtonConfig | undefined>(() => {
  if (!props.type) {
    return undefined
  }
  return BUTTON_MAP[props.type]
})

/** 按钮属性计算 */
const buttonProps = computed(() => {
  // 判断是否为 Arco 原生类型
  const isArcoType = ARCO_BUTTON_TYPES.includes(props.type as AButtonProps['type'])

  // 确定按钮类型
  let buttonType: AButtonProps['type'] = 'primary'
  if (isArcoType) {
    buttonType = props.type as AButtonProps['type']
  } else if (buttonConfig.value?.type) {
    buttonType = buttonConfig.value.type
  }

  // 确定按钮状态
  const buttonStatus: AButtonProps['status'] = buttonConfig.value?.status || 'normal'

  return {
    ...props,
    type: buttonType,
    status: buttonStatus
  }
})
</script>

<style lang='scss' scoped></style>
