import { createApp } from 'vue'
import FileContextMenu from './index.vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import ArcoVue from '@arco-design/web-vue'

let instance: any = null
let dom: HTMLElement | null = null

function contextMenu(e: Event, fileInfo: File.FileItem) {
  return new Promise((resolve, reject) => {
    if (instance !== null) {
      instance.unmount()
    }
    if (dom !== null) {
      document.body.removeChild(dom)
    }
    // 创建一个挂载容器
    dom = document.createElement('div')
    // 挂载组件
    document.body.appendChild(dom)
    // 实例化组件, createApp第二个参数是 props
    instance = createApp(FileContextMenu, {
      axis: { x: e.clientX, y: e.clientY },
      fileInfo: fileInfo,
      onClick: (mode: string) => {
        resolve({ mode: mode, fileInfo: fileInfo })
        setTimeout(() => {
          unmount()
          instance = null
          dom = null
        }, 500)
      },
      onCancel: () => {
        reject()
        setTimeout(() => {
          unmount()
          instance = null
          dom = null
        }, 500)
      }
    })
      .use(ArcoVue)
      .use(ArcoVueIcon)

    // 卸载组件
    function unmount() {
      if (instance !== null) {
        instance.unmount()
      }
      if (dom !== null) {
        document.body.removeChild(dom)
      }
    }
    instance.mount(dom)
  })
}

export default contextMenu
