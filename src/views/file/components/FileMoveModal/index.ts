import type { FileItem } from '@/apis/file'
import { Message, Modal } from '@arco-design/web-vue'
import { h, ref } from 'vue'
import ModalContent from './ModalContent.vue'

/** 文件移动-弹窗 */
export function openFileMoveModal(fileItem: FileItem, callback?: () => void) {
  const ModalContentRef = ref<InstanceType<typeof ModalContent>>()
  return Modal.open({
    title: '移动到',
    width: 'calc(100% - 20px)',
    modalStyle: { maxWidth: '500px' },
    modalAnimationName: 'el-dialog',
    maskAnimationName: 'el-mask',
    content: () =>
      h(ModalContent, {
        ref: (e) => {
          ModalContentRef.value = e as any
          ModalContentRef.value?.setForm({ id: fileItem.id, path: fileItem.filePath })
        }
      }),
    onBeforeOk: async () => {
      const valid = await ModalContentRef.value?.formRef?.validate()
      if (valid) return false
      await new Promise((resolve) => setTimeout(() => resolve(true), 300))
      Message.success('移动成功')
      // 文件移动成功-回调函数
      callback && callback()
      return true
    }
  })
}
