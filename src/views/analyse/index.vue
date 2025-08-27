<template>
  <GiPageLayout :style="{ background: 'transparent' }" :body-style="{ overflowY: 'auto', padding: 'var(--margin)' }">
    <a-row :gutter="[14, 14]" align="stretch">
      <a-col v-bind="colProps">
        <StatisticsCard title="访问量" extra="日" :value="26868" footer-label="总访问量" footer-value="280万">
          <template #content-tip>
            <a-space>
              <span><span>日同比 12.5%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
              <span><span>周同比 5%</span><icon-caret-down style="color: rgb(var(--warning-6))" /></span>
            </a-space>
          </template>
        </StatisticsCard>
      </a-col>

      <a-col v-bind="colProps">
        <StatisticsCard title="销售额" extra="月" :value="12000" footer-label="总销售额" footer-value="68万">
          <template #content-tip>
            <a-space>
              <span><span>日同比 15%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
              <span><span>周同比 6%</span><icon-caret-down style="color: rgb(var(--warning-6))" /></span>
            </a-space>
          </template>
        </StatisticsCard>
      </a-col>

      <a-col v-bind="colProps">
        <StatisticsCard title="订单量" extra="季" :value="1680" footer-label="转化率" footer-value="60%">
          <template #content-tip>
            <span><span>季同比 6.5%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
          </template>
          <template #content-right>
            <a-progress type="circle" status="warning" :percent="percent2" animation />
          </template>
        </StatisticsCard>
      </a-col>

      <a-col v-bind="colProps">
        <StatisticsCard title="新增用户" extra="周" footer-label="总用户" footer-value="10800人">
          <a-statistic :value="128" :value-from="0" :start="true" animation>
            <template #suffix>位</template>
          </a-statistic>
          <template #content-tip>
            <a-avatar-group :size="24" :max-count="3">
              <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
              <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
              <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
              <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
              <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
            </a-avatar-group>
          </template>
        </StatisticsCard>
      </a-col>
    </a-row>

    <a-row :gutter="14" class="gi_mt">
      <a-col v-for="(item, index) in list" :key="item.name" :class="`animated-fade-up-${index}`" :xs="12" :sm="8"
        :md="4" :lg="4" :xl="3" :xxl="3">
        <ClassifyCard :name="item.name" :icon="item.icon" :color="item.color"></ClassifyCard>
      </a-col>
    </a-row>

    <ChartCard></ChartCard>
  </GiPageLayout>
</template>

<script lang="ts" setup>
import ChartCard from './components/ChartCard.vue'
import ClassifyCard from './components/ClassifyCard.vue'
import StatisticsCard from './components/StatisticsCard.vue'

defineOptions({ name: 'AnalyseIndex' })

const colProps = { xs: 12, md: 12, lg: 6, xl: 6, xxl: 6 }

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
