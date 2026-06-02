<template>
  <div id="home" class="g-page home">
    <WorkCard></WorkCard>

    <a-row :gutter="14" class="home__content g-mt">
      <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" :xxl="14">
        <ProjectCard class="g-mb"></ProjectCard>
        <MessageCard class="g-mb"></MessageCard>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" :xxl="10">
        <FastCard class="g-mb"></FastCard>
        <ImageCard class="g-mb"></ImageCard>
      </a-col>
    </a-row>

    <a-back-top :visible-height="100" target-container="#home">
      <Icon icon="custom:backtop" :width="50" :height="50" class="backtop-icon" />
    </a-back-top>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import FastCard from './components/FastCard.vue'
import ImageCard from './components/ImageCard.vue'
import MessageCard from './components/MessageCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import WorkCard from './components/WorkCard.vue'

defineOptions({ name: 'Home' })
</script>

<style lang="scss" scoped></style>
