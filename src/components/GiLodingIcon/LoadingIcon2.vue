<template>
  <div class="gi-loading-icon">
    <span class="dot aaa"></span>
    <span class="dot bbb"></span>
    <span class="dot ccc"></span>
    <span class="dot ddd"></span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.gi-loading-icon {
  width: 20px;
  height: 20px;
  position: relative;
  animation: turn 1s linear infinite;
  transform-origin: center;
  display: flex;
  .dot {
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    position: absolute;
    overflow: hidden;
    &.aaa {
      left: -5px;
      top: -5px;
      background: rgb(var(--primary-2));
    }
    &.bbb {
      right: -5px;
      top: -5px;
      background: rgb(var(--primary-3));
    }
    &.ccc {
      left: -5px;
      bottom: -5px;
      background: rgb(var(--primary-4));
    }
    &.ddd {
      right: -5px;
      bottom: -5px;
      background: rgb(var(--primary-5));
    }
  }
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
