<template>
  <a-space :size="14" direction="vertical">
    <a-button type="primary" @click="click">点击</a-button>

    <a-alert>一个简易的移动端模态框，适用在原生开发的移动端使用</a-alert>
  </a-space>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
import $com from './com'

const click = () => {
  $com
    .diaglog({
      title: '标题',
      content: '这是一个原生模态框'
    })
    .then((res) => {
      if (res === 'cancel') {
        Message.info('点击了取消')
      }
      if (res === 'confirm') {
        Message.info('点击了确定')
      }
    })
}
</script>

<style lang="scss" scoped></style>
