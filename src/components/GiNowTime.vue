<template>
  <div class="gi-now-time">
    <GiSvgIcon name="time" :size="20"></GiSvgIcon>
    <section class="time">{{ time }}</section>
  </div>
</template>

<script setup lang="ts" name="GiNowTime">
import { ref } from 'vue'
import dayjs from 'dayjs'

let time = ref('2022年01月01日 00:00:00')

setInterval(() => {
  time.value = dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
}, 1000)
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
