<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" v-model:active-key="activeKey">
        <a-tab-pane :key="1" title="人员管理"> </a-tab-pane>
        <a-tab-pane :key="2" title="单位管理"> </a-tab-pane>
      </a-tabs>
    </section>

    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive>
        <component :is="PaneMap[activeKey]"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Pane1 from './Pane1.vue'
import Pane2 from './Pane2.vue'

defineOptions({ name: 'DataIndex' })

const PaneMap: any = {
  1: Pane1,
  2: Pane2
}

const activeKey = ref(1)
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
