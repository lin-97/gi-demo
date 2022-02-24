<template>
  <ul class="gi-option" :style="getStyle">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import { computed  } from 'vue';
const props = defineProps({
  width: {
    type: [Number, String],
    default: '120px'
  }
})

// 判断传入的值，是否带有单位，如果没有，就默认用px单位
const getUnitValue = (value: string | number): string | number => {
  return /(px|em|rem|%)$/.test(value.toString()) ? value : value + 'px'
}

let getStyle = computed<any>(()=> {
  const obj: any = {}
  obj.width = getUnitValue(props.width)
  return obj
})

</script>

<style lang="scss" scoped>
.gi-option {
  min-width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: var(--color-bg-popup);
  position: relative;
}
</style>
