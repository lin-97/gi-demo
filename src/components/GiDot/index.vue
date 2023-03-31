<template>
  <span class="gi-dot" :class="[{ 'gi-dot-processing': animation }, `gi-dot-${type}`]"></span>
</template>

<script setup lang="ts" name="GiDot">
type Type = 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface Props {
  type?: Type
  animation?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  animation: true
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

$types: primary, success, warning, danger, info;

@each $i in $types {
  .gi-dot-#{$i} {
    background-color: rgb(var(--#{$i}-6));
  }
  @if ($i == info) {
    .gi-dot-#{$i} {
      background-color: rgb(var(--gray-6));
    }
  }
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
