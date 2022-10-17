<template>
  <div class="analyse">
    <section class="head">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card title="访问量">
            <template #extra>
              <a-button type="outline" status="success" size="small"><template #icon>日</template></a-button>
            </template>

            <a-statistic :value="26868" :value-from="0" :start="true" animation show-group-separator>
              <template #extra>
                <a-space>
                  <span><span>日同比 12.5%</span><icon-caret-up style="color: rgb(var(--success-6))" /></span>
                  <span><span>周同比 5%</span><icon-caret-down style="color: rgb(var(--warning-6))" /></span>
                </a-space>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="销售额">
            <template #extra>
              <a-button type="outline" size="small"><template #icon>月</template></a-button>
            </template>
            <a-statistic :value="12000" show-group-separator></a-statistic>
            <a-progress size="large" :percent="0.6" />
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="订单量">
            <template #extra>
              <a-button type="outline" status="danger" size="small"><template #icon>周</template></a-button>
            </template>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="新增用户"></a-card>
        </a-col>
      </a-row>
    </section>
    <DataChart></DataChart>
  </div>
</template>

<script lang="ts" setup name="Analyse">
import DataChart from './DataChart.vue'
</script>

<style lang="scss" scoped>
.analyse {
  .head {
    padding: $margin;
    overflow: hidden;
  }
}
</style>
