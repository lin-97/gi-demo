<template>
  <div class="gi_page analyse">
    <a-row :gutter="[14, 14]" align="stretch">
      <a-col v-bind="colProps">
        <a-card title="访问量" :bordered="false" class="analyse__card h-full">
          <template #extra>
            <a-tag color="green" bordered>日</a-tag>
          </template>
          <div class="analyse__content">
            <a-statistic :value="26868" :value-from="0" :start="true" animation show-group-separator> </a-statistic>
            <section class="analyse__tip">
              <a-space>
                <span><span>日同比 12.5%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
                <span><span>周同比 5%</span><icon-caret-down style="color: rgb(var(--warning-6))" /></span>
              </a-space>
            </section>
          </div>
          <a-divider :margin="16"></a-divider>
          <a-row justify="space-between">
            <a-typography-text type="secondary">总访问量</a-typography-text>
            <a-typography-text type="secondary">280万</a-typography-text>
          </a-row>
        </a-card>
      </a-col>

      <a-col v-bind="colProps">
        <a-card title="销售额" :bordered="false" class="analyse__card h-full">
          <template #extra>
            <a-tag color="arcoblue" bordered>月</a-tag>
          </template>
          <div class="analyse__content">
            <a-statistic :value="12000" :value-from="0" :start="true" animation show-group-separator></a-statistic>
            <section class="analyse__tip">
              <a-space>
                <span><span>日同比 15%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
                <span><span>周同比 6%</span><icon-caret-down style="color: rgb(var(--warning-6))" /></span>
              </a-space>
            </section>
          </div>
          <a-divider :margin="16"></a-divider>
          <a-row justify="space-between">
            <a-typography-text type="secondary">总销售额</a-typography-text>
            <a-typography-text type="secondary">68万</a-typography-text>
          </a-row>
        </a-card>
      </a-col>

      <a-col v-bind="colProps">
        <a-card title="订单量" :bordered="false" class="analyse__card h-full">
          <template #extra>
            <a-tag color="orange" bordered>季</a-tag>
          </template>
          <a-row justify="space-between" class="analyse__content">
            <div class="analyse__content">
              <a-statistic :value="1680" :value-from="0" :start="true" animation show-group-separator></a-statistic>
              <div class="analyse__tip">
                <span><span>季同比 6.5%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
              </div>
            </div>
            <a-progress type="circle" status="warning" :percent="percent2" animation />
          </a-row>
          <a-divider :margin="16"></a-divider>
          <a-row justify="space-between">
            <a-typography-text type="secondary">转化率</a-typography-text>
            <a-typography-text type="secondary">60%</a-typography-text>
          </a-row>
        </a-card>
      </a-col>

      <a-col v-bind="colProps">
        <a-card title="新增用户" :bordered="false" class="analyse__card h-full">
          <template #extra>
            <a-tag color="purple" bordered>周</a-tag>
          </template>
          <div class="analyse__content">
            <a-statistic :value="128" :value-from="0" :start="true" animation>
              <template #suffix>位</template>
            </a-statistic>
            <section class="analyse__tip">
              <a-avatar-group :size="24" :max-count="3">
                <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
                <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
                <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
                <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
                <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
              </a-avatar-group>
            </section>
          </div>
          <a-divider :margin="16"></a-divider>
          <a-row justify="space-between">
            <a-typography-text type="secondary">总用户</a-typography-text>
            <a-typography-text type="secondary">10800人</a-typography-text>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="14" class="gi_mt">
      <a-col v-for="(item, index) in list" :key="item.name" :class="`animated-fade-up-${index}`" :xs="12" :sm="8"
        :md="4" :lg="4" :xl="3" :xxl="3">
        <a-card hoverable :bordered="false" class="analyse__card--mini">
          <a-row justify="center" align="center" style="flex-direction: column">
             <GiIconBox :size="32" :color="item.color" shape="round">
                <component :is="item.icon" :size="18" />
             </GiIconBox>
            <span>{{ item.name }}</span>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <ChartData></ChartData>
</div>
</template>

<script lang="ts" setup>
import ChartData from './components/ChartData.vue'

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

<style lang="scss" scoped>
.analyse {
  &__card {
    display: flex;
    flex-direction: column;

    :deep(.arco-card-body) {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    :deep(.arco-tag-size-medium) {
      width: 24px;
      padding: 0;
      justify-content: center;
    }
  }

  &__card--mini {
    transition: transform 0.3s;
    margin-bottom: $margin;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    span {
      margin-top: 8px;
    }
  }

  &__content {
    flex: 1;
  }

  &__tip {
    height: 30px;
    display: flex;
    align-items: center;
  }
}
</style>
