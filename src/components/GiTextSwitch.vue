<template>
  <div class="gi-switch" :class="{ disabled: disabled }">
    <div class="gi-switch-wrap">
      <section class="slide-bar" :style="getSlideBarStyle"></section>
      <section ref="OnRef" class="item left" :class="{ on: modelValue, disabled: disabled }" @click="onSwitch(true)">
        {{ onText }}
      </section>
      <section
        ref="OffRef"
        class="item right"
        :class="{ off: !modelValue, disabled: disabled }"
        @click="onSwitch(false)"
      >
        {{ offText }}
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  },
  onText: {
    type: String,
    default: '启动'
  },
  offText: {
    type: String,
    default: '暂停'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const OnRef = ref(null)
const OffRef = ref(null)
let onWidth = ref(0)
let offWidth = ref(0)
onMounted(() => {
  onWidth.value = OnRef.value.clientWidth
  offWidth.value = OffRef.value.clientWidth
})

const getSlideBarStyle = computed(() => {
  const obj: object = {}
  obj.width = props.modelValue ? `${onWidth.value}px` : `${offWidth.value}px`
  obj.left = props.modelValue ? 0 : `${onWidth.value}px`
  return obj
})

const onSwitch = (flag: boolean) => {
  if (flag === props.modelValue || props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss" scoped>
.gi-switch {
  display: inline-flex;
  height: 28px;
  background: var(--color-fill-3);
  padding: 0.16em;
  box-sizing: border-box;
  &.disabled {
    opacity: 0.5;
  }
  &-wrap {
    display: flex;
    align-items: center;
    position: relative;
    .slide-bar {
      height: 100%;
      position: absolute;
      top: 0;
      background: var(--color-bg-3);
      border-radius: 2px;
      overflow: hidden;
      transition: all 0.2s ease-in;
    }
    .left,
    .right {
      padding: 0 12px;
      height: 100%;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
    .item {
      &.disabled {
        cursor: not-allowed;
      }
      &.on {
        color: rgb(var(--primary-6));
      }
      &.off {
        color: rgb(var(--danger-6));
      }
    }
  }
}
</style>
