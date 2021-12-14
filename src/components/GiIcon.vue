<template>
  <div class="gi-icon" :class="{ disabled: disabled }" :style="getStyle" @click="handleClick">
    <i class="gi-icon-icon" :class="name" :style="getIconStyle"></i>
    <span v-if="label" class="gi-icon-label" :class="{ hover: !disabled && !color }" :style="getLabelStyle">{{
      label
    }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  // 图标类名
  name: {
    type: String,
    default: ''
  },
  // 图标颜色
  color: {
    type: String,
    default: ''
  },
  // 图标大小
  size: {
    type: [String, Number],
    default: 16
  },
  // 标签
  label: {
    type: String,
    default: ''
  },
  // 标签颜色
  labelColor: {
    type: String,
    default: ''
  },
  // 标签大小
  labelSize: {
    type: [String, Number],
    default: 12
  },
  // 标签位置
  labelPos: {
    type: String,
    default: 'right'
  },
  // 图标和标签间距
  space: {
    tyep: [Number, String],
    default: 3
  },
  // 图标是否加粗
  bold: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const getStyle = computed(() => {
  const obj = {}
  const flexMap = {
    left: 'row-reverse',
    right: 'row',
    top: 'column-reverse',
    bottom: 'column'
  }
  obj['flex-direction'] = flexMap[props.labelPos]
  return obj
})
const getIconStyle = computed(() => {
  const obj = {}
  obj['font-size'] = getUnitValue(props.size)
  obj['color'] = props.color
  obj[`margin-${props.labelPos}`] = getUnitValue(props.space)
  obj['font-weight'] = props.bold ? 'bold' : 'normal'
  return obj
})

const getLabelStyle = computed(() => {
  const obj = {}
  obj['font-size'] = getUnitValue(props.labelSize)
  obj['color'] = props.labelColor
  return obj
})

// 判断传入的值，是否带有单位，如果没有，就默认用px单位
const getUnitValue = (value: string | number) => {
  return /(px|em|rem|%)$/.test(value.toString()) ? value : value + 'px'
}

const handleClick = () => {
  if (props.disabled) return
  emit('click')
}
</script>

<style lang="scss" scoped>
.gi-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
}
.gi-icon-icon {
  color: rgba(var(--primary-6));
}
.gi-icon-label {
  transition: color 0.3s;
  &.hover {
    &:hover {
      color: rgba(var(--primary-6));
    }
  }
}
.disabled {
  opacity: 0.5;
}
</style>
