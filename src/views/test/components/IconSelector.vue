<template>
  <a-space fill>
    <GiIconSelector v-model="icon"></GiIconSelector>
    <span>{{ icon }}</span>
  </a-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GiIconSelector from '@/components/GiIconSelector.vue'

let icon = ref('')
</script>
