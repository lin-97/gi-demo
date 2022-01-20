// src/components/Confirm/index.js
import { createApp } from 'vue'
import Confirm from './index.vue'
import ArcoVue from '@arco-design/web-vue'
function confirm({ title }) {
    // 实例化组件，createApp第二个参数是props
    const instance = createApp(Confirm, {
      title: title || '提示',
      onCancel: () => {
        unmount()
      }
    }).use(ArcoVue)
    // 卸载组件
    const unmount = () => {
      setTimeout(()=> {
        instance.unmount()
        document.body.removeChild(parentNode)
      }, 300)
    }
    // 创建一个挂载容器
    const parentNode = document.createElement('div')
    // 挂载组件
    instance.mount(parentNode)
    document.body.appendChild(parentNode)
  
}

export default confirm
