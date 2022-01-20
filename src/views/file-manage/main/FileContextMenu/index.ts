// src/components/Confirm/index.js
import { createApp } from 'vue'
import Confirm from './index.vue'
import ArcoVue from '@arco-design/web-vue'

function confirm({ title, content }) {
  // 创建一个挂载容器
  const dom = document.createElement('div')
  // 挂载组件
  document.body.appendChild(dom)
    // 实例化组件，createApp第二个参数是props
    const instance = createApp(Confirm, {
      title: title || '提示',
      content: content,
      onCancel: () => {
        unmount()
      }
    }).use(ArcoVue)
    // 卸载组件
    const unmount = () => {
      setTimeout(()=> {
        instance.unmount()
        document.body.removeChild(dom)
      }, 300)
    }
    instance.mount(dom)
}

export default confirm
