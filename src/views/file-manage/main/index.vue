<template>
  <div class="file-manage">
    <!-- 面包屑导航 -->
    <div class="nav-path">
      <a-breadcrumb>
        <a-breadcrumb-item>全部</a-breadcrumb-item>
        <a-breadcrumb-item>文件夹1</a-breadcrumb-item>
        <a-breadcrumb-item>分类</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <a-row justify="space-between">
      <!-- 左侧区域 -->
      <a-space>
        <a-dropdown>
          <a-button type="primary"><icon-upload /> 上传</a-button>
          <template #content>
            <a-doption>上传文件</a-doption>
            <a-doption>上传文件夹</a-doption>
          </template>
        </a-dropdown>

        <a-button type="primary" :status="isBatchMode ? 'warning' : ''" @click="isBatchMode = !isBatchMode"
          ><icon-select-all /> {{ isBatchMode ? '取消批量操作' : '批量操作' }}</a-button
        >
        <a-input-group>
          <a-select style="width: 120px" placeholder="请选择...">
            <a-option v-for="item in fileTypeList" :key="item.value">
              <component :is="item.icon" size="18" style="color: #bbb; margin-right: 5px"></component>{{ item.name }}
            </a-option>
          </a-select>
          <a-input-search :style="{ width: '360px' }" placeholder="请输入关键词..." allow-clear search-button>
            <template #append>
              <a-button type="primary"
                ><template #icon><icon-search /></template>查询</a-button
              >
            </template>
          </a-input-search>
        </a-input-group>
      </a-space>
      <!-- 右侧区域 -->
      <a-space>
        <a-button v-if="isBatchMode" type="primary" status="danger"
          ><template #icon><icon-delete /></template
        ></a-button>
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
            <a-button @click="fileStore.changeViewMode(fileStore.viewMode == 1 ? 2 : 1)">
              <template #icon>
                <icon-apps v-if="fileStore.viewMode == 1" />
                <icon-list v-else />
              </template>
            </a-button>
          </a-tooltip>
        </a-button-group>
      </a-space>
    </a-row>

    <!-- 文件列表-宫格模式 -->
    <section class="file-wrap" v-if="fileStore.viewMode == 1">
      <FileCard
        v-for="item in fileList"
        :key="item.id"
        :data="item"
        :check-mode="isBatchMode"
        :checked="fileStore.selectedFileIdList.includes(item.id)"
        @click="handleClickFile(item)"
        @check="handleCheckFile(item)"
      ></FileCard>
    </section>

    <!-- 文件列表-列表模式 -->
    <FileList :data="fileList" v-if="fileStore.viewMode == 2"></FileList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileCard from './FileCard.vue'
import FileList from './FileList.vue'
import fileData from './filedata'
import { Message } from '@arco-design/web-vue'
import { fileTypeList } from '@/libs/file-map'
import { useFileStore } from '@/store/file'

const fileStore = useFileStore()

let fileList = ref([])
fileList.value = fileData

// 批量操作
let isBatchMode = ref(false)

// 点击文件
const handleClickFile = (item) => {
  Message.success(`点击了文件-${item.name}`)
}

// 勾选文件
const handleCheckFile = (item) => {
  fileStore.addSelectedFileItem(item)
}
</script>

<style lang="scss" scoped>
.file-manage {
  flex: 1;
  background: var(--color-bg-2);
  margin: $margin;
  padding: $padding;
  border-radius: $box-radius;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .nav-path {
    margin-bottom: 20px;
  }
  .file-wrap {
    flex: 1;
    margin-top: $margin;
    overflow: hidden;
    overflow-y: scroll;
    background: var(--color-bg-4);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
}
</style>
