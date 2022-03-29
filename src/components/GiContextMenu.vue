<template>
  <transition name="slide-dynamic-origin">
    <div class="gi-context-menu" ref="contextMenuRef" :style="contextMenuStyle" v-show="visiable">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts" name="GiContextMenu">
import { ref, nextTick, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  // 坐标
  axis: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  },
  // 宽度
  width: {
    type: String,
    default: 'auto'
  },
  // 高度
  height: {
    type: String,
    default: 'auto'
  }
})

let visiable = ref<boolean>(false)
const contextMenuHeight = ref<number>(0)
let contextMenuStyle = ref<object>({})
let contextMenuRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['close'])

const getStyle = () => {
  const obj: any = {}
  // console.log('props.axis.y', props.axis.y)
  // console.log('window.innerHeight', window.innerHeight)
  // console.log('contextMenuHeight', contextMenuHeight.value)
  obj.left = props.axis.x + 2 + 'px'
  if (props.axis.y > window.innerHeight - contextMenuHeight.value) {
    obj.bottom = window.innerHeight - props.axis.y + 'px'
    obj['transform-origin'] = 'center bottom'
  } else {
    obj.top = props.axis.y + 2 + 'px'
    obj['transform-origin'] = 'center top'
  }
  obj.width = props.width
  obj.height = props.height
  obj['z-index'] = 999
  contextMenuStyle.value = obj
}

onMounted(() => {
  visiable.value = true
  nextTick(() => {
    if (contextMenuRef.value) {
      contextMenuHeight.value = contextMenuRef.value.offsetHeight
      getStyle()
    }
  })
})

// 检测在一个元素之外的任何点击
onClickOutside(contextMenuRef, () => {
  visiable.value = false
  emit('close')
})

defineExpose({
  visiable
})
</script>

<style lang="scss" scoped>
.gi-context-menu {
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}
</style>
