<template>
  <div class="gi-dot spinner-eff spinner-eff-3">
    <div class="circle circle-1"></div>
    <!-- <div class="circle circle-2"></div> -->
    <div class="circle circle-3"></div>
  </div>
</template>

<script setup lang="ts" name="GiDot"></script>

<style lang="scss" scoped>
$spinner-3-bg: #0cca4a;
$spinner-dimensions: 10px;

@mixin position-absolute($top: null, $left: null, $right: null, $bottom: null) {
  position: absolute;
  top: $top;
  left: $left;
  right: $right;
  bottom: $bottom;
}

.spinner-eff {
  position: relative;
  width: $spinner-dimensions;
  height: $spinner-dimensions;
  flex-shrink: 0;
  border-radius: 100px;
  background-color: $spinner-3-bg;
  z-index: 9;

  &:before,
  &:after {
    content: '';
    display: block;
  }

  .spinner-bar {
    &:before,
    &:after {
      content: '';
      display: block;
    }
  }
}

.spinner-eff.spinner-eff-3 {
  @keyframes pulse {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.3);
      opacity: 0;
    }

    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }

  @keyframes pulse-2 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }

  .circle {
    border-radius: 100px;
    @include position-absolute($left: 0, $right: 0);
    margin: auto;
    transform: scale(1);
    transform-origin: center center;

    &-1 {
      width: 150%;
      height: 150%;
      background-color: $spinner-3-bg;
      top: -25%;
      left: -25%;
      animation: pulse 2s linear 0s infinite;
      z-index: 1;
    }

    &-2 {
      width: 150%;
      height: 150%;
      background-color: $spinner-3-bg;
      top: -20%;
      left: -10%;
      transform: translate(-50%, -50%);
      animation: pulse-2 1.6s linear 0s infinite;
    }

    &-3 {
      width: 100%;
      height: 100%;
      background-color: $spinner-3-bg;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
  }
}
</style>
