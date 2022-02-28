import { generate, getRgbStr } from '@arco-design/color'

/**
 * 使用主题
 * @param themeColor - 主题色
 */
export default function () {
  const changeThemeColor = (themeColor: string) => {
    const list = generate(themeColor, { list: true })
    // console.log('list', list)
    list.forEach((color: string, index: number) => {
      const rgbStr = getRgbStr(color)
      document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
    })
  }

  return {
    changeThemeColor
  }
}
