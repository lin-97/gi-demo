import { ref, h } from 'vue'
import { Modal, Message } from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'
import type { FileItem } from '@/apis'

export function openFileMoveModal(data: FileItem) {
  const ModalContentRef = ref<InstanceType<typeof ModalContent>>()
  return Modal.open({
    title: '移动到',
    width: '90%',
    modalStyle: { maxWidth: '500px' },
    modalAnimationName: 'el-dialog',
    maskAnimationName: 'el-mask',
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
      Message.success('移动成功')
      return true
    }
  })
}
