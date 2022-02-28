import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'Theme',
  state: () => {
    return {
      tab: {
        visible: true,
        mode: 'card-gutter',
        modeList: [
          { label: 'card-gutter', value: 'card-gutter' },
          { label: 'card', value: 'card' },
          { label: 'rounded', value: 'rounded' }
        ]
      },
      animate: {
        visible: true,
        mode: 'zoom-fade',
        modeList: [
          { label: 'fade-slide', value: 'fade-slide' },
          { label: 'fade', value: 'fade' },
          { label: 'fade-bottom', value: 'fade-bottom' },
          { label: 'fade-scale', value: 'fade-scale' },
          { label: 'zoom-fade', value: 'zoom-fade' },
          { label: 'zoom-out', value: 'zoom-out' }
        ]
      }
    }
  },
  getters: {
    transitionName(): string {
      return this.animate.visible ? this.animate.mode : ''
    }
  },
  actions: {
    // 设置页签可见
    setTabVisible(visible: boolean) {
      this.tab.visible = visible
    },
    // 设置页签的显示类型
    setTabMode(mode: string) {
      this.tab.mode = mode
    },
    // 设置是否使用过渡动画
    setAnimateVisible(visible: boolean) {
      this.animate.visible = visible
    },
    // 设置页面过渡动画类型
    setAnimateMode(mode: string) {
      this.animate.mode = mode
    }
  }
})
