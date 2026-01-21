import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import { useTheme } from '@/hooks'

interface Options {
  (isDark?: boolean): EChartsOption
}

/**
 * 用于集中管理 ECharts 配置，提供完整类型提示
 * @param sourceOption - ECharts 配置项
 * @returns { option: ComputedRef<EChartsOption>, theme: ComputedRef<string> } - 返回 ECharts 配置项和主题
 */
export function useChart(sourceOption: Options) {
  const { isDark } = useTheme()

  // echarts support https://echarts.apache.org/zh/theme-builder.html
  const option = computed<EChartsOption>(() => {
    return sourceOption(isDark.value)
  })

  const theme = computed(() => isDark.value ? 'dark' : undefined)

  return {
    /** ECharts 配置项 */
    option,
    /** ECharts 主题 */
    theme
  }
}
