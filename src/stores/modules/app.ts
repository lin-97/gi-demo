import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import { generate, getRgbStr } from '@arco-design/color'
import defaultSettings from '@/config/setting.json'

/**
 * 主题相关常量
 */
const THEME_CONSTANTS = {
  DARK: 'dark',
  LIGHT: 'light',
  ATTRIBUTE: 'arco-theme'
} as const

/**
 * App Store 的核心设置逻辑
 */
const storeSetup = () => {
  // 初始化 App 配置
  const settingConfig = reactive({ ...defaultSettings }) as App.SettingConfig

  /**
   * 计算页面切换动画类名
   * 根据配置决定是否启用动画以及使用哪种动画模式
   */
  const transitionName = computed(() =>
    settingConfig.animateVisible ? settingConfig.animate : ''
  )

  /**
   * 计算深色主题下的主题色变量
   * 生成一组主题色的 RGB 值，用于 CSS 变量
   */
  const themeCSSVar = computed<Record<string, string>>(() => {
    const colorVariables: Record<string, string> = {}
    const themeColors = generate(settingConfig.themeColor, {
      list: true,
      dark: true
    }) as string[]

    themeColors.forEach((color, index) => {
      colorVariables[`--primary-${index + 1}`] = getRgbStr(color)
    })
    return colorVariables
  })

  /**
   * 设置主题色
   * 生成主题色的色阶并应用到 CSS 变量
   * @param color - 主题色值
   */
  const setThemeColor = (color: string) => {
    if (!color) return

    settingConfig.themeColor = color
    const themeColors = generate(color, {
      list: true,
      dark: settingConfig.theme === THEME_CONSTANTS.DARK
    }) as string[]

    themeColors.forEach((color, index) => {
      document.body.style.setProperty(
        `--primary-${index + 1}`,
        getRgbStr(color)
      )
    })
  }

  /**
   * 切换主题模式（暗黑/明亮）
   * @param dark - 是否切换为暗黑模式
   */
  const toggleTheme = (dark: boolean) => {
    settingConfig.theme = dark ? THEME_CONSTANTS.DARK : THEME_CONSTANTS.LIGHT

    if (dark) {
      document.body.setAttribute(THEME_CONSTANTS.ATTRIBUTE, THEME_CONSTANTS.DARK)
    } else {
      document.body.removeAttribute(THEME_CONSTANTS.ATTRIBUTE)
    }

    setThemeColor(settingConfig.themeColor)
  }

  /**
   * 初始化主题设置
   * 在应用启动时设置初始主题色
   */
  const initTheme = () => {
    if (settingConfig.themeColor) {
      setThemeColor(settingConfig.themeColor)
    }
  }

  /**
   * 设置菜单折叠状态
   * @param collapsed - 是否折叠
   */
  const setMenuCollapse = (collapsed: boolean) => {
    settingConfig.menuCollapse = collapsed
  }

  return {
    ...toRefs(settingConfig),
    transitionName,
    themeCSSVar,
    toggleTheme,
    setThemeColor,
    initTheme,
    setMenuCollapse
  }
}

// 创建并导出 App Store，启用持久化存储
export const useAppStore = defineStore('app', storeSetup, { persist: true })
