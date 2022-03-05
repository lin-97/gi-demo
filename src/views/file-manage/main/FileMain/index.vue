<template>
  <div class="file-main">
    <!-- 面包屑导航 -->
    <FileNavPath></FileNavPath>

    <a-row justify="space-between" class="row-operate">
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
            ><icon-select-all /> {{ isBatchMode ? '取消批量' : '批量操作' }}</a-button
          >
        </a-space>
        <a-input-group>
          <a-select style="width: 120px" placeholder="请选择">
            <a-option v-for="item in fileTypeList" :key="item.value">
              <template #icon>
                <component :is="item.icon" size="18" color="#bbb"></component>
              </template>
              <template #default>{{ item.name }}</template>
            </a-option>
          </a-select>
          <a-input-search :style="{ width: '100%' }" placeholder="请输入关键词..." allow-clear search-button>
            <template #button-icon>
              <icon-search />
            </template>
            <template #button-default>查询 </template>
          </a-input-search>
        </a-input-group>
      </a-space>
      <!-- 右侧区域 -->
      <a-space v-if="width > 715">
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
            <a-button>
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
    <section class="file-wrap" v-loading:[loadingText]="showLoading">
      <template v-if="fileStore.viewMode == 'grid'">
        <FileGrid
          :data="fileList"
          :isBatchMode="isBatchMode"
          :selectedFileIdList="fileStore.selectedFileIdList"
          @click="handleClickFile"
          @check="handleCheckFile"
          @contextmenu="handleContextMenu"
        ></FileGrid>
      </template>

      <template v-else>
        <!-- 文件列表-列表模式 -->
        <FileList
          :data="fileList"
          :isBatchMode="isBatchMode"
          @click="handleClickFile"
          @contextmenu="handleContextMenu"
        ></FileList>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import { fileTypeList, imageTypeList } from '@/libs/file-map'
import { useFileStore } from '@/store'
import { useWindowSize } from '@vueuse/core'
import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import FileNavPath from './FileNavPath.vue'
import FileGrid from './FileGrid.vue'
import FileList from './FileList.vue'
import FileContextMenu from './FileContextMenu/index'
import ThePreviewVideo from '@/views/components/ThePreviewVideo/index'
import ThePreviewAudio from '@/views/components/ThePreviewAudio/index'
import TheFileRename from '@/views/components/TheFileRename/index'
import TheFileMove from '@/views/components/TheFileMove/index'
import fileData from './filedata'

const { width } = useWindowSize()
const fileStore = useFileStore()

let loadingText = ref<string>('等待中...')
let showLoading = ref<boolean>(false)

// 文件列表数据
let fileList = ref<File.FileItem[]>([])
fileList.value = fileData

// 批量操作
let isBatchMode = ref<boolean>(false)

// 点击文件
const handleClickFile = (item: File.FileItem) => {
  Message.success(`点击了文件-${item.name}`)
  if (imageTypeList.includes(item.extendName)) {
    if (item.src) {
      viewerApi({
        images: [item.src]
      })
    }
  }
  if (item.extendName === 'mp4') {
    ThePreviewVideo(item)
  }
  if (item.extendName === 'mp3') {
    ThePreviewAudio(item)
  }
}

// 勾选文件
const handleCheckFile = (item: File.FileItem) => {
  fileStore.addSelectedFileItem(item)
}

interface FileItem extends File.FileItem {
  mode: string
}

// 鼠标右键
const handleContextMenu = (e: Event, fileItem: File.FileItem) => {
  FileContextMenu(e, fileItem).then((res: any) => {
    Message.success('点击了' + res.mode)
    if (res.mode === 'delete') {
      Modal.warning({
        title: '提示',
        content: '是否删除该文件？',
        hideCancel: false
      })
    }
    if (res.mode === 'rename') {
      TheFileRename(fileItem)
    }
    if (res.mode === 'move') {
      TheFileMove(fileItem)
    }
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
  border-radius: $box-radius;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .row-operate {
    border-bottom: 1px solid var(--color-border);
    margin: 0 $padding;
    padding-bottom: $padding;
  }
  .file-wrap {
    flex: 1;
    padding: 0 $padding $padding;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
