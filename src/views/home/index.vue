<template>
  <div class="gi_flex_box home">
    <a-card title="工作台" :bordered="false" :style="{ marginTop: '10px' }">
      <HomeWorkPlatform></HomeWorkPlatform>
    </a-card>

    <div class="wrap">
      <section class="left">
        <div class="item"><HomeItemGrid></HomeItemGrid></div>
        <div class="item"><HomeMsgList></HomeMsgList></div>
      </section>
      <section class="right">
        <div class="item"><HomeChart></HomeChart></div>
        <div class="item"><HomeImage></HomeImage></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import HomeWorkPlatform from './HomeWorkPlatform.vue'
import HomeItemGrid from './HomeItemGrid.vue'
import HomeMsgList from './HomeMsgList.vue'
import HomeChart from './HomeChart.vue'
import HomeImage from './HomeImage.vue'
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
