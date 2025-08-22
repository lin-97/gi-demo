import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import { useAppStore } from '@/stores'

// 获取代码提示
// 从'echarts'中导入{ SeriesOption };
// 因为配置项太多，这提供了一个相对方便的代码提示。
// 当使用vue时，注意反应性问题。需要保证对应的函数可以被触发，TypeScript不会报错，代码编写方便。

interface Options {
  (isDark: boolean): EChartsOption
}

export function useChart(sourceOption: Options) {
  const appStore = useAppStore()
  const isDark = computed(() => appStore.theme === 'dark')

  // echarts support https://echarts.apache.org/zh/theme-builder.html
  const option = computed<EChartsOption>(() => {
    return sourceOption(isDark.value)
  })

  return { option }
}
