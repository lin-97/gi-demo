<template>
  <div class="file-main">
    <!-- 面包屑导航 -->
    <FileNavPath></FileNavPath>

    <a-row justify="space-between">
      <!-- 左侧区域 -->
      <a-space :direction="width < 1280 ? 'vertical' : 'horizontal'">
        <a-space>
          <a-dropdown>
            <a-button type="primary"><icon-upload /> 上传</a-button>
            <template #content>
              <a-doption>上传文件</a-doption>
              <a-doption>上传文件夹</a-doption>
            </template>
          </a-dropdown>

          <a-button type="primary" @click="isBatchMode = !isBatchMode"
            ><icon-select-all /> {{ isBatchMode ? '取消批量操作' : '批量操作' }}</a-button
          >
        </a-space>
        <a-input-group>
          <a-select style="width: 120px" placeholder="请选择...">
            <a-option v-for="item in fileTypeList" :key="item.value">
              <component :is="item.icon" size="18" style="color: #bbb; margin-right: 5px"></component>{{ item.name }}
            </a-option>
          </a-select>
          <a-input-search :style="{ width: '360px' }" placeholder="请输入关键词..." allow-clear search-button>
            <template #button-icon>
              <icon-search />
            </template>
            <template #button-default> 查询 </template>
          </a-input-search>
        </a-input-group>
      </a-space>
      <!-- 右侧区域 -->
      <a-space>
        <a-button
          v-if="isBatchMode"
          :disabled="!fileStore.selectedFileIdList.length"
          type="primary"
          status="danger"
          @click="handleMulDelete"
          ><template #icon><icon-delete /></template
        ></a-button>
        <a-button-group>
          <a-tooltip content="传输列表" position="bottom">
            <a-button @click="showLoading = !showLoading">
              <template #icon>
                <icon-swap />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="排序" position="bottom">
            <a-button @click="handleFilter">
              <template #icon>
                <icon-filter />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="视图" position="bottom">
            <a-button @click="fileStore.changeViewMode">
              <template #icon>
                <icon-apps v-if="fileStore.viewMode === 'grid'" />
                <icon-list v-else />
              </template>
            </a-button>
          </a-tooltip>
        </a-button-group>
      </a-space>
    </a-row>

    <!-- 文件列表-宫格模式 -->
    <section class="file-wrap" v-if="fileStore.viewMode == 'grid'" v-loading:[loadingText]="showLoading">
      <FileCard
        v-for="item in fileList"
        :key="item.id"
        :data="item"
        :check-mode="isBatchMode"
        :checked="fileStore.selectedFileIdList.includes(item.id)"
        @click="handleClickFile(item)"
        @check="handleCheckFile(item)"
        @contextmenu="handleContextMenu"
      ></FileCard>
    </section>

    <!-- 文件列表-列表模式 -->
    <FileList
      :data="fileList"
      v-if="fileStore.viewMode == 'list'"
      @click="handleClickFile"
      @contextmenu="handleContextMenu"
    ></FileList>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import { fileTypeList, imageTypeList } from '@/libs/file-map'
import { useFileStore } from '@/store'
import { useWindowSize } from '@vueuse/core'
import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import FileNavPath from './FileNavPath.vue'
import FileCard from './FileCard.vue'
import FileList from './FileList.vue'
import FileContextMenu from './FileContextMenu/index'
import ThePreviewVideo from '@/views/components/ThePreviewVideo/index.ts'
import ThePreviewAudio from '@/views/components/ThePreviewAudio/index.ts'
import fileData from './filedata'

const { width } = useWindowSize()
const fileStore = useFileStore()

let loadingText = ref<string>('等待中...')
let showLoading = ref<boolean>(false)

// 文件列表数据
let fileList = ref([])
fileList.value = fileData

// 批量操作
let isBatchMode = ref<boolean>(false)

// 点击文件
const handleClickFile = (item) => {
  Message.success(`点击了文件-${item.name}`)
  if (imageTypeList.includes(item.extendName)) {
    viewerApi({
      images: [item.src]
    })
  }
  if (item.extendName === 'mp4') {
    ThePreviewVideo().then((res) => {})
  }
  if (item.extendName === 'mp3') {
    ThePreviewAudio().then((res) => {})
  }
}

// 勾选文件
const handleCheckFile = (item) => {
  fileStore.addSelectedFileItem(item)
}

// 鼠标右键
const handleContextMenu = (e, fileItem) => {
  FileContextMenu(e, fileItem).then((res) => {
    Message.success('点击了' + res.mode)
  })
}

// 批量删除
const handleMulDelete = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false
  })
}
</script>

<style lang="scss" scoped>
.file-main {
  flex: 1;
  background: var(--color-bg-2);
  margin: $margin;
  padding: $padding;
  border-radius: $box-radius;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .file-wrap {
    flex: 1;
    margin-top: $margin;
    overflow: hidden;
    overflow-y: scroll;
    background: var(--color-bg-5);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
}
</style>
