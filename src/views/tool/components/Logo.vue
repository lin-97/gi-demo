<template>
  <div class="my-logo">
    <span class="logo">Logo</span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.logo {
  font-size: 100px;
  font-weight: 500;
  font-family: fantasy;
  line-height: 1;
  // background: linear-gradient(135deg, #14ffe9, #ffeb3b, rgb(255, 0, 225), rgb(34, 0, 255), #9033ff), green;
  background: linear-gradient(135deg, #14ffe9, #ffeb3b, rgb(255, 0, 225), rgb(34, 0, 255), #9033ff), green;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: transit 1s linear infinite;

  @keyframes transit {
    to {
      filter: hue-rotate(-360deg);
    }
  }
}
</style>
