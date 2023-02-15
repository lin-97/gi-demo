<template>
  <div>
    <Vue3Lottie :animationData="lottie01" :height="450" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import lottie01 from './lottie01.json'
</script>
