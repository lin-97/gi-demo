import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 引入 Arco Design 组件库以及自定义主题
import ArcoVue from '@arco-design/web-vue'
import '@arco-themes/vue-demo/index.less'
// import '@arco-design/web-vue/dist/arco.css'

// 额外引入 Arco Design Icon图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

// 导入全局scss主文件
import '@/styles/index.scss'

const app = createApp(App)

// 全局Svg图标组件
import GiSvgIcon from '@/components/GiSvgIcon.vue'
app.component('GiSvgIcon', GiSvgIcon)

// 全局 v-loading 指令
import loading from '@/directives/v-loading'
app.directive('loading', loading)

app.use(router)
app.use(createPinia())
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')
