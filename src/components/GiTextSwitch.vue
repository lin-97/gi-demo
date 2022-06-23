<template>
  <div class="gi-switch" :class="{ disabled: disabled }">
    <div class="gi-switch-wrap">
      <section class="slide-bar" :style="getSlideBarStyle"></section>
      <div class="item-box" ref="itemBoxRef">
        <section ref="OnRef" class="item left" :class="{ on: modelValue, disabled: disabled }" @click="onSwitch(true)">
          <slot name="on">启动</slot>
        </section>
        <section
          ref="OffRef"
          class="item right"
          :class="{ off: !modelValue, disabled: disabled }"
          @click="onSwitch(false)"
        >
          <slot name="off">暂停</slot>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="GiTextSwitch">
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const firstElWidth = ref(0)
const lastElWidth = ref(0)
const itemBoxRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (itemBoxRef.value) {
    firstElWidth.value = itemBoxRef.value?.firstChild?.clientWidth || 0
    lastElWidth.value = itemBoxRef.value?.lastChild?.clientWidth || 0
  }
})

const getSlideBarStyle = computed<object>(() => {
  const obj: any = {}
  obj.width = props.modelValue ? `${firstElWidth.value}px` : `${lastElWidth.value}px`
  obj.left = props.modelValue ? 0 : `${firstElWidth.value}px`
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
  padding: 0.15em;
  box-sizing: border-box;
  &.disabled {
    opacity: 0.5;
  }
  &-wrap {
    width: 100%;
    height: 100%;
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
    .item-box {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
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
      white-space: nowrap;
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
