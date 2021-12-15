<template>
  <span class="gi-fullscreen-icon" @click="onToggle">
    <icon-fullscreen style="font-size: 18px" v-if="!isFullScreen" />
    <icon-fullscreen-exit style="font-size: 18px" v-else />
  </span>
</template>

<script lang="ts" setup>
/**
 * @desc 全屏图标组件
 */
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullScreen = ref(false)

// 监听变化
const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped>
.gi-fullscreen-icon {
  &:hover {
    cursor: pointer;
  }
}
</style>
