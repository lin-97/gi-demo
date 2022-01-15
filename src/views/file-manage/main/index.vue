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
        <a-button type="primary">上传文件</a-button>
        <a-button type="primary">批量操作</a-button>
        <a-input-search :style="{ width: '360px' }" placeholder="请输入关键词..." allow-clear search-button>
        </a-input-search>
      </a-space>
      <!-- 右侧区域 -->
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
          <a-button>
            <template #icon>
              <icon-apps />
            </template>
          </a-button>
        </a-tooltip>
      </a-button-group>
    </a-row>

    <!-- 文件列表区域 -->
    <section class="file-wrap">
      <FileCard v-for="i in 100" :key="i"></FileCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import FileCard from './FileCard.vue'
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
    margin-bottom: $margin;
  }
  .file-wrap {
    flex: 1;
    margin-top: $margin;
    overflow: hidden;
    overflow-y: scroll;
    background: var(--color-fill-1);
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
