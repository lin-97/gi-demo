<template>
  <a-card title="数据概览" :bordered="false" class="g-base-card g-card-title overview-card">
    <a-row :gutter="[14, 14]">
      <a-col v-for="(item, index) in statistics" :key="index" :span="12">
        <div class="overview-card__item">
          <a-statistic :title="item.title" :value="item.value" :precision="1" />
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
interface StatItem {
  title: string
  value: number
}

const statistics: StatItem[] = [
  { title: '粉丝数', value: 411.9 },
  { title: '点赞数', value: 3257.1 },
  { title: '视频销售额', value: 900.3 },
  { title: '直播销售额', value: 3557.1 }
]
</script>

<style lang="scss" scoped>
:deep(.arco-statistic-content .arco-statistic-value) {
  line-height: 1;
}

.overview-card {
  background-color: var(--color-bg-1);

  &__item {
    box-sizing: border-box;
    padding: var(--padding);
    background-color: var(--color-fill-1);
    border-radius: 8px;
  }
}
</style>
