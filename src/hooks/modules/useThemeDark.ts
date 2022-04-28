import { useDark, useToggle } from '@vueuse/core'
import { useThemeStore } from '@/store'

/**
 * 使用暗黑模式
 */
export default function () {
  const themeStore = useThemeStore()

  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      themeStore.toggleTheme(dark)
    }
  })

  // 切换主题
  const onToggleThemeDark = useToggle(isDark)
  return {
    theme: themeStore.theme,
    onToggleThemeDark
  }
}
