import { ref } from 'vue'
import { useLoading } from '@/hooks'

/**
 * 请求配置选项
 */
interface UseRequestOptions<T = any> {
  /** 默认值 */
  defaultValue?: T
  /** 是否立即执行请求，默认为 true */
  immediate?: boolean
  /** 初始加载状态，默认为 true */
  isLoading?: boolean
  /** 请求成功回调 */
  onSuccess?: (data: any) => void
  /** 请求失败回调 */
  onError?: (error: any) => void
}

/**
 * 请求管理 Hook
 * @description 提供请求状态管理的响应式 Hook，支持自动/手动触发、错误处理、刷新等功能
 * @template T - 响应数据类型
 * @param api - API 请求函数，返回 Promise<ApiRes<T>>
 * @param options - 请求配置选项
 * @returns 返回包含请求状态和操作方法的对象
 * {{
 *   loading: Ref<boolean>, // 加载状态的响应式引用
 *   data: Ref<T>, // 响应数据的响应式引用
 *   error: Ref<any>, // 错误信息的响应式引用
 *   run: () => Promise<void>, // 手动触发请求的函数
 *   refresh: () => Promise<void> // 刷新请求的函数（等同于 run）
 * }}
 * @example
 * // 基础用法 - 立即执行
 * const { loading, data } = useRequest(() => getUserInfo())
 *
 * // 手动触发
 * const { loading, data, run } = useRequest(() => getUserInfo(), { immediate: false })
 * run()
 *
 * // 带默认值和回调
 * const { loading, data } = useRequest(
 *   () => getUserInfo(),
 *   {
 *     defaultValue: {},
 *     onSuccess: (data) => console.log('成功', data),
 *     onError: (error) => console.error('失败', error)
 *   }
 * )
 */
export function useRequest<T>(
  api: () => Promise<ApiRes<T>>,
  options: UseRequestOptions<T> = {}
) {
  const { defaultValue, immediate = true, isLoading = true, onSuccess, onError } = options
  const { loading, setLoading } = useLoading(isLoading)
  const data = ref<T>(defaultValue as T)
  const error = ref<any>(null)

  /**
   * 执行请求
   * @description 调用 API 并更新响应数据，处理加载状态和错误
   */
  async function run() {
    try {
      error.value = null
      setLoading(true)
      const res = await api()
      data.value = res.data as T
      onSuccess?.(res.data)
    } catch (err) {
      error.value = err
      onError?.(err)
    } finally {
      setLoading(false)
    }
  }

  // 立即执行请求
  if (immediate) {
    run()
  }

  return {
    loading,
    data,
    error,
    run
  }
}
