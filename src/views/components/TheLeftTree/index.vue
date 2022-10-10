<template>
  <div class="cate-tree">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <a-input allow-clear :maxlength="20" :placeholder="placeholder" v-model="inputValue">
        <template #prefix><icon-search /></template>
      </a-input>
    </div>
    <!-- 分类树 -->
    <div class="wrap">
      <a-scrollbar style="height: 100%; overflow: auto" outer-style="height: 100%">
        <a-tree
          ref="treeRef"
          show-line
          size="mini"
          :data="treeData"
          :fieldNames="{
            key: 'id'
          }"
          @select="select"
        >
          <template #switcher-icon="node, { checked, selected, expanded }">
            <GiSvgIcon
              class="switcher-icon"
              name="plus-square"
              :size="16"
              v-if="node.children && node.children.length && expanded"
            />
            <GiSvgIcon
              class="switcher-icon"
              name="minus-square"
              :size="16"
              style="transform: rotate(0deg)"
              v-else-if="node.children && node.children.length && !expanded"
            />
            <icon-drive-file :size="16" v-else />
          </template>
          <template #icon="node">
            <GiSvgIcon name="com-file-close" :size="16" v-if="!node.children"></GiSvgIcon>
            <GiSvgIcon name="com-file-open" :size="16" v-else-if="node.children"></GiSvgIcon>
            <GiSvgIcon name="com-file" :size="16" v-else></GiSvgIcon>
          </template>
          <template #title="node">
            <a-trigger
              trigger="contextMenu"
              align-point
              animation-name="slide-dynamic-origin"
              auto-fit-transform-origin
              position="bl"
              update-at-scroll
            >
              <div>{{ node.name }}</div>
              <template #content>
                <GiOption
                  :width="110"
                  style="background-color: var(--color-bg-3); box-shadow: 0 4px 10px rgb(0 0 0 / 10%)"
                >
                  <GiOptionItem icon="IconPlusCircle">新增</GiOptionItem>
                  <GiOptionItem icon="IconEdit">重命名</GiOptionItem>
                  <a-popover
                    position="right"
                    trigger="click"
                    :content-style="{ padding: 0, overflow: 'hidden' }"
                    :unmount-on-close="false"
                  >
                    <GiOptionItem more icon="IconExport"> 移动 </GiOptionItem>
                    <template #content>
                      <a-scrollbar style="height: 100%; overflow: auto" outer-style="width: 260px;height: 500px">
                        <a-tree
                          ref="treeMoveRef"
                          show-line
                          size="mini"
                          :data="treeData[0].children"
                          :fieldNames="{
                            key: 'id',
                            title: 'name'
                          }"
                        >
                          <template #switcher-icon="node, { checked, selected, expanded }">
                            <GiSvgIcon
                              class="switcher-icon"
                              name="plus-square"
                              :size="16"
                              v-if="node.children && node.children.length && expanded"
                            />
                            <GiSvgIcon
                              class="switcher-icon"
                              name="minus-square"
                              :size="16"
                              style="transform: rotate(0deg)"
                              v-else-if="node.children && node.children.length && !expanded"
                            />
                            <icon-drive-file :size="16" v-else />
                          </template>
                          <template #icon="node">
                            <GiSvgIcon name="com-file-close" :size="16" v-if="!node.children"></GiSvgIcon>
                            <GiSvgIcon name="com-file-open" :size="16" v-else-if="node.children"></GiSvgIcon>
                            <GiSvgIcon name="com-file" :size="16" v-else></GiSvgIcon>
                          </template>
                        </a-tree>
                      </a-scrollbar>
                    </template>
                  </a-popover>
                  <GiOptionItem icon="IconDelete">删除</GiOptionItem>
                </GiOption>
              </template>
            </a-trigger>
          </template>
        </a-tree>
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import FileOpenIcon from '@/icons/com-file-open.svg'
import FileCloseIcon from '@/icons/com-file-close.svg'
import FileIcon from '@/icons/com-file.svg'

import { getCateTreeData } from '@/apis'
import type { CateItem } from '@/apis'

const props = defineProps({
  // 分类
  type: {
    type: Number,
    default: 1
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请输入关键词'
  }
})

const loading = ref(false)
const treeRef = ref()
const inputValue = ref('')
const treeData = ref<CateItem[]>([])

const emit = defineEmits(['node-click'])

const select = () => {
  emit('node-click')
}

// 获取分类树
const getCateTree = async () => {
  try {
    loading.value = true
    const res = await getCateTreeData()
    if (res.success) {
      treeData.value = res.data
      nextTick(() => {
        treeRef.value.expandAll()
      })
    }
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

getCateTree()
</script>

<style lang="scss" scoped>
:deep(.arco-tree-node-title-text) {
  white-space: nowrap;
}
// :deep(.arco-scrollbar) {
//   height: 100%;
// }
.switcher-icon {
  fill: var(--color-text-2);
}
.cate-tree {
  flex: 1;
  padding: $padding;
  padding-top: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .search-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  > .wrap {
    flex: 1;
    overflow: hidden;
    background-color: var(--color-bg-2);
    position: relative;
  }
}
</style>
