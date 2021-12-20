<template>
  <div class="gi_flex_box home">
    <a-card title="工作台" :bordered="false" :style="{ marginTop: '10px' }">
      <WorkPlatform></WorkPlatform>
    </a-card>

    <div class="wrap">
      <section class="left">
        <div class="item"><ItemList></ItemList></div>
        <div class="item"><MsgList></MsgList></div>
      </section>
      <section class="right">
        <div class="item"><Chart></Chart></div>
        <div class="item"><HomeImg></HomeImg></div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WorkPlatform from './WorkPlatform.vue'
import ItemList from './ItemList.vue'
import MsgList from './MsgList.vue'
import Chart from './Chart.vue'
import HomeImg from './HomeImg.vue'
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow-y: scroll;
  .wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    .left,
    .right {
      flex: 1;
      flex-shrink: 0;
      min-width: 450px;
    }
    .right {
      overflow: hidden;
    }
    .item {
      padding: 5px;
    }
  }
}
</style>
