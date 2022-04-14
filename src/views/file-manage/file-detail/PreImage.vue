<template>
  <div class="pre-image">
    <section class="viewer-box">
      <Viewer class="viewer" ref="viewerRef" :options="options" @inited="inited">
        <img :src="src" class="image" />
      </Viewer>
    </section>

    <a-row justify="space-between">
      <a-space>
        <a-button type="primary" @click="handle('rotateLeft')">
          <template #icon><icon-rotate-left /></template>
        </a-button>
        <a-button type="primary" @click="handle('rotateRight')">
          <template #icon><icon-rotate-right /></template>
        </a-button>
        <a-button type="primary" @click="handle('scaleMinus')">
          <template #icon><icon-minus /></template>
        </a-button>
        <section class="zoom-proportion">{{ zoomProportion }}</section>
        <a-button type="primary" @click="handle('scalePlus')">
          <template #icon><icon-plus /></template>
        </a-button>
      </a-space>

      <a-space>
        <a-button type="primary">
          <template #icon><icon-edit /></template>
        </a-button>
        <a-button type="primary" @click="handle('fullScreen')">
          <template #icon><icon-fullscreen /></template>
        </a-button>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from 'v-viewer'

let src = ref('https://pic.netbian.com/uploads/allimg/210216/191659-1613474219169f.jpg')
// 实例
const viewer = ref(null)
// 缩放比例
let zoomProportion = ref('')

const options = reactive({
  fullscreen: false, // 是否全屏模式
  inline: true, // 是否行内
  toolbar: false, // 是否显示工具栏
  navbar: false, // 是否显示导航栏
  rotatable: true, // 是否能够缩放
  backdrop: true, // 是否显示遮罩背景
  button: true, // 是否显示右上角全屏按钮
  title: false, // 是否显示标题
  zoom: (e) => {
    zoomProportion.value = parseInt(e.detail.ratio * 100) + '%'
  }
})

const inited = (e: any) => {
  viewer.value = e
  setTimeout(() => {
    zoomProportion.value = parseInt(viewer.value.initialImageData.ratio * 100) + '%'
  }, 100)
}

const handle = (value: string) => {
  if (!viewer.value) return
  if (value === 'rotateLeft') {
    return viewer.value.rotate(-90)
  }
  if (value === 'rotateRight') {
    return viewer.value.rotate(90)
  }
  if (value === 'scalePlus') {
    return viewer.value.zoom(0.1)
  }
  if (value === 'scaleMinus') {
    return viewer.value.zoom(-0.1)
  }
  if (value === 'fullScreen') {
    return viewer.value.full()
  }
}
</script>

<style lang="scss" scoped>
:deep(.viewer) {
  img {
    display: none;
  }
}
:deep(.viewer-container:not(.viewer-fixed)) {
  background: none;
}
.pre-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .viewer-box {
    flex: 1;
    margin-bottom: 20px;
  }
  .zoom-proportion {
    padding: 0 12px;
    height: 28px;
    background-color: var(--color-fill-3);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-2);
  }
}
</style>
