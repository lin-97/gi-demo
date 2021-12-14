<template>
  <div class="chart">
    <div id="chart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from '@vue/runtime-core'
import * as echarts from 'echarts'

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('chart'))
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: 'ECharts示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
})
</script>

<style lang="scss" scoped>
.chart {
  padding: 20px;
  height: 250px;
  background: var(--color-bg-2);
}
</style>
