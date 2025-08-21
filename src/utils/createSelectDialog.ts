import type { Component } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'

interface CreateSelectDialogParams {
  title: string
  component: Component
  componentProps?: Record<string, any>
  tip?: string
}

interface SelectDialogOptions<T> {
  title?: string
  multiple?: boolean
  queryParams?: Record<string, any>
  onOk?: (data: T) => void
  onBeforeOk?: (data: T) => Promise<boolean>
}

/** 创建选择弹窗 */
export const createSelectDialog = <T = any>(params: CreateSelectDialogParams) => {
  return (options: SelectDialogOptions<T>) => {
    const TableRef = ref<any>()
    Modal.open({
      title: options.title || params.title,
      content: () => h(params.component, { ref: (e: any) => (TableRef.value = e), multiple: options.multiple, queryParams: options.queryParams, ...params.componentProps }),
      width: 'calc(100% - 20px)',
      modalStyle: { maxWidth: '1000px' },
      bodyStyle: { overflow: 'hidden', height: '500px', padding: 0 },
      onBeforeOk: async () => {
        if (!TableRef.value?.getSelectedData) {
          Message.warning('组件必须暴露getSelectedData方法')
          return false
        }
        const data = TableRef.value?.getSelectedData?.() || []
        if (!data.length) {
          Message.warning(params.tip || '请选择数据')
          return false
        }
        if (options?.onBeforeOk) {
          return await options.onBeforeOk(data)
        }
        options.onOk?.(data)
        return true
      }
    })
  }
}
