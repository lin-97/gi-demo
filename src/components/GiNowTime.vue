<template>
  <div class="gi-now-time" v-if="time">
    <GiSvgIcon name="time" :size="20"></GiSvgIcon>
    <p class="time">{{ time }}</p>
  </div>
</template>

<script setup lang="ts" name="GiNowTime">
import { ref } from 'vue'
import dayjs from 'dayjs'

const time = ref('')

// 获取现在时间
const getFormatNowTime = () => {
  const weekList = ['日', '一', '二', '三', '四', '五', '六']
  return `${dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')} 星期${weekList[dayjs(new Date()).day()]}`
}

// 初始化时间
const initTime = () => {
  time.value = getFormatNowTime()
  setInterval(() => {
    time.value = getFormatNowTime()
  }, 1000)
}

initTime()
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
