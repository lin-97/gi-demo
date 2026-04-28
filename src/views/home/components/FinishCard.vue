<template>
  <a-card title="工作完成度" :bordered="false" class="g-base-card finish-card">
    <template #extra>
      <a-radio-group type="button" size="small" default-value="1">
        <a-radio value="1">今日</a-radio>
        <a-radio value="2">本周</a-radio>
      </a-radio-group>
    </template>
    <a-row justify="space-between" align="center">
      <a-progress :width="80" :percent="0.6" type="circle" animation :stroke-width="12"
        track-color="var(--color-primary-light-1)" />

      <a-statistic title="较昨天" :value="30.52" :precision="2" :value-style="{ color: '#0fbf60' }">
        <template #prefix>
          <icon-arrow-rise />
        </template>
        <template #suffix>%</template>
      </a-statistic>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'FinishCard' })
</script>

<style lang="scss" scoped>
.finish-card {
  :deep(.arco-progress-circle-bar) {
    stroke-linecap: round;
  }
}
</style>
