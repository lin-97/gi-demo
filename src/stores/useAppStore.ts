import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import defaultSettings from '@/config/setting.json'

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
   * 设置菜单折叠状态
   * @param collapsed - 是否折叠
   */
  const setMenuCollapse = (collapsed: boolean) => {
    settingConfig.menuCollapse = collapsed
  }

  return {
    ...toRefs(settingConfig),
    transitionName,
    setMenuCollapse
  }
}

// 创建并导出 App Store，启用持久化存储
export const useAppStore = defineStore('app', storeSetup, { persist: true })
