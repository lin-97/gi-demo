<template>
  <div class="error-page">
    <section class="container">
      <div class="pic-box">
        <img class="pic-parent" src="@/assets/svgs/404.svg" />
        <img class="pic-child left" src="@/assets/images/error/cloud.png" />
        <img class="pic-child" src="@/assets/images/error/cloud.png" />
        <img class="pic-child" src="@/assets/images/error/cloud.png" />
      </div>

      <div class="tip-box">
        <div class="oops">抱歉!</div>
        <div class="tip">当前页面不存在...</div>
        <div class="info">请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
        <a-button type="primary" shape="round" size="large" @click="back">{{ countDownTime }} 返回首页</a-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="404Page">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let countDownTime = ref<number>(5)
let timer = ref<number>(0)

onMounted(() => {
  onCountDownTime()
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

// 返回页面
const back = () => {
  router.back()
}

// 倒计时
const onCountDownTime = () => {
  timer.value = setInterval(() => {
    if (countDownTime.value) {
      countDownTime.value--
    } else {
      // back()
      clearInterval(timer.value)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  background: var(--color-bg-2);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;
  .pic-box {
    width: 100%;
    position: relative;
    float: left;
    overflow: hidden;
    .pic-parent {
      width: 100%;
    }
    .pic-child {
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
  .tip-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .oops {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: rgb(var(--primary-6));
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    .tip {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
      color: var(--color-text-1);
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    .info {
      margin-bottom: 30px;
      font-size: 13px;
      line-height: 21px;
      color: var(--color-text-2);
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
</style>
