import { ref } from 'vue'

/**
 * 加载状态管理 Hook
 * @description 提供加载状态管理的响应式 Hook，包含加载状态的设置、切换等功能
 * @param initValue - 初始加载状态，默认为 false
 * @returns {{
 *   loading: Ref<boolean>, // 加载状态的响应式引用
 *   setLoading: (value: boolean) => void, // 设置加载状态的函数
 *   toggle: () => void // 切换加载状态的函数
 * }}
 */
export function useLoading(initValue = false) {
  const loading = ref(initValue)

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const toggle = () => {
    loading.value = !loading.value
  }

  return {
    loading,
    setLoading,
    toggle
  }
}
