<template>
  <div class="gi_box test">
    <GiTextRadio :list="list" v-model="current"></GiTextRadio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GiTextRadio from '@/components/GiTextRadio.vue'

const list = [
  { label: '嘎嘎', value: '01' },
  { label: '哈哈', value: '02' }
]
let current = ref('01')
</script>

<style lang="scss" scoped>
.test {
  flex: 1;
  margin: $margin;
  padding: $padding;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
