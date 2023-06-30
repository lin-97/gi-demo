import type { Component } from 'vue'
import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import ArcoVue from '@arco-design/web-vue'
import type { FileItem } from '@/apis'

import FileMoveModal from './FileMoveModal/index.vue'
import FileRenameModal from './FileRenameModal/index.vue'
import PreviewVideoModal from './PreviewVideoModal/index.vue'
import PreviewAudioModal from './PreviewAudioModal/index.vue'

function createModal<T>(component: Component, options?: T) {
  // 创建一个挂载容器
  const el: HTMLElement = document.createElement('div')
  // 挂载组件
  document.body.appendChild(el)

  // 实例化组件, createApp 第二个参数是 props
  const instance = createApp(component, {
    ...options,
    onClose: () => {
      setTimeout(() => {
        instance.unmount()
        document.body.removeChild(el)
      }, 350)
    }
  })

  instance.use(ArcoVue)
  instance.use(ArcoVueIcon)
  instance.mount(el)
}

/** 打开 文件移动 弹窗 */
export function openFileMoveModal(fileItem: FileItem) {
  return createModal<{ fileInfo: FileItem }>(FileMoveModal, { fileInfo: fileItem })
}

/** 打开 文件重命名 弹窗 */
export function openFileRenameModal(fileItem: FileItem) {
  return createModal<{ fileInfo: FileItem }>(FileRenameModal, { fileInfo: fileItem })
}

/** 预览 视频文件 弹窗 */
export function previewFileVideoModal(fileItem: FileItem) {
  return createModal<{ fileInfo: FileItem }>(PreviewVideoModal, { fileInfo: fileItem })
}

/** 预览 视频文件 弹窗 */
export function previewFileAudioModal(fileItem: FileItem) {
  return createModal<{ fileInfo: FileItem }>(PreviewAudioModal, { fileInfo: fileItem })
}
