<template>
  <transition name="slide-dynamic-origin">
    <div class="gi-context-menu" ref="contextMenuRef" :style="contextMenuStyle">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  },
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

const contextMenuHeight = ref<number>(0)
let contextMenuStyle = ref<object>({})
let contextMenuRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update:modelValue', 'close'])

let visiable = computed<boolean>({
  get: () => {
    return props.modelValue
  },
  set: (v) => {
    emit('update:modelValue', v)
  }
})

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

watch(
  props.axis,
  () => {
    visiable.value = false
    setTimeout(() => {
      visiable.value = true
      nextTick(() => {
        contextMenuHeight.value = contextMenuRef.value.offsetHeight
        getStyle()
      })
    }, 300)
  },
  {
    immediate: true
  }
)

// 关闭弹框
const handleClose = () => {
  emit('update:modelValue', false)
}

// 检测在一个元素之外的任何点击
onClickOutside(contextMenuRef, () => {
  handleClose()
  emit('close')
})
</script>

<style lang="scss" scoped>
.gi-context-menu {
  // background: #fff;
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border-2);
}
</style>
