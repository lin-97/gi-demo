import { createApp } from 'vue'
import ThePreviewAudio from './index.vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import ArcoVue from '@arco-design/web-vue'

let instance = null
let dom = null

function contextMenu(e) {
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
    instance = createApp(ThePreviewAudio, {
      // onClick: (mode) => {
      //   resolve(mode)
      //   setTimeout(() => {
      //     unmount()
      //     instance = null
      //     dom = null
      //   }, 500)
      // },
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
