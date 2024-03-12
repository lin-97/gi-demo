import { computed } from 'vue'
import { useBreakpoints } from '@vueuse/core'

export default function useBreakpoint() {
  const breakpoints = useBreakpoints({
    xs: 576, // <576
    sm: 576, // >= 576
    md: 768, // >=768
    lg: 992, // >=992
    xl: 1200, // >=1200
    xxl: 1600 // >=1600
  })

  const arr = breakpoints.current()
  const breakpoint = computed(() => {
    return arr.value[arr.value.length - 1] || 'xs'
  })

  return { breakpoint }
}
