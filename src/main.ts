import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入 Arco Design 组件库以及自定义主题
import ArcoVue from '@arco-design/web-vue'
import '@arco-themes/vue-demo/index.less'
// import '@arco-design/web-vue/dist/arco.css'

// 额外引入 Arco Design Icon图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

// 导入全局scss主文件
import '@/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ArcoVue)
app.use(ArcoVueIcon)

// 全局SVG图标组件
import GiSvgIcon from '@/components/GiSvgIcon.vue'
app.component('GiSvgIcon', GiSvgIcon)

import GiTitle from '@/components/GiTitle.vue'
app.component('GiTitle', GiTitle)

import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
app.component('GiOption', GiOption)
app.component('GiOptionItem', GiOptionItem)

import GiTag from '@/components/GiTag.vue'
app.component('GiTag', GiTag)

// 全局 v-loading 指令
import loading from '@/directives/v-loading'
app.directive('loading', loading)

app.mount('#app')
