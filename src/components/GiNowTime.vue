<template>
  <div class="gi-now-time" v-if="timeStore.time">
    <GiSvgIcon name="time" :size="20"></GiSvgIcon>
    <section class="time">{{ timeStore.time }}</section>
  </div>
</template>

<script setup lang="ts" name="GiNowTime">
import { useTimeStore } from '@/store'
const timeStore = useTimeStore()
</script>

<style lang="scss" scoped>
.gi-now-time {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--color-text-1);
  .time {
    margin-left: 6px;
  }
}
</style>
