<template>
  <GiPageLayout margin :body-style="{ padding: 0 }">
    <a-tabs class="gi_full_tabs" default-active-key="1" size="large">
      <template #extra>
        <a-button>返回</a-button>
      </template>
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
  </GiPageLayout>
</template>

<script setup lang="ts">
import Pane1 from './components/Pane1.vue'
import Pane2 from './components/Pane2.vue'
import Pane3 from './components/Pane3.vue'

defineOptions({ name: 'FormTable' })
</script>

<style lang="scss" scoped></style>
