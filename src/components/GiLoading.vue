<template>
  <div class="gi-loading">
    <div class="wrapper">
      <GiLoadingIcon :type="loadingType"></GiLoadingIcon>
      <span class="loading-text" v-if="loadingText">{{ loadingText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="GiLoading">
import { ref } from 'vue'
import GiLoadingIcon from '@/components/GiLodingIcon/index.vue'

const loadingType = ref('dot')
const loadingText = ref('')

// 设置加载类型
const setLoadingType = (type: string) => {
  loadingType.value = type
}

// 设置加载文本
const setLoadingText = (value: string) => {
  loadingText.value = value
}

defineExpose({
  loadingType,
  loadingText,
  setLoadingType,
  setLoadingText
})
</script>

<style lang="scss" scoped>
body[arco-theme='dark'] {
  .gi-loading {
    background: rgba(0, 0, 0, 0.7);
  }
}
.gi-loading {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  > .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .loading-text {
    margin-top: 16px;
    color: rgb(var(--primary-5));
  }
}
</style>
