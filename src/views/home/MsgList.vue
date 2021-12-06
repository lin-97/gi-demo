<template>
  <a-card title="消息" :bordered="false">
    <template #extra>
      <a-link>更多</a-link>
    </template>
    <div class="list">
      <section class="list-item" v-for="item in list" :key="item.name">
        <a-avatar :size="40">
          <img src="@/assets/images/avatar.jpg" />
        </a-avatar>
        <div class="info">
          <p>{{ item.name }}</p>
          <p>{{ item.text }}</p>
        </div>
      </section>
    </div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
const list = [
  {
    name: 'Github',
    src: '../../assets/images/home/github.png',
    text: '是一个面向开源及私有软件项目的托管平台。',
    time: '开源君，2021-07-04'
  },
  {
    name: 'Vue',
    src: '../../assets/images/home/vue.png',
    text: '渐进式 JavaScript 框架',
    time: '学不动也要学，2021-07-04'
  },
  {
    name: 'Html5',
    src: '../../assets/images/home/html5.png',
    text: 'HTML5是互联网的下一代标准。',
    time: '撸码也是一种艺术 2021-04-01'
  },
  {
    name: 'Angular',
    src: '../../assets/images/home/angular.png',
    text: '现代 Web 开发平台，百万粉丝热捧。',
    time: '铁粉君 2021-07-04。'
  },
  {
    name: 'React',
    src: '../../assets/images/home/react.png',
    text: '用于构建用户界面的 JavaScript 库。',
    time: '技术牛 2021-07-04。'
  },
  {
    name: 'Js',
    src: '../../assets/images/home/js.png',
    text: '路是走出来的，而不是空想出来的。',
    time: '架构组 2021-07-04'
  }
]
</script>

<style lang="scss" scoped>
body[arco-theme='dark'] {
  .list {
    .list-item {
      border-bottom: 1px solid #333;
    }
  }
}
.list {
  .list-item {
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    .info {
      margin-left: 10px;
      p {
        line-height: 1.5;
        &:first-child {
          font-size: 14px;
          color: var(--color-text-2);
        }
        &:last-child {
          font-size: 12px;
          color: var(--color-text-3);
        }
      }
    }
  }
}
</style>
