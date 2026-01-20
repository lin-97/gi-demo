import { generate, getRgbStr } from '@arco-design/color'
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { useAppStore } from '@/stores'

/**
 * 主题管理 Hook
 * @description 使用 vueuse 的 useDark 来管理主题状态
 */
export function useTheme() {
  const appStore = useAppStore()

  /** 是否为暗色主题 */
  const isDark = useDark({
    // 主题切换目标元素
    selector: 'body',
    // 主题属性名
    attribute: 'arco-theme',
    // 暗色主题值
    valueDark: 'dark',
    // 亮色主题值
    valueLight: 'light',
    // 本地存储键名
    storageKey: 'arco-theme',
    // 初始值
    initialValue: 'light'
  })

  /** 当前主题 */
  const theme = computed(() => isDark.value ? 'dark' : 'light')

  /** 主题切换函数定义 */
  const onToggle = useToggle(isDark)

  /** 主题切换函数 */
  function toggleTheme() {
    onToggle()
    setThemeColor(appStore.themeColor)
  }

  /**
   * 设置主题色
   * 生成主题色的色阶并应用到 CSS 变量
   * @param color - 主题色值
   */
  function setThemeColor(color: string) {
    if (!color) return
    appStore.themeColor = color
    const themeColors = generate(color, {
      list: true,
      dark: isDark.value
    }) as string[]
    themeColors.forEach((color, index) => {
      document.body.style.setProperty(`--primary-${index + 1}`, getRgbStr(color))
    })
  }

  /**
   * 初始化主题设置
   * 在应用启动时设置初始主题色
   */
  function initThemeColor() {
    if (appStore.themeColor) {
      setThemeColor(appStore.themeColor)
    }
  }

  return {
    isDark,
    theme,
    toggleTheme,
    setThemeColor,
    initThemeColor
  }
}
