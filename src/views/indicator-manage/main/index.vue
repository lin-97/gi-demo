<template>
  <a-tabs default-active-key="2">
    <a-tab-pane key="1" title="原子指标管理"> </a-tab-pane>
    <a-tab-pane key="2" title="时间周期管理"> </a-tab-pane>
    <a-tab-pane key="3" title="维度管理"> </a-tab-pane>
    <a-tab-pane key="4" title="计量单位管理"> </a-tab-pane>
    <a-tab-pane key="5" title="派生指标管理"> </a-tab-pane>
  </a-tabs>

  <section class="gi_lr_page indicator-manage">
    <div class="left"></div>
    <div class="right"></div>
  </section>
</template>

<style lang="scss" scoped>
.arco-tabs-content {
  padding-top: 0;
}
</style>
