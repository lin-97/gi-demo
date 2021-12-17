<template>
  <div class="gi_box test">
    <a-space direction="vertical" size="medium">
      <GiTextRadio :list="list" v-model="current"></GiTextRadio>
      <GiTextSwitch v-model="checked" off-text="暂停中"></GiTextSwitch>
      <GiTextSwitch v-model="checked1"></GiTextSwitch>
      <GiTextSwitch v-model="checked1" disabled></GiTextSwitch>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GiTextRadio from '@/components/GiTextRadio.vue'
import GiTextSwitch from '@/components/GiTextSwitch.vue'

const list = [
  { label: '嘎嘎', value: '01' },
  { label: '哈哈', value: '02' },
  { label: '嘻嘻', value: '03' }
]
let current = ref('01')
let checked = ref(true)
let checked1 = ref(false)
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
