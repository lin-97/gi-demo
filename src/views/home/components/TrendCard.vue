<template>
  <a-card title="趋势分析" :bordered="false" class="g-base-card g-card-title trend-card">
    <template #extra>
      <a-radio-group type="button" size="small" default-value="1">
        <a-radio value="1">访问量</a-radio>
        <a-radio value="3">订单量</a-radio>
      </a-radio-group>
    </template>
    <VCharts :option="option" :theme="theme" autoresize :style="{ width: '100%', height: '120px' }" />
  </a-card>
</template>

<script lang="ts" setup>
import { graphic } from 'echarts'
import VCharts from 'vue-echarts'
import { useChart } from '@/hooks'

defineOptions({ name: 'TrendChart' })

/** 时间轴：30 分钟一档（模拟） */
const xData = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30']

/** 模拟趋势数据，与图例走势一致 */
const yData = [140, 165, 205, 150, 200, 200]

const { option, theme } = useChart(() => {
  return {
    backgroundColor: 'transparent',
    grid: {
      left: 0,
      right: 0,
      top: 8,
      bottom: 0,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: '#1890ff', type: 'dashed' } }
    },
    xAxis: {
      type: 'category',
      data: xData,
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: { show: false },
      axisLabel: {
        formatter(value: string, idx: number) {
          if (idx === xData.length - 1) return ''
          return value
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: { show: false }
    },
    series: [
      {
        name: '指标',
        type: 'line',
        data: yData,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: '#1890ff',
          shadowBlur: 10,
          shadowColor: 'rgba(24, 144, 255, 0.4)',
          shadowOffsetY: 3
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24, 144, 255, 0.2)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0)' }
          ])
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
