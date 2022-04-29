<template>
  <div class="gi-dot spinner-eff spinner-eff-3">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
  </div>
</template>

<script setup lang="ts" name="GiDot"></script>

<style lang="scss" scoped>
$spinner-3-bg: #0cca4a;
$spinner-dimensions: 28px;

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
      width: 100%;
      height: 100%;
      background-color: lighten($spinner-3-bg, 25%);
      top: 0;
      animation: pulse 1.6s linear 0s infinite;
    }

    &-2 {
      width: 66.6%;
      height: 66.6%;
      background-color: $spinner-3-bg;
      top: 16.5%;
      animation: pulse-2 1.6s linear 0s infinite;
    }

    &-3 {
      width: 33.3%;
      height: 33.3%;
      background-color: $spinner-3-bg;
      top: 33.3%;
    }
  }
}
</style>
