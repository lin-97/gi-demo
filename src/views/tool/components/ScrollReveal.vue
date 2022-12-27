<template>
  <div class='scroll-reveal'>
    <section class="page4"></section>
    <section class="page1"></section>
    <section class="page2">
      <ul>
        <li class="li"></li>
        <li class="li"></li>
        <li class="li"></li>
        <li class="li"></li>
      </ul>
    </section>
    <section class="page3" id="p3"></section>
    <section class="page4"></section>
  </div>
</template>

<script lang='ts' setup>
import { reactive, onMounted, onUnmounted } from 'vue'
import scrollReveal from 'scrollreveal'
// 在reactive()中声明scrollReveal组件
const data = reactive({
  scrollReveal: scrollReveal()
})

const retScroll = () => {
  // reveal()的类名可以为id (#reveal-top) 也可以为class(.reveal-top) 名称随意 并且也支持并集class写法 注意必须设置类否则无法使用
  data.scrollReveal.reveal('.page2', {
    // 动画的时长
    duration: 1000,
    // 延迟时间
    delay: 500,
    // 动画开始的位置，'bottom', 'left', 'top', 'right'
    origin: 'bottom',
    // 回滚的时候是否再次触发动画
    reset: true,
    // 延时执行方式（always（一直延时执行），once（只延时执行一次），onload（只在加载时延时执行））
    // // useDelay: 'onload',
    // 在移动端是否使用动画
    mobile: true,
    // 滚动的距离，单位可以用%，rem等
    distance: '50px',
    // 其他可用的动画效果
    opacity: 0,
    // 执行速度 线性函数啥的
    // easing: 'cubic-bezier(0.5, 0, 0, 1)',
    // 执行方式（缩放）
    scale: 0.9,
    // 使用执行之前的回调函数
    beforeReveal: function (ele) {
      console.log(1);
    }
  })
}

onMounted(() => {
  // window.addEventListener('scroll', retScroll)
  retScroll()
})

onUnmounted(() => {
  // window.removeEventListener('scroll', retScroll)
})
</script>

<style lang='scss' scoped>
.scroll-reveal {
  .page1 {
    height: 600px;
    background-color: brown;
  }

  .page2 {
    height: 600px;
    background-color: darkgoldenrod;

    ul {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;

      li {
        width: 150px;
        height: 150px;
        background-color: #fff;

        &:nth-child(even) {
          background-color: blue;
        }
      }
    }
  }

  .page3 {
    height: 600px;
    background-color: blueviolet;
  }

  .page4 {
    height: 600px;
    background-color: deepskyblue;
  }
}
</style>