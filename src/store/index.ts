import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useThemeStore } from './modules/theme'
import { useNavTabStore } from './modules/navtab'
import { useUserStore } from './modules/user'
import { useMenuStore } from './modules/menu'
import { useFileStore } from './modules/file'
import { useTimeStore } from './modules/time'

const pinia = createPinia()

export { useAppStore, useThemeStore, useNavTabStore, useUserStore, useMenuStore, useFileStore, useTimeStore }
export default pinia
