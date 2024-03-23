import { ref, h } from 'vue'
import { Modal, Message } from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'
import type { FileItem } from '@/apis'

export function openFileRenameModal(data: FileItem) {
  const ModalContentRef = ref<InstanceType<typeof ModalContent>>()
  return Modal.open({
    title: '重命名',
    width: '90%',
    modalStyle: { maxWidth: '450px' },
    modalAnimationName: 'el-fade',
    content: () =>
      h(ModalContent, {
        ref: (e) => {
          ModalContentRef.value = e as any
        }
      }),
    onBeforeOk: async () => {
      const valid = await ModalContentRef.value?.formRef?.validate()
      if (valid) return false
      console.log('传参', data)
      await new Promise((resolve) => setTimeout(() => resolve(true), 300))
      Message.success('重命名成功')
      return true
    }
  })
}
