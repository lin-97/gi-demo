<template>
  <div>
    <GiTextRadio :list="list" v-model="current"></GiTextRadio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  { label: '嘎嘎', value: '01' },
  { label: '哈哈', value: '02' },
  { label: '嘻嘻', value: '03' }
])
let current = ref('01')
</script>
