import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useNavTabStore } from './modules/navtab'
import { useUserStore } from './modules/user'
import { useFileStore } from './modules/file'

const pinia = createPinia()

export { useAppStore, useNavTabStore, useUserStore, useFileStore }
export default pinia
