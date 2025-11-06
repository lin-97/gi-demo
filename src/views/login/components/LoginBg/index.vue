<template>
  <div class="login-bg">
    <div class="corner-top-box">
      <CornerTop></CornerTop>
    </div>
    <div class="corner-bottom-box">
      <CornerBottom></CornerBottom>
    </div>

    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<script setup lang="ts">
import CornerBottom from './CornerBottom.vue'
import CornerTop from './CornerTop.vue'
</script>

<style lang="scss" scoped>
.login-bg {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .corner-top-box {
    position: absolute;
    top: -1000px;
    right: -700px;
  }

  .corner-bottom-box {
    position: absolute;
    bottom: -600px;
    left: -300px;
  }
}

.fly {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
}

.bg-fly-circle1 {
  top: 100px;
  left: 40px;
  width: 100px;
  height: 100px;
  background: linear-gradient(to right, rgb(var(--primary-6), 0.07) 0%, rgb(var(--primary-6), 0.04) 100%);
  border-radius: 50%;
  animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
  bottom: 5%;
  left: 15%;
  width: 150px;
  height: 150px;
  background: linear-gradient(to right, rgb(var(--primary-6), 0.08) 0%, rgb(var(--primary-6), 0.04) 100%);
  border-radius: 50%;
  animation: move 3s linear infinite;
}

.bg-fly-circle3 {
  top: 140px;
  right: 20%;
  width: 145px;
  height: 145px;
  background: linear-gradient(to right, rgb(var(--primary-6), 0.1) 0%, rgb(var(--primary-6), 0.04) 100%);
  border-radius: 50%;
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  top: 60%;
  right: 5%;
  width: 160px;
  height: 160px;
  background: linear-gradient(to right, rgb(var(--primary-6), 0.02) 0%, rgb(var(--primary-6), 0.04) 100%);
  border-radius: 50%;
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(25px) scale(1.1);
  }

  100% {
    transform: translateY(0) scale(1);
  }
}
</style>
