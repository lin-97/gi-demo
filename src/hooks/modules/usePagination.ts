import { reactive, toRefs, watch } from 'vue'
import { useBreakpoint } from '@/hooks'

type Callback = () => void

type Options = {
  defaultPageSize: number
}

/**
 * 分页管理 Hook
 * @description 提供分页状态管理的响应式 Hook，支持响应式断点，自动适配移动端显示
 * @param callback - 分页变化时的回调函数
 * @param options - 分页配置选项，默认每页显示 10 条
 * @returns {{
 *   current: Ref<number>, // 当前页码
 *   pageSize: Ref<number>, // 每页显示数量
 *   total: Ref<number>, // 总数据量
 *   pagination: Object, // 完整的分页配置对象
 *   changeCurrent: (page: number) => void, // 改变当前页码
 *   changePageSize: (size: number) => void, // 改变每页显示数量
 *   setTotal: (value: number) => void // 设置总数据量
 * }}
 * @example
 * const { pagination, setTotal } = usePagination(() => {
 *   // 分页变化时的回调
 *   fetchData()
 * })
 */
export function usePagination(callback: Callback, options: Options = { defaultPageSize: 10 }) {
  // 获取响应式断点
  const { breakpoint } = useBreakpoint()

  // 创建响应式分页配置对象
  const pagination = reactive({
    showPageSize: true,
    showTotal: true,
    current: 1,
    pageSize: options.defaultPageSize,
    total: 0,
    simple: false,
    onChange: (size: number) => {
      pagination.current = size
      callback && callback()
    },
    onPageSizeChange: (size: number) => {
      pagination.current = 1
      pagination.pageSize = size
      callback && callback()
    }
  })

  // 监听断点变化，自动适配移动端显示
  watch(
    () => breakpoint.value,
    () => {
      // 在 xs（移动端）断点下使用简单模式
      pagination.simple = ['xs'].includes(breakpoint.value)
      // 在 xs（移动端）断点下不显示总数据量
      pagination.showTotal = !['xs'].includes(breakpoint.value)
    },
    { immediate: true }
  )

  // 导出便捷方法
  const changeCurrent = pagination.onChange
  const changePageSize = pagination.onPageSizeChange

  /**
   * 设置总数据量
   * @param value - 新的总数据量
   */
  function setTotal(value: number) {
    pagination.total = value
  }

  // 导出响应式引用
  const { current, pageSize, total } = toRefs(pagination)

  return {
    current,
    pageSize,
    total,
    pagination,
    changeCurrent,
    changePageSize,
    setTotal
  }
}
