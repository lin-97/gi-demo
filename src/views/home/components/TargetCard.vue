<template>
  <a-card title="业绩目标" :bordered="false" class="g-base-card g-card-title target-card">
    <template #extra>
      <a-radio-group type="button" size="small" default-value="1">
        <a-radio value="1">访问量</a-radio>
        <a-radio value="3">订单量</a-radio>
      </a-radio-group>
    </template>
    <a-row justify="space-between" align="center">
      <a-progress :width="80" :percent="0.35" type="circle" animation :stroke-width="12"
        track-color="var(--color-primary-light-1)" />

      <ul class="target-card__legend">
        <li class="target-card__legend-item">
          <span class="target-card__legend-name">已完成</span>
          <a-tag size="large" color="blue">{{ 2383 }}</a-tag>
        </li>
        <li class="target-card__legend-item">
          <span class="target-card__legend-name">未完成</span>
          <a-tag size="large" color="orangered">{{ 632 }}</a-tag>
        </li>
      </ul>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'TargetCard' })
</script>

<style lang="scss" scoped>
.target-card {
  :deep(.arco-progress-circle-bar) {
    stroke-linecap: round;
  }

  &__legend {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    &-name {
      margin-right: 10px;
    }

    :deep(.arco-tag) {
      width: 60px;
      font-size: 15px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
