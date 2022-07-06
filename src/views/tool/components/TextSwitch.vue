<template>
  <a-space>
    <GiTextSwitch v-model="checked" off-text="暂停中"></GiTextSwitch>
    <GiTextSwitch v-model="checked1"></GiTextSwitch>
    <GiTextSwitch v-model="checked1" disabled></GiTextSwitch>
  </a-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
const checked1 = ref(false)
</script>
