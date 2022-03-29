<template>
  <div class="gi-loading">
    <div class="wrapper">
      <section class="gi-loading-icon">
        <span class="dot aaa"></span>
        <span class="dot bbb"></span>
        <span class="dot ccc"></span>
        <span class="dot ddd"></span>
      </section>
      <span class="loading-text" v-if="loadingText">{{ loadingText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="GiLoading">
import { ref } from 'vue'

let loadingText = ref<string>('')

// 设置加载文本
const setLoadingText = (value: string) => {
  loadingText.value = value
}

defineExpose({
  loadingText,
  setLoadingText
})
</script>

<style lang="scss" scoped>
body[arco-theme='dark'] {
  .gi-loading {
    background: rgba(0, 0, 0, 0.7);
  }
}
.gi-loading {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  > .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .loading-text {
    margin-top: 16px;
    color: rgb(var(--primary-5));
  }
  &-icon {
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
}
</style>
