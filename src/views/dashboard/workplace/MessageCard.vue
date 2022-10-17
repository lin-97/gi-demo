<template>
  <a-card title="消息" :bordered="false" size="medium">
    <template #extra>
      <a-link>更多</a-link>
    </template>
    <a-comment
      v-for="(item, index) in list"
      :key="item.name"
      :author="item.name"
      :content="item.text"
      align="right"
      :class="'animated-fade-up-' + index"
      style="overflow: hidden"
    >
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
    text: '是一个面向开源及私有软件项目的托管平台'
  },
  {
    name: 'Vue',
    text: '渐进式 JavaScript 框架'
  },
  {
    name: 'Html5',
    text: 'HTML5是互联网的下一代标准'
  },
  {
    name: 'Angular',
    text: '现代 Web 开发平台，百万粉丝热捧'
  },
  {
    name: 'React',
    text: '用于构建用户界面的 JavaScript 库'
  },
  {
    name: 'Js',
    text: '路是走出来的，而不是空想出来的'
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
