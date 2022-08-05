<template>
  <div class="error-page">
    <section class="container">
      <div class="img-box">
        <img class="img-parent" :src="pageMap[current]" />
      </div>

      <div class="tip-box">
        <div class="ops">抱歉!</div>
        <div class="tip">当前页面不存在...</div>
        <div class="info">请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
        <a-button type="primary" shape="round" size="large" @click="back">{{ countDownTime }} 返回首页</a-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="ErrorPage">
import { onBeforeUnmount, onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Page403 from '@/assets/svgs/403.svg'
import Page404 from '@/assets/svgs/404.svg'
import Page500 from '@/assets/svgs/500.svg'

const route = useRoute()
const router = useRouter()

const countDownTime = ref(5)
const timer = ref(0)
const current = ref(404)

if (route.fullPath) {
  const arr = route.fullPath.split('/')
  current.value = Number(arr[arr.length - 1])
}

interface ErrorPage {
  [propName: number]: any
}

const pageMap: ErrorPage = reactive({
  403: Page403,
  404: Page404,
  500: Page500
})

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
  background: var(--color-bg-1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-box {
    width: 100%;
    position: relative;
    overflow: hidden;
    .img-parent {
      height: 50vh;
    }
    .img-child {
      position: absolute;
    }
  }
  .tip-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .ops {
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
      margin-bottom: 20px;
      font-size: 13px;
      line-height: 20px;
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
