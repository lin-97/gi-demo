<template>
  <svg class="gi-loading-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
    <circle class="circle" cx="25" cy="25" r="20" fill="none" stroke-width="2" stroke="#000" />
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.gi-loading-icon {
  animation: loading-rotate 2s linear infinite;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.circle {
  stroke: rgb(var(--primary-5));
  animation: loading-dash 1.5s ease-in-out infinite;
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
