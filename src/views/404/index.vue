<template>
  <section class="error-page">
    <div class="error-container">
      <div class="error-content">
        <div class="pic-error">
          <img class="pic-error-parent" src="@/assets/images/error/404.png" />
          <img class="pic-error-child left" src="@/assets/images/error/cloud.png" />
          <img class="pic-error-child" src="@/assets/images/error/cloud.png" />
          <img class="pic-error-child" src="@/assets/images/error/cloud.png" />
        </div>

        <div class="bullshit">
          <div class="bullshit-oops">抱歉!</div>
          <div class="bullshit-headline">当前页面不存在...</div>
          <div class="bullshit-info">请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
          <a-button type="primary" shape="round" size="large">{{ jumpTime }}返回首页</a-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

let jumpTime = ref(5)
let timer = ref(0)

onMounted(() => {
  countDownTime()
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const countDownTime = () => {
  timer.value = setInterval(() => {
    if (jumpTime.value) {
      jumpTime.value--
    } else {
      // this.$router.back()
      clearInterval(timer.value)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  background: white;
  position: relative;
}

.error-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .error-content {
    .pic-error {
      position: relative;
      float: left;
      width: 120%;
      overflow: hidden;
      &-parent {
        width: 100%;
      }
      &-child {
        position: absolute;
        &.left {
          top: 17px;
          left: 220px;
          width: 80px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }
        &.mid {
          top: 10px;
          left: 420px;
          width: 46px;
          opacity: 0;
          animation-name: cloudMid;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1.2s;
          animation-fill-mode: forwards;
        }
        &.right {
          top: 100px;
          left: 500px;
          width: 62px;
          opacity: 0;
          animation-name: cloudRight;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }
          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }
          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }
          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }
          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }
          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }
          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }
        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }
          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }
          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }
          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }
    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      &-oops {
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: $theme-color;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &-headline {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        line-height: 24px;
        color: #222;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &-info {
        margin-bottom: 30px;
        font-size: 13px;
        line-height: 21px;
        color: rgba(0, 0, 0, 0.65);
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(60px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}
</style>
