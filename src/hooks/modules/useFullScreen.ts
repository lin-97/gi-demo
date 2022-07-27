import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

/** @desc 使用全屏 */
export default function () {
  // 是否全屏
  const isFullScreen = ref(false)

  // 监听变化
  const change = () => {
    isFullScreen.value = screenfull.isFullscreen
  }

  // 切换事件
  const onToggleFullScreen = () => {
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

  return {
    isFullScreen,
    onToggleFullScreen
  }
}
