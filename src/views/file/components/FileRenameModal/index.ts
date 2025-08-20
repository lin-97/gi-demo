import type { FileItem } from '@/apis/file'
import { Message, Modal } from '@arco-design/web-vue'
import { h, ref } from 'vue'
import ModalContent from './ModalContent.vue'

/** 文件重命名-弹窗 */
export function openFileRenameModal(fileItem: FileItem, callback?: () => void) {
  const ModalContentRef = ref<InstanceType<typeof ModalContent>>()

  return Modal.open({
    title: '重命名',
    width: 'calc(100% - 20px)',
    modalStyle: { maxWidth: '450px' },
    modalAnimationName: 'el-fade',
    content: () =>
      h(ModalContent, {
        ref: (e) => {
          ModalContentRef.value = e as any
          ModalContentRef.value?.setForm({ id: fileItem.id, name: fileItem.name })
        }
      }),
    onBeforeOk: async () => {
      const valid = await ModalContentRef.value?.formRef?.validate()
      if (valid) return false
      await new Promise((resolve) => setTimeout(() => resolve(true), 300))
      Message.success('重命名成功')
      // 文件重命名成功-回调函数
      callback && callback()
      return true
    }
  })
}
