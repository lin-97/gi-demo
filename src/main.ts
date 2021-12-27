import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ArcoVue from '@arco-design/web-vue'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'

import '@/styles/index.scss' // 导入scss主文件
// import clickOutside from '@/directives/clickoutside'

const app = createApp(App)
// app.directive('clickoutside', clickOutside)

app.directive('clickoutside', {
  // 初始化指令
  mounted(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.instance) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unmounted(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})

app.use(router)
app.use(store)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')
