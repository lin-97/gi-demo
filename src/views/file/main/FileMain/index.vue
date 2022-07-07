<template>
  <div class="file-main">
    <!-- 面包屑导航 -->
    <FileNavPath></FileNavPath>

    <a-row justify="space-between" class="row-operate">
      <!-- 左侧区域 -->
      <a-space>
        <a-dropdown>
          <a-button type="primary" shape="round">
            <template #icon><icon-upload /></template>
            <template #default>上传</template>
          </a-button>
          <template #content>
            <a-doption>上传文件</a-doption>
            <a-doption>上传文件夹</a-doption>
          </template>
        </a-dropdown>

        <a-input-group>
          <a-select style="width: 150px" placeholder="请选择">
            <a-option v-for="item in fileTypeList" :key="item.value">
              <template #icon>
                <component :is="item.icon" size="18" color="#999"></component>
              </template>
              <template #default>{{ item.name }}</template>
            </a-option>
          </a-select>
          <a-input placeholder="请输入关键词..." allow-clear> </a-input>
          <a-button type="primary">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
      </a-space>

      <!-- 右侧区域 -->
      <a-space v-if="windowWidth > 715">
        <a-button
          v-if="isBatchMode"
          :disabled="!fileStore.selectedFileIdList.length"
          type="primary"
          status="danger"
          @click="handleMulDelete"
          ><template #icon><icon-delete /></template
        ></a-button>
        <a-button type="primary" @click="isBatchMode = !isBatchMode">
          <template #icon><icon-select-all /></template>
          <template #default>{{ isBatchMode ? '取消批量' : '批量操作' }}</template>
        </a-button>
        <a-button-group>
          <a-tooltip content="传输列表" position="bottom">
            <a-button @click="loading = !loading">
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
    <section class="file-wrap" v-loading:[loadingText]="loading">
      <template v-if="fileStore.viewMode == 'grid'">
        <FileGrid
          :data="fileList"
          :isBatchMode="isBatchMode"
          :selectedFileIdList="fileStore.selectedFileIdList"
          @click="handleClickFile"
          @check="handleCheckFile"
          @right-menu-click="handleRightMenuClick"
        ></FileGrid>
      </template>

      <template v-else>
        <!-- 文件列表-列表模式 -->
        <FileList
          :data="fileList"
          :isBatchMode="isBatchMode"
          @click="handleClickFile"
          @right-menu-click="handleRightMenuClick"
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
import ThePreviewVideo from '@/views/components/ThePreviewVideo/index'
import ThePreviewAudio from '@/views/components/ThePreviewAudio/index'
import TheFileRename from '@/views/components/TheFileRename/index'
import TheFileMove from '@/views/components/TheFileMove/index'
import fileData from './filedata'
import { useRouter } from 'vue-router'
import type { FileItem } from '@/apis/file'
const router = useRouter()

const { width: windowWidth } = useWindowSize()
const fileStore = useFileStore()

const loading = ref(false)

// 文件列表数据
const fileList = ref<FileItem[]>([])
fileList.value = fileData

// 批量操作
const isBatchMode = ref(false)

// 点击文件
const handleClickFile = (item: FileItem) => {
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
const handleCheckFile = (item: FileItem) => {
  fileStore.addSelectedFileItem(item)
}
// 鼠标右键
const handleRightMenuClick = (mode: string, fileInfo: FileItem) => {
  Message.success('点击了' + mode)
  if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: '是否删除该文件？',
      hideCancel: false
    })
  }
  if (mode === 'rename') {
    TheFileRename(fileInfo)
  }
  if (mode === 'move') {
    TheFileMove(fileInfo)
  }
  if (mode === 'detail') {
    router.push({ path: '/file/detail' })
  }
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
    border-bottom: 1px dashed var(--color-border-3);
    margin: 0 $padding;
    padding-bottom: 12px;
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
