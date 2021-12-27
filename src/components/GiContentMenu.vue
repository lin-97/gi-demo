<template>
  <transition :name="transitionName">
    <div
      class="gi-content-menu"
      ref="contentMenuRef"
      :style="contentMenuStyle"
      v-show="getShow"
      v-clickoutside="handleClose"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick, computed } from 'vue'
const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  },
  axis: {
    type: Object,
    default: () => {}
  },
  width: {
    type: String,
    default: '100px'
  },
  height: {
    type: String,
    default: 'auto'
  }
})

let transitionName = ref('slide-dynamic-origin')
const contentMenuHeight = ref(0)
let contentMenuStyle = ref({})

let contentMenuRef = ref(null)

const emit = defineEmits(['update:modelValue'])

let getShow = computed({
  get: () => {
    return props.modelValue
  },
  set: (v) => {
    emit('update:modelValue', v)
  }
})

const getStyle = () => {
  const obj = {}
  console.log('contentMenuHeight.value', contentMenuHeight.value)
  obj.left = props.axis.x + 2 + 'px'
  if (props.axis.y > window.innerHeight - contentMenuHeight.value) {
    obj.bottom = window.innerHeight - props.axis.y + 'px'
  } else {
    obj.top = props.axis.y + 2 + 'px'
  }
  obj.width = props.width
  obj.height = props.height
  obj['z-index'] = 999
  if (props.axis.y > window.innerHeight - contentMenuHeight.value) {
    obj['transform-origin'] = 'center bottom'
  } else {
    obj['transform-origin'] = 'center top'
  }
  contentMenuStyle.value = obj
}

watch(props.axis, () => {
  getShow.value = false
  if (props.axis.x === 0 || props.axis.y === 0) return
  nextTick(() => {
    contentMenuHeight.value = contentMenuRef.value.offsetHeight
    setTimeout(() => {
      getStyle()
      getShow.value = true
    }, 300)
  })
})

const handleClose = () => {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.gi-content-menu {
  // background: #fff;
  position: fixed;
  z-index: -999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}
</style>
