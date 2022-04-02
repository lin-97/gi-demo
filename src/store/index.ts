import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useMenuStore } from './modules/menu'
import { useNavTabStore } from './modules/navtab'
import { useThemeStore } from './modules/theme'
import { useUserStore } from './modules/user'
import { useFileStore } from './modules/file'

const pinia = createPinia()

export { useAppStore, useMenuStore, useThemeStore, useNavTabStore, useUserStore, useFileStore }
export default pinia
