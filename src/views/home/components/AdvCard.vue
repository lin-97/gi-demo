<template>
  <a-carousel auto-play :style="{ height: '200px' }">
    <a-carousel-item v-for="image in images" :key="image">
      <img class="adv-card__image" :src="image" :style="{ width: '100%' }" />
    </a-carousel-item>
  </a-carousel>
</template>

<script setup lang="ts">
import SponsorImage from '@/assets/images/sponsor.jpg'

const images = [
  SponsorImage,
  SponsorImage
]
</script>

<style lang="scss" scoped>
.adv-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
