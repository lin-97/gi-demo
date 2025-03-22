<template>
  <a-carousel auto-play :style="{ height: '200px' }">
    <a-carousel-item v-for="(item, index) in images" :key="index">
      <img class="adv-card__image" :src="item.src" :style="{ width: '100%' }" @click="handleClick(item.link)" />
    </a-carousel-item>
  </a-carousel>
</template>

<script setup lang="ts">
import Adv1Image from '@/assets/images/adv1.png'
import SponsorImage from '@/assets/images/sponsor.jpg'

const images = [
  { src: Adv1Image, link: 'https://www.aeoliancloud.com/cart/goods.htm?id=14' },
  { src: SponsorImage, link: '' }
]

const handleClick = (link: string) => {
  if (!link) return
  window.open(link, '_blank')
}
</script>

<style lang="scss" scoped>
.adv-card__image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
