<template>
  <div class="file-main">
    <!-- 文件路径 -->
    <FilePath></FilePath>

    <a-row justify="space-between" class="file-main__search">
      <!-- 左侧区域 -->
      <a-space wrap>
        <a-dropdown>
          <a-button type="primary" shape="round">
            <template #icon><icon-upload /></template>
            <template #default>上传</template>
          </a-button>
          <template #content>
            <a-doption>
              <template #icon>
                <GiSvgIcon name="upload-file" />
              </template>
              <span>上传文件</span>
            </a-doption>
            <a-doption>
              <template #icon>
                <GiSvgIcon name="upload-folder" />
              </template>
              <span>上传文件夹</span>
            </a-doption>
          </template>
        </a-dropdown>

        <a-input-group>
          <a-select placeholder="请选择" :trigger-props="{ autoFitPopupMinWidth: true }" style="width: 150px">
            <a-option v-for="item in FILE_TYPE_LIST" :key="item.value">
              <template #icon>
                <component :is="item.icon" size="18" color="#999"></component>
              </template>
              <template #default>{{ item.name }}</template>
            </a-option>
          </a-select>
          <a-input placeholder="请输入关键词..." allow-clear> </a-input>
          <a-button type="primary" @click="search">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
      </a-space>

      <!-- 右侧区域 -->
      <a-space wrap>
        <a-button v-if="isBatchMode" :disabled="!selectedFileIds.length" type="primary" status="danger"
          @click="handleMulDelete">
          <template #icon><icon-delete /></template>
        </a-button>
        <a-button type="primary" @click="isBatchMode = !isBatchMode">
          <template #icon><icon-select-all /></template>
          <template #default>{{ isBatchMode ? '取消批量' : '批量操作' }}</template>
        </a-button>
        <a-button-group>
          <a-tooltip content="传输列表" position="bottom">
            <a-button>
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
            <a-button @click="toggleMode">
              <template #icon>
                <icon-apps v-if="mode === 'grid'" />
                <icon-list v-else />
              </template>
            </a-button>
          </a-tooltip>
        </a-button-group>
      </a-space>
    </a-row>

    <!-- 文件列表-宫格模式 -->
    <a-spin class="file-main__list" :loading="loading">
      <FileGrid v-show="fileList.length && mode === 'grid'" :data="fileList" :is-batch-mode="isBatchMode"
        :selected-file-ids="selectedFileIds" @click="handleClickFile" @select="handleSelectFile"
        @right-menu-click="handleRightMenuClick"></FileGrid>

      <!-- 文件列表-列表模式 -->
      <FileList v-show="fileList.length && mode === 'list'" :data="fileList" :is-batch-mode="isBatchMode"
        :selected-file-ids="selectedFileIds" @click="handleClickFile" @select="handleSelectFile"
        @right-menu-click="handleRightMenuClick"></FileList>

      <a-empty v-show="!fileList.length"></a-empty>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { Message, Modal } from '@arco-design/web-vue'

import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import {
  openFileMoveModal,
  openFileRenameModal,
  previewFileAudioModal,
  previewFileVideoModal
} from '../../components/index'
import useFileManage from './useFileManage'
import FilePath from './FilePath.vue'
import FileGrid from './FileGrid.vue'
import { FILE_TYPE_LIST, IMAGE_TYPES } from '@/constant/file'
import { type FileItem, getFileList } from '@/apis/file'

const FileList = defineAsyncComponent(() => import('./FileList.vue'))

const route = useRoute()
const router = useRouter()
const { mode, selectedFileIds, toggleMode, addSelectedFileItem } = useFileManage()

const loading = ref(false)
// 批量操作
const isBatchMode = ref(false)
// 文件列表数据
const fileList = ref<FileItem[]>([])
const fileType = ref('0')
fileType.value = (route.query.fileType as string) || '0'

const getListData = async () => {
  try {
    loading.value = true
    isBatchMode.value = false
    const res = await getFileList({ fileType: fileType.value })
    fileList.value = res.data.records
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

const search = () => {
  getListData()
}

onMounted(() => {
  getListData()
})

onBeforeRouteUpdate((to) => {
  fileType.value = to.query.fileType as string || '0'
  getListData()
})

// 列表图片集合
const imageList = computed(() => {
  return fileList.value.filter((i) => IMAGE_TYPES.includes(i.extendName)).map((a) => a.src ?? '')
})

// 点击文件
const handleClickFile = (item: FileItem) => {
  Message.success(`点击了文件-${item.name}`)
  if (IMAGE_TYPES.includes(item.extendName)) {
    if (item.src && imageList.value.length) {
      const index = imageList.value.findIndex((i) => i === item.src)
      viewerApi({
        images: imageList.value,
        options: {
          initialViewIndex: index
        }
      })
    }
  }
  if (item.extendName === 'mp4') {
    previewFileVideoModal(item)
  }
  if (item.extendName === 'mp3') {
    previewFileAudioModal(item)
  }
}

// 勾选文件
const handleSelectFile = (item: FileItem) => {
  addSelectedFileItem(item)
}

// 鼠标右键
const handleRightMenuClick = (mode: string, fileInfo: FileItem) => {
  Message.success(`点击了${mode}`)
  if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: '是否删除该文件？',
      hideCancel: false,
      okButtonProps: { status: 'danger' },
      onBeforeOk: async () => {
        return await new Promise((reslove) => setTimeout(() => reslove(true), 300))
      }
    })
  }
  if (mode === 'rename') {
    openFileRenameModal(fileInfo, () => {
      // 文件重命名成功回调处理
    })
  }
  if (mode === 'move') {
    openFileMoveModal(fileInfo, () => {
      // 文件移动成功回调处理
    })
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
  height: 100%;
  background: var(--color-bg-1);
  border-radius: $radius-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__search {
    border-bottom: 1px dashed var(--color-border-3);
    margin: 0 $padding;
  }

  &__list {
    flex: 1;
    padding: 0 $padding $padding;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
