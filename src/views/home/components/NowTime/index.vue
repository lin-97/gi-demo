<template>
  <div v-if="state.time" class="now-time">
    <icon-schedule />
    <p class="now-time__time g-line-1">{{ state.time }}</p>
    <a-tag class="now-time__week" size="small">{{ state.week }}</a-tag>
  </div>
</template>

<script setup lang="ts">
import Dayjs from 'dayjs'

defineOptions({ name: 'NowTime' })
const state = ref({
  time: '',
  week: ''
})

// 获取现在时间
const getFormatNowTime = () => {
  const weekList = ['日', '一', '二', '三', '四', '五', '六']
  return {
    time: Dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    week: `星期${weekList[Dayjs(new Date()).day()]}`
  }
}

// 初始化时间
const initTime = () => {
  state.value = getFormatNowTime()
  setInterval(() => {
    state.value = getFormatNowTime()
  }, 1000)
}

initTime()
</script>

<style lang="scss" scoped>
@import url('@/assets/fonts/font.css');

.now-time {
  display: flex;
  align-items: center;

  font-size: 16px;
  color: var(--color-text-1);

  &__time {
    margin-left: 4px;
    font-family: DIGITAL;
  }

  &__week {
    margin-left: 6px;
  }
}
</style>
