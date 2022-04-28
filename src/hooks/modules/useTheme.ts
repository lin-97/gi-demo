import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { generate, getRgbStr } from '@arco-design/color'
import { useThemeStore } from '@/store'

/**
 * 使用暗黑模式
 */
export default function () {
  const themeStore = useThemeStore()

  const theme = themeStore.theme

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

  // 改变主题色
  const changeThemeColor = (themeColor: string) => {
    const list = generate(themeColor, { list: true })
    // console.log('list', list)
    list.forEach((color: string, index: number) => {
      const rgbStr = getRgbStr(color)
      document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
    })
  }
  return {
    theme,
    onToggleThemeDark,
    changeThemeColor
  }
}
