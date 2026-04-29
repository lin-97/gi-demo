<template>
  <div class="data-chart">
    <VCharts :option="option" :theme="theme" autoresize :style="{ height: '180px' }"></VCharts>
    <div class="data-chart__list">
      <div v-for="(item, index) in listData" :key="index" class="data-chart__list-item">
        <GiIconBox :color="item.color" :size="42" style="border-radius: 10px;">
          <Icon :icon="item.icon" :width="20" :height="20" />
        </GiIconBox>
        <div class="data-chart__list-item-content">
          <div class="data-chart__list-item-title g-line-1">{{ item.title }}</div>
          <div class="data-chart__list-item-status">{{ item.status }}</div>
        </div>
        <div class="data-chart__list-item-time">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { graphic } from 'echarts'
import VCharts from 'vue-echarts'
import { useChart } from '@/hooks'

const xData = ref<string[]>(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'])
const yData = ref<number[]>([160, 100, 145, 80, 190, 100, 175, 115, 160])

const listData = [
  {
    icon: 'icon-park-outline:shopping-bag',
    title: '新订单',
    status: '待处理',
    time: '5分钟',
    color: '#377DFF'
  },
  {
    icon: 'icon-park-outline:currency',
    title: '退款申请',
    status: '处理中',
    time: '10分钟',
    color: '#00B7FF'
  },
  {
    icon: 'icon-park-outline:message-unread',
    title: '客户投诉处理',
    status: '待处理',
    time: '15分钟',
    color: '#F59E0B'
  },
  {
    icon: 'icon-park-outline:audit',
    title: '库存不足提醒',
    status: '紧急',
    time: '20分钟',
    color: '#EF4444'
  }
]

const { option, theme } = useChart(() => {
  return {
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData.value,
      axisLine: {
        show: true,
        lineStyle: {}
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      interval: 30,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: yData.value,
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5B9FFF' },
            { offset: 0.5, color: '#377DFF' },
            { offset: 1, color: '#2563EB' }
          ]),
          shadowColor: 'rgba(55, 125, 255, 0.3)',
          shadowBlur: 8,
          shadowOffsetY: 4
        },
        emphasis: {
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#7BB3FF' },
              { offset: 0.5, color: '#4A90FF' },
              { offset: 1, color: '#3B7DE8' }
            ]),
            shadowBlur: 12,
            shadowOffsetY: 6
          }
        }
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.data-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: var(--padding);
  background-color: var(--color-bg-1);
  border-radius: 12px;

  &__list-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s;

    // &:not(:last-child) {
    //   border-bottom: 1px dashed var(--color-border-2);
    // }
  }

  &__list-item-content {
    flex: 1;
    min-width: 0;
    margin-left: 12px;
  }

  &__list-item-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-1);
  }

  &__list-item-status {
    margin-top: 8px;
  }

  &__list-item-time {
    flex-shrink: 0;
    margin-left: 12px;
    color: var(--color-text-4);
  }
}
</style>
