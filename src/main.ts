import ArcoVue, { Card, Drawer, Modal } from '@arco-design/web-vue'
// 额外引入 Arco Design Icon图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { createApp } from 'vue'
// import '@arco-themes/vue-gi-demo/index.less'
// import '@arco-design/web-vue/dist/arco.css'

// 状态管理
import pinia from '@/stores'
import App from './App.vue'
// 自定义指令
import directives from './directives'

import router from './router'

import '@/styles/arco-ui/index.less'

// 使用动画库
import 'animate.css/animate.min.css'

// 自定义过渡动画
import '@/styles/css/transition.css'

// 导入全局scss主文件
import '@/styles/index.scss'

// 支持SVG
import 'virtual:svg-icons-register'

// 对特定组件进行默认配置
Card.props.bordered = false

const app = createApp(App)
Modal._context = app._context
Drawer._context = app._context

app.use(router)
app.use(pinia)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(directives)

app.mount('#app')
