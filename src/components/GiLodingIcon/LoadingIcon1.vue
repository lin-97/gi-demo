<template>
  <svg class="gi-loading-icon" viewBox="25 25 50 50">
    <circle class="circle" cx="50" cy="50" r="20" fill="none"></circle>
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.gi-loading-icon {
  width: 40px;
  height: 40px;
  animation: loading-rotate 2s linear infinite;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.circle {
  stroke: rgb(var(--primary-5));
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke-linecap: round;
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
