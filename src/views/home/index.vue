<template>
  <div class="home" id="home-wrap">
    <WorkPlatform></WorkPlatform>

    <div class="wrap">
      <section class="left">
        <div class="item"><GridCard></GridCard></div>
        <div class="item"><ListCard></ListCard></div>
      </section>
      <section class="right">
        <div class="item"><FastCard></FastCard></div>
        <div class="item"><ImageCard></ImageCard></div>
      </section>
    </div>

    <a-back-top target-container="#home-wrap">
      <GiSvgIcon name="backtop" :size="50" style="cursor: pointer"></GiSvgIcon>
    </a-back-top>
  </div>
</template>

<script setup lang="ts" name="Home">
import WorkPlatform from './WorkPlatform.vue'
import GridCard from './GridCard.vue'
import ListCard from './ListCard.vue'
import FastCard from './FastCard.vue'
import ImageCard from './ImageCard.vue'
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .wrap {
    display: flex;
    flex-wrap: wrap;
    padding: calc($margin / 2);
    .left,
    .right {
      flex: 1;
      flex-shrink: 0;
      min-width: 450px;
      overflow: hidden;
    }
    .item {
      padding: calc($margin / 2);
    }
  }
}
</style>
