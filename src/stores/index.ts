import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './useAppStore'
export * from './useDictStore'
export * from './useMenuBadgeStore'
export * from './useRouteStore'
export * from './useTabsStore'
export * from './useUserStore'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
