<template>
  <div class='page'>
    <a-card title="数据分类(ZTree)" :bordered="false" class="gi_card pane-left">
      <CateTree placeholder="请输入搜索关键词"></CateTree>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import CateTree from './components/ZTree/CateTree/index.vue'
</script>

<style lang='scss' scoped>
.pane-left {
  width: 260px;
  height: 560px;
  border: 1px solid var(--color-border-2);
}
</style>