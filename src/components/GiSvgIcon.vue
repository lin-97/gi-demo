<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color, width: iconSize, height: iconSize }">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 20
  }
})

// 判断传入的值，是否带有单位，如果没有，就默认用px单位
const getUnitValue = (value: string | number) => {
  return /(px|em|rem|%)$/.test(value.toString()) ? value : value + 'px'
}

const iconSize = computed(() => {
  return getUnitValue(props.size)
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`
  return 'svg-icon'
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: auto;
  height: auto;
  fill: currentColor;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
