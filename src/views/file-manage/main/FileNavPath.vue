<template>
  <div class="file-nav-path">
    <a-input ref="inputRef" v-show="isShowInput" placeholder="请输入路径" allow-clear @blur="onBlur" />

    <section @click="onNavBar">
      <a-breadcrumb v-show="!isShowInput">
        <a-breadcrumb-item>全部</a-breadcrumb-item>
        <a-breadcrumb-item>文件夹1</a-breadcrumb-item>
        <a-breadcrumb-item>分类</a-breadcrumb-item>
      </a-breadcrumb>
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue-demi'

let isShowInput = ref(false)
let inputRef = ref(null)

const onNavBar = () => {
  isShowInput.value = true
  nextTick(() => {
    inputRef.focus()
  })
}

const onBlur = () => {
  isShowInput.value = false
}
</script>

<style lang="scss" scoped>
.file-nav-path {
  margin-bottom: 20px;
}
</style>
