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
    default: 'auto'
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
  console.log('props.axis.y', props.axis.y)
  console.log('window.innerHeight', window.innerHeight)
  console.log('contentMenuHeight', contentMenuHeight.value)

  obj.left = props.axis.x + 2 + 'px'
  if (props.axis.y > window.innerHeight - contentMenuHeight.value) {
    obj.bottom = window.innerHeight - props.axis.y + 'px'
    obj['transform-origin'] = 'center bottom'
  } else {
    obj.top = props.axis.y + 2 + 'px'
    obj['transform-origin'] = 'center top'
  }
  obj.width = props.width
  obj.height = props.height
  obj['z-index'] = 999
  contentMenuStyle.value = obj
}

watch(props.axis, () => {
  getShow.value = false
  setTimeout(() => {
    getShow.value = true
    nextTick(() => {
      contentMenuHeight.value = contentMenuRef.value.offsetHeight
      getStyle()
    })
  }, 300)
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
