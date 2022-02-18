<template>
  <ul class="file-grid">
    <li
      class="file-grid-item"
      v-for="item in props.data"
      :key="item.id"
      @click="handleClickFile(item)"
      @contextmenu="handleContextMenu($event, item)"
    >
      <div class="file-image">
        <FileImg :data="item"></FileImg>
      </div>
      <div class="file-name">{{ getFileName(item) }}</div>

      <!-- 勾选模式 -->
      <section
        class="check-mode"
        :class="{ checked: props.selectedFileIdList.includes(item.id) }"
        v-show="props.isBatchMode"
        @click.stop="handleCheckFile(item)"
      >
        <a-checkbox
          class="checkbox"
          :model-value="props.selectedFileIdList.includes(item.id)"
          @change="handleCheckFile(item)"
        ></a-checkbox>
      </section>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FileImg from './FileImg.vue'

const props = defineProps({
  // 文件数据
  data: {
    type: Array,
    default: () => []
  },
  // 批量模式下选中的文件id数组
  selectedFileIdList: {
    type: Array,
    default: () => []
  },
  // 是否是批量模式
  isBatchMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'check', 'contextmenu'])

// 文件名称带后缀
const getFileName = (item: File.FileItem) => {
  return `${item.name}${item.extendName ? `.${item.extendName}` : ''}`
}

// 点击事件
const handleClickFile = (item: File.FileItem) => {
  emit('click', item)
}

// 选中事件
const handleCheckFile = (item: File.FileItem) => {
  emit('check', item)
}

// 右键事件
const handleContextMenu = (e: Event, item: File.FileItem) => {
  e.preventDefault()
  emit('contextmenu', e, item)
}
</script>

<style lang="scss" scoped>
.file-grid {
  flex: 1;
  margin-top: $margin;
  overflow: hidden;
  overflow-y: scroll;
  background: var(--color-bg-4);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.file-grid-item {
  width: 100px;
  height: 100px;
  // background: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:hover {
    background: var(--color-primary-light-1);
  }
  .file-image {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    .img {
      width: auto;
      height: 100%;
    }
    .svg-img {
      height: 100%;
    }
  }
  .file-name {
    font-size: 12px;
    margin-top: 6px;
    padding: 0 5px;
    text-align: center;
  }
  .check-mode {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 9;
    &.checked {
      background: none;
    }
    .checkbox {
      position: absolute;
      top: 5px;
      left: 5px;
      padding-left: 0;
    }
  }
}
</style>
