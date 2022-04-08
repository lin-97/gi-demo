<template>
  <ul class="file-grid">
    <a-trigger
      trigger="contextMenu"
      align-point
      v-for="item in newData"
      :key="item.id"
      animation-name="slide-dynamic-origin"
      position="bl"
      v-model:popup-visible="item.visible"
    >
      <li class="file-grid-item" @click.stop="handleClickFile(item)" @contextmenu="handleContextMenu($event, item)">
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
      <template #content>
        <GiOption class="option">
          <GiOptionItem @click="item.visible = false">
            <template #icon><GiSvgIcon name="menu-edit"></GiSvgIcon> </template>
            <span>重命名</span>
          </GiOptionItem>
          <GiOptionItem>
            <template #icon><GiSvgIcon name="menu-move"></GiSvgIcon> </template>
            <span>移动到</span>
          </GiOptionItem>
          <GiOptionItem>
            <template #icon><GiSvgIcon name="menu-download"></GiSvgIcon> </template>
            <span>下载</span>
          </GiOptionItem>
          <a-popover
            position="right"
            :content-style="{ padding: 0, overflow: 'hidden', width: '150px' }"
            :arrow-style="{ display: 'none' }"
          >
            <GiOptionItem more>
              <template #icon><GiSvgIcon name="menu-zip"></GiSvgIcon> </template>
              <span>解压</span>
            </GiOptionItem>
            <template #content>
              <GiOption>
                <GiOptionItem>
                  <template #icon><GiSvgIcon name="file-rar"></GiSvgIcon> </template>
                  <span>解压到当前目录</span>
                </GiOptionItem>
                <GiOptionItem>
                  <template #icon><GiSvgIcon name="file-rar"></GiSvgIcon> </template>
                  <span>解压到其他目录</span>
                </GiOptionItem>
              </GiOption>
            </template>
          </a-popover>
          <GiOptionItem>
            <template #icon><GiSvgIcon name="menu-delete"></GiSvgIcon> </template>
            <span>删除</span>
          </GiOptionItem>
        </GiOption>
      </template>
    </a-trigger>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
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

let visible = ref(false)

const newData = ref([])
props.data.forEach((i) => {
  newData.value.push({ ...i, visible: false })
})

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
  // emit('contextmenu', e, item)
}
</script>

<style lang="scss" scoped>
.option {
  background: rgba(0, 0, 0, 0.5);
  :deep(.gi-option-item) {
    color: #fff;
  }
}

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
  &:active {
    svg,
    img {
      transform: scale(0.9);
    }
  }
  .file-image {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    .img {
      width: auto;
      height: 100%;
      transition: all 0.3s;
    }
    .svg-img {
      height: 100%;
      transition: all 0.3s;
    }
  }
  .file-name {
    height: 2em;
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
