<template>
  <a-card title="项目" :bordered="false" size="medium" style="overflow: hidden">
    <a-card-grid :style="{ width: '33.33%' }" v-for="(item, index) in list" :key="item.name" class="card-grid-item">
      <a-card :bordered="false" hoverable :class="'animated-fade-up-' + index">
        <div class="head">
          <GiSvgIcon :size="30" :name="item.icon"></GiSvgIcon>
          <span>{{ item.name }}</span>
        </div>
        <p class="text">{{ item.text }}</p>
        <p class="desc">{{ item.time }}</p>
      </a-card>
    </a-card-grid>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  {
    name: 'Github',
    text: '是一个面向开源及私有软件项目的托管平台',
    time: '开源君 2021-07-04',
    icon: 'item-github'
  },
  {
    name: 'Vue',
    text: '渐进式 JavaScript 框架',
    time: '学不动也要学 2021-07-04',
    icon: 'item-vue'
  },
  {
    name: 'Html5',
    text: 'HTML5是互联网的下一代标准',
    time: '撸码也是一种艺术 2021-04-01',
    icon: 'item-html5'
  },
  {
    name: 'Angular',
    src: '../../assets/images/home/angular.png',
    text: '现代 Web 开发平台 百万粉丝热捧',
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
    text: '路是走出来的 而不是空想出来的',
    time: '架构组 2021-07-04',
    icon: 'item-js'
  }
]
</script>

<style lang="scss" scoped>
:deep(.arco-card-header) {
  border: none;
}
.head {
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: var(--color-text-2);
  }
}
.text {
  margin-top: 10px;
  line-height: 1.4;
  height: 50px;
  color: var(--color-text-3);
}
.desc {
  font-size: 12px;
  color: var(--color-text-3);
}
</style>
