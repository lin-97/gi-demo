<template>
  <div>
    <Vue3Lottie :animationData="lottie01" :height="450" autoplay loop />
    <Vue3Lottie :animationData="lottie02" :height="450" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import * as lottie01 from '@/libs/lottie/lottie01.json'
import * as lottie02 from '@/libs/lottie/lottie02.json'
</script>
