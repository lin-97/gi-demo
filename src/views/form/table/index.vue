<template>
  <div class="gi_page page">
    <a-tabs default-active-key="1" size="large">
      <a-tab-pane key="1" title="基本示例">
        <Pane1></Pane1>
      </a-tab-pane>
      <a-tab-pane key="2" title="行编辑示例">
        <Pane2></Pane2>
      </a-tab-pane>
      <a-tab-pane key="3" title="双击单元格编辑示例">
        <Pane3></Pane3>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import Pane1 from './components/Pane1.vue'
import Pane2 from './components/Pane2.vue'
import Pane3 from './components/Pane3.vue'
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
  background-color: var(--color-bg-1);
  margin: $margin;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.arco-tabs) {
    flex: 1;
    display: flex;
    flex-direction: column;

    .arco-tabs-content {
      flex: 1;
      padding-top: 15px;

      .arco-tabs-content-list {
        height: 100%;
      }

      .arco-tabs-pane {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
