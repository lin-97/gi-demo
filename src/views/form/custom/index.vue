<template>
  <div class="gi_full_column gi_margin gi_bg_1">
    <a-tabs class="gi_full_tabs" default-active-key="1" size="large">
      <template #extra>
        <a-button>返回</a-button>
      </template>
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

defineOptions({ name: 'FormCustom' })
</script>

<style lang="scss" scoped></style>
