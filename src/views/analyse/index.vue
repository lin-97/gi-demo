<template>
  <div class="g-page">
    <a-row :gutter="[14, 14]">
      <a-col v-bind="leftColProps">
        <a-row :gutter="[14, 14]" align="stretch">
          <a-col v-for="item in statisticsList" :key="item.title" v-bind="statisticsColProps">
            <StatisticsCard :title="item.title" :value="item.value" :color="item.color" :icon="item.icon">
              <template #extra>
                <a-avatar-group v-if="item.title === '新增用户'" :size="24" :max-count="3">
                  <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
                  <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
                  <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
                  <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
                  <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
                </a-avatar-group>
                <template v-else>
                  <a-space :size="4" wrap>
                    <GiTrend v-for="(i, n) in item.list" :key="n" :label="i.label" :value="i.value" :unit="i.unit" />
                  </a-space>
                </template>
              </template>
            </StatisticsCard>
          </a-col>
        </a-row>

        <a-row :gutter="14" class="g-mt">
          <a-col v-for="(item, index) in list" :key="item.name" :class="`animated-fade-up-${index}`"
            v-bind="classifyColProps">
            <ClassifyCard :name="item.name" :icon="item.icon" :color="item.color"></ClassifyCard>
          </a-col>
        </a-row>

        <ChartCard></ChartCard>
      </a-col>

      <a-col v-bind="rightColProps">
        <GiFlex column gap>
          <ContentChart></ContentChart>
          <DataChart></DataChart>
        </GiFlex>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import ChartCard from './components/ChartCard.vue'
import ClassifyCard from './components/ClassifyCard.vue'
import ContentChart from './components/ContentChart.vue'
import DataChart from './components/DataChart.vue'
import StatisticsCard from './components/StatisticsCard.vue'

defineOptions({ name: 'AnalyseIndex' })

const leftColProps = { xs: 24, sm: 24, md: 24, lg: 16, xl: 16, xxl: 18 }
const rightColProps = { xs: 24, sm: 24, md: 24, lg: 8, xl: 8, xxl: 6 }

const statisticsColProps = { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 }
const classifyColProps = { xs: 12, sm: 6, md: 6, lg: 6, xl: 3, xxl: 3 }

const statisticsList = [
  {
    title: '访问量',
    value: 26868,
    color: '#377DFF',
    icon: 'icon-park-outline:preview-open',
    list: [
      { label: '日同比', value: 12, unit: '%' },
      { label: '周同比', value: -5, unit: '%' }
    ]
  },
  {
    title: '销售额',
    value: 12000,
    color: '#00D89F',
    icon: 'icon-park-outline:shopping',
    list: [
      { label: '日同比', value: 15, unit: '%' },
      { label: '周同比', value: -6, unit: '%' }
    ]
  },
  {
    title: '订单量',
    value: 1680,
    color: '#EF9A0B',
    icon: 'icon-park-outline:transaction-order',
    list: [
      { label: '季同比', value: 6.5, unit: '%' }
    ]
  },
  { title: '新增用户', value: 128, color: '#00AFF4', icon: 'icon-park-outline:add-user', list: [] }
]

const list = [
  { name: '用户', icon: 'icon-user', color: '#FD846F' },
  { name: '分析', icon: 'icon-bar-chart', color: '#79DD88' },
  { name: '商品', icon: 'icon-gift', color: '#5D65DF' },
  { name: '订单', icon: 'icon-subscribe', color: '#186DDA' },
  { name: '票据', icon: 'icon-printer', color: '#3DBEE4' },
  { name: '标签', icon: 'icon-tag', color: '#3370FF' },
  { name: '流程', icon: 'icon-relation', color: '#4086FF' },
  { name: '配置', icon: 'icon-settings', color: '#76CE59' }
]

const percent = ref(0)
const percent2 = ref(0)

setTimeout(() => {
  percent.value = 0.7
  percent2.value = 0.6
}, 100)
</script>

<style lang="scss" scoped></style>
