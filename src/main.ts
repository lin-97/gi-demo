import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入 Arco Design 组件库以及自定义主题
import ArcoVue from '@arco-design/web-vue'
import '@/styles/arco-ui/index.less'
// import '@arco-themes/vue-gi-demo/index.less'
// import '@arco-design/web-vue/dist/arco.css'

// 额外引入 Arco Design Icon图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

// 自定义过渡动画
import '@/styles/css/transition.css'
// 导入全局scss主文件
import '@/styles/index.scss'

// 支持SVG
import 'virtual:svg-icons-register'

// 自定义指令
import directives from './directives'

// 解决 json-editor-vue3 报错
import 'jsoneditor'

import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(directives)
app.use(Vue3Lottie)

// 全局注册自定义组件(注：一定要定义组件的name！！！)
// 注意：目前已使用unplugin-vue-components插件实现自定义组件自动导入

// const GiComponents = import.meta.globEager('/src/components/*.vue')
// const files = Object.assign(GiComponents)
// Object.keys(files).forEach((item) => {
//   const component = files[item]?.default
//   app.component(component.name, component)
// })

app.mount('#app')
