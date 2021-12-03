<template>
  <section class="tab">
    <a-tabs default-active-key="2">
      <a-tab-pane key="1" title="原子指标管理"> </a-tab-pane>
      <a-tab-pane key="2" title="时间周期管理"> </a-tab-pane>
      <a-tab-pane key="3" title="维度管理"> </a-tab-pane>
      <a-tab-pane key="4" title="计量单位管理"> </a-tab-pane>
      <a-tab-pane key="5" title="派生指标管理"> </a-tab-pane>
    </a-tabs>
  </section>

  <section class="gi_lr_page indicator-manage">
    <div class="left">
      <GiCateTree></GiCateTree>
    </div>
    <div class="right"></div>
  </section>
</template>

<script setup>
import GiCateTree from '@/views/components/GiCateTree.vue'
</script>

<style lang="scss" scoped>
.tab {
  padding: 0 $padding;
  background: var(--color-bg-3);
}
:deep(.arco-tabs-content) {
  padding-top: 0;
}
</style>
