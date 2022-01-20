// src/components/Confirm/index.js
import { createApp } from 'vue'
import Confirm from './index.vue'
import ArcoVue from '@arco-design/web-vue'
function confirm({ title, message, confirmBtnText, cancelBtnText }) {
  return new Promise((resolve, reject) => {
    // 实例化组件，createApp第二个参数是props
    const confirmInstance = createApp(Confirm, {
      title: title || '提示',
      message: message || '确认消息',
      confirmBtnText: confirmBtnText || '确定',
      cancelBtnText: cancelBtnText || '取消',
      onConfirm: () => {
        unmount()
        resolve()
      },
      onCancel: () => {
        unmount()
        reject(new Error())
      }
    }).use(ArcoVue)
    // 卸载组件
    const unmount = () => {
      confirmInstance.unmount()
      document.body.removeChild(parentNode)
    }
    // 创建一个挂载容器
    const parentNode = document.createElement('div')
    document.body.appendChild(parentNode)
    // 挂载组件
    confirmInstance.mount(parentNode)
  })
}

export default confirm
