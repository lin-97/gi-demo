import type { App } from 'vue'
import hasPerm from './hasPerm'
import hasRole from './hasRole'

export default {
  install(Vue: App) {
    Vue.directive('hasPerm', hasPerm)
    Vue.directive('hasRole', hasRole)
  }
}
