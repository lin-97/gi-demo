<template>
  <transition :name="transitionName">
    <div
      class="gi-content-menu"
      ref="contentMenuRef"
      :style="[contentMenuStyle]"
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
    type: [Number, String],
    default: ''
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

const transitionName = ref('')
const contentMenuHeight = ref(0)
const contentMenuStyle = reactive({})

const contentMenuRef = ref(null)

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
  obj.left = props.axis.x + 2 + 'px'
  if (props.axis.y > window.innerHeight - contentMenuHeight.value) {
    obj.bottom = window.innerHeight - props.axis.y + 'px'
  } else {
    obj.top = props.axis.y + 2 + 'px'
  }
  obj.width = props.width
  obj.height = props.height
  obj['z-index'] = 999
  contentMenuStyle.value = obj
}

watch(props.axis.x, (newVal) => {
  nextTick(() => {
    getShow.value = false
    setTimeout(async () => {
      getStyle()
      getShow.value = true
    }, 0)
  })
})

watch(props.axis.y, (newVal) => {
  nextTick(() => {
    contentMenuHeight.value = contentMenuRef.offsetHeight
    transitionName.value =
      props.axis.y > window.innerHeight - contentMenuHeight.value ? 'el-zoom-in-bottom' : 'el-zoom-in-top'
    getShow.value = false
    setTimeout(async () => {
      getStyle()
      getShow.value = true
    }, 0)
  })
})

const handleClose = () => {
  emit('update:modelValue', false)
}
</script>

<script>
export default {
  methods: {
    getStyle() {
      const obj = {}
      obj.left = this.axis.x + 2 + 'px'
      if (this.axis.y > window.innerHeight - this.contentMenuHeight) {
        obj.bottom = window.innerHeight - this.axis.y + 'px'
      } else {
        obj.top = this.axis.y + 2 + 'px'
      }
      obj.width = this.width
      obj.height = this.height
      obj['z-index'] = 999
      this.contentMenuStyle = obj
    }
  }
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
}
</style>
