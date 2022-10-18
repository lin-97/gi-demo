<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" v-model:active-key="activeKey">
        <a-tab-pane :key="1" title="周期管理"> </a-tab-pane>
        <a-tab-pane :key="2" title="维度管理"> </a-tab-pane>
        <a-tab-pane :key="3" title="单位管理"> </a-tab-pane>
      </a-tabs>
    </section>

    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive>
        <component :is="PaneMap[activeKey]"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script setup lang="ts" name="DataManage">
import { ref } from 'vue'
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'
import Pane3 from './Pane3.vue'

const PaneMap: any = {
  1: Pane1,
  2: Pane2,
  3: Pane3
}

const activeKey = ref(2)
</script>

<style lang="scss">
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

.data-pane {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  .pane-left {
    flex: 1;
    min-width: 260px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .pane-right {
    flex: 5;
    margin-left: $margin;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      padding: $padding;
      padding-top: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
