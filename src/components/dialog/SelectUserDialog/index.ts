import type { SelectDialogOptions } from '../type'
import type * as T from '@/apis/person'
import { Message, Modal } from '@arco-design/web-vue'
import Table from './Table.vue'

/** 全局-选择系统用户弹窗 */
export function selectUserDialog(options: SelectDialogOptions<T.ListItem>) {
  const TableRef = ref<InstanceType<typeof Table>>()
  Modal.open({
    title: options?.title || '选择用户',
    content: () => h(Table, { ref: (e: any) => TableRef.value = e as any, queryParams: options?.queryParams }),
    width: '90%',
    modalStyle: { maxWidth: '1000px' },
    onBeforeOk: async () => {
      const data = TableRef.value?.getSelectedData() || []
      if (!data.length) {
        Message.warning('请选择用户')
        return false
      }
      if (options?.onBeforeOk) {
        return await options.onBeforeOk(data)
      }
      options?.onOk?.(data)
      return true
    }
  })
}
