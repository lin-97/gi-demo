import { type ComputedRef, computed } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import type { ColProps } from '@arco-design/web-vue'

type ColBreakpoint = Pick<ColProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>
type Breakpoint = keyof ColBreakpoint

// 定义断点配置
const BREAKPOINT_CONFIG = {
  xs: 576, // <576px
  sm: 576, // ≥576px
  md: 768, // ≥768px
  lg: 992, // ≥992px
  xl: 1200, // ≥1200px
  xxl: 1600 // ≥1600px
} as const

/**
 * 响应式断点 Hook
 * @returns {{ breakpoint: ComputedRef<Breakpoint> }} 当前激活的最大断点值
 */
export function useBreakpoint() {
  const breakpoints = useBreakpoints(BREAKPOINT_CONFIG)

  const currentBreakpoints = breakpoints.current() as ComputedRef<Breakpoint[]>

  const breakpoint = computed<Breakpoint>(() => {
    const arr = currentBreakpoints.value
    return arr.length ? arr[arr.length - 1] : 'xs'
  })

  return { breakpoint }
}
