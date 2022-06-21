import type { App } from 'vue'
import permission from './permission'
import loading from './v-loading'

export default {
  install(Vue: App) {
    Vue.directive('permission', permission), Vue.directive('loading', loading)
  }
}
