import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入 Arco Design 组件库以及自定义主题
import ArcoVue from '@arco-design/web-vue'
import '@arco-themes/vue-gi-demo/index.less'
// import '@arco-design/web-vue/dist/arco.css'

// 额外引入 Arco Design Icon图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import '@/assets/css/transition.css'
// 导入全局scss主文件
import '@/styles/index.scss'

// 支持SVG
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ArcoVue)
app.use(ArcoVueIcon)

// 全局注册自定义组件(注：一定要定义组件的name！！！)
const GiComponents = import.meta.globEager('/src/components/*.vue')
const files = Object.assign(GiComponents)
Object.keys(files).forEach((item) => {
  const component = files[item]?.default
  app.component(component.name, component)
})

// 全局 v-loading 指令
import loading from '@/directives/v-loading'
app.directive('loading', loading)

app.mount('#app')
