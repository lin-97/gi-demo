<template>
  <div class="gi_page page">
    <a-tabs default-active-key="1" size="large">
      <a-tab-pane key="1" title="查询表单">
        <Card1></Card1>
      </a-tab-pane>
      <a-tab-pane key="2" title="新增表单">
        <Card2></Card2>
      </a-tab-pane>
      <a-tab-pane key="3" title="级联表单">
        <Card3></Card3>
      </a-tab-pane>
      <a-tab-pane key="4" title="弹窗表单">
        <Card4></Card4>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import Card1 from './components/Card1.vue'
import Card2 from './components/Card2.vue'
import Card3 from './components/Card3.vue'
import Card4 from './components/Card4.vue'
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
