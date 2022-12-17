<template>
  <div class="home" id="home-wrap">
    <WorkCard></WorkCard>

    <div class="wrap">
      <section class="left">
        <div class="item"><ProjectCard></ProjectCard></div>
        <div class="item"><MessageCard></MessageCard></div>
      </section>
      <section class="right">
        <div class="item"><FastCard></FastCard></div>
        <div class="item"><ImageCard></ImageCard></div>
      </section>
    </div>

    <a-back-top :visible-height="100" target-container="#home-wrap">
      <GiSvgIcon name="backtop" :size="50" style="cursor: pointer"></GiSvgIcon>
    </a-back-top>
  </div>
</template>

<script setup lang="ts" name="Home">
import WorkCard from './WorkCard.vue'
import ProjectCard from './ProjectCard.vue'
import MessageCard from './MessageCard.vue'
import FastCard from './FastCard.vue'
import ImageCard from './ImageCard.vue'
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
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
