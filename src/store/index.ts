import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useNavTabStore } from './modules/navtab'
import { useUserStore } from './modules/user'
import { useMenuStore } from './modules/menu'
import { useFileStore } from './modules/file'

const pinia = createPinia()

export { useAppStore, useNavTabStore, useUserStore, useMenuStore, useFileStore }
export default pinia
