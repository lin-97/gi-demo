<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" v-model:active-key="activeKey">
        <a-tab-pane :key="1" title="周期管理"> </a-tab-pane>
        <a-tab-pane :key="2" title="维度管理"> </a-tab-pane>
        <a-tab-pane :key="3" title="单位管理"> </a-tab-pane>
      </a-tabs>
    </section>

    <component :is="PaneMap[activeKey]"></component>
  </div>
</template>

<script setup lang="ts" name="QuotaManage">
import { ref } from 'vue'
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'

const PaneMap: any = {
  1: Pane1,
  2: Pane2
}

const activeKey = ref(2)
</script>

<style lang="scss" scoped>
.manage {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .tab {
    background: var(--color-bg-1);
  }
}
</style>
