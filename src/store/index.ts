import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useNavTabStore } from './modules/navtab'
import { useThemeStore } from './modules/theme'
import { useUserStore } from './modules/user'
import { useFileStore } from './modules/file'

const pinia = createPinia()

export { useAppStore, useThemeStore, useNavTabStore, useUserStore, useFileStore }
export default pinia
