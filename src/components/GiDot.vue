<template>
  <span class="gi-dot gi-dot-processing" :class="`gi-dot-${type}`"></span>
</template>

<script setup lang="ts" name="GiDot">
import type { PropType } from 'vue'
type Type = 'primary' | 'success' | 'warning' | 'danger' | 'info'

defineProps({
  // 类型
  type: {
    type: String as PropType<Type>,
    default: 'primary'
  }
})
</script>

<style lang="scss" scoped>
.gi-dot {
  display: inline-block;
  background: #000;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
}
.gi-dot-processing {
  position: relative;
}
.gi-dot-processing:after {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  content: '';
  animation: gi-dot-animated 1.2s ease-in-out infinite;
}

.gi-dot-primary {
  background: $color-primary;
}
.gi-dot-success {
  background: $color-success;
}
.gi-dot-warning {
  background: $color-warning;
}
.gi-dot-danger {
  background: $color-danger;
}
.gi-dot-info {
  background: $color-info;
}

@keyframes gi-dot-animated {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  30% {
    opacity: 0.7;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
