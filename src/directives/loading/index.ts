import Loading from './Loading.vue'
import { createApp } from 'vue'

const loadingObj = {
  mounted(el: any, bind: any) {
    const app = createApp(Loading)
    const instance: any = app.mount(document.createElement('div'))
    el.instance = instance
    el.instance.setLoading('我是努力加载中')
    if (bind.value) {
      appndChild(el)
    }
  },
  updated(el: any, bind: any) {
    if (bind.value !== bind.oldValue) {
      bind.value ? appndChild(el) : remove(el)
    }
  }
}

function appndChild(el: any) {
  el.appendChild(el.instance.$el)
}

function remove(el: any) {
  el.removeChild(el.instance.$el)
}

export default loadingObj
