<template>
  <a-card title="消息" :bordered="false" size="medium">
    <template #extra>
      <a-link>更多</a-link>
    </template>
    <a-comment v-for="item in list" :key="item.name" :author="item.name" :content="item.text" align="right">
      <template #avatar>
        <a-avatar><img src="https://s1.ax1x.com/2022/07/05/jtMjGq.jpg" /></a-avatar>
      </template>
    </a-comment>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  {
    name: 'Github',
    text: '是一个面向开源及私有软件项目的托管平台',
    time: '开源君，2021-07-04',
    icon: 'item-github'
  },
  {
    name: 'Vue',
    text: '渐进式 JavaScript 框架',
    time: '学不动也要学，2021-07-04',
    icon: 'item-vue'
  },
  {
    name: 'Html5',
    text: 'HTML5是互联网的下一代标准。',
    time: '撸码也是一种艺术 2021-04-01',
    icon: 'item-html5'
  },
  {
    name: 'Angular',
    src: '../../assets/images/home/angular.png',
    text: '现代 Web 开发平台，百万粉丝热捧',
    time: '铁粉君 2021-07-04',
    icon: 'item-angular'
  },
  {
    name: 'React',
    text: '用于构建用户界面的 JavaScript 库',
    time: '技术牛 2021-07-04',
    icon: 'item-react'
  },
  {
    name: 'Js',
    text: '路是走出来的，而不是空想出来的',
    time: '架构组 2021-07-04',
    icon: 'item-js'
  }
]
</script>

<style lang="scss" scoped>
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}
:deep(.arco-comment) {
  border-bottom: 1px solid var(--color-border-1);
  padding-bottom: 10px;
}
:deep(.arco-comment-content) {
  font-size: 12px;
  color: var(--color-text-3);
}
</style>
