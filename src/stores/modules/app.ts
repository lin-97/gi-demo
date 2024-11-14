import { defineStore } from 'pinia'
import { computed, nextTick, reactive, toRefs } from 'vue'
import { generate, getRgbStr } from '@arco-design/color'
import { useTabsStore } from './tabs'
import defaultSettings from '@/config/setting.json'

const storeSetup = () => {
  // App配置
  const settingConfig = reactive({ ...defaultSettings }) as App.SettingConfig

  // 页面切换动画类名
  const transitionName = computed(() => (settingConfig.animate ? settingConfig.animateMode : ''))

  // 深色菜单主题色变量
  const themeCSSVar = computed<Record<string, string>>(() => {
    const obj: Record<string, string> = {}
    const list = generate(settingConfig.themeColor, { list: true, dark: true }) as string[]
    list.forEach((color, index) => {
      const rgbStr = getRgbStr(color)
      obj[`--primary-${index + 1}`] = rgbStr
    })
    return obj
  })

  // 切换主题 暗黑模式|简白模式
  const toggleTheme = (dark: boolean) => {
    if (dark) {
      settingConfig.theme = 'dark'
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      settingConfig.theme = 'light'
      document.body.removeAttribute('arco-theme')
    }
    setThemeColor(settingConfig.themeColor)
  }

  // 设置主题色
  function setThemeColor(color: string) {
    if (!color) return
    settingConfig.themeColor = color
    const list = generate(settingConfig.themeColor, { list: true, dark: settingConfig.theme === 'dark' }) as string[]
    list.forEach((color, index) => {
      const rgbStr = getRgbStr(color)
      document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
    })
  }

  // 初始化主题
  const initTheme = () => {
    if (!settingConfig.themeColor) return
    setThemeColor(settingConfig.themeColor)
  }

  // 设置左侧菜单折叠状态
  const setMenuCollapse = (collapsed: boolean) => {
    settingConfig.menuCollapse = collapsed
  }

  // 页面重新加载
  const reloadFlag = ref(true)
  const reload = async () => {
    reloadFlag.value = false
    await nextTick
    reloadFlag.value = true
  }

  const reloadPage = () => {
    const tabsStore = useTabsStore()
    tabsStore.reloadCurrentCache(reload)
  }

  return {
    ...toRefs(settingConfig),
    transitionName,
    themeCSSVar,
    toggleTheme,
    setThemeColor,
    initTheme,
    setMenuCollapse,
    reloadFlag,
    reloadPage
  }
}

export const useAppStore = defineStore('app', storeSetup, { persist: true })
