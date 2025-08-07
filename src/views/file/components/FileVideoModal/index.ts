import type { FileItem } from '@/apis/file'
import { Modal } from '@arco-design/web-vue'
import { h } from 'vue'
import ModalContent from './ModalContent.vue'

export function previewFileVideoModal(data: FileItem) {
  return Modal.open({
    title: '视频播放',
    width: 'auto',
    modalStyle: {},
    content: () => h(ModalContent, { data })
  })
}
