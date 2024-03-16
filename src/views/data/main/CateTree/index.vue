<template>
  <div class="cate-tree">
    <!-- 搜索框 -->
    <div class="cate-tree__search">
      <a-input allow-clear :maxlength="20" :placeholder="props.placeholder" v-model="inputValue">
        <template #prefix><icon-search /></template>
      </a-input>
    </div>
    <!-- 分类树 -->
    <div class="cate-tree__tree">
      <a-scrollbar style="height: 100%; overflow: auto" outer-style="height: 100%">
        <a-tree
          ref="treeRef"
          show-line
          size="mini"
          :data="(treeData as unknown as TreeNodeData[])"
          :field-names="{ key: 'id' }"
          @select="select"
        >
          <template #title="node">
            <a-trigger
              trigger="contextMenu"
              align-point
              animation-name="slide-dynamic-origin"
              auto-fit-transform-origin
              position="bl"
              scroll-to-close
              v-model:popup-visible="node.popupVisible"
            >
              <div v-if="!node.isEdit" @contextmenu="onContextmenu(node)">{{ node.name }}</div>
              <a-input
                v-else
                ref="inputRef"
                v-model="node.name"
                size="mini"
                placeholder="请填写"
                @blur="onBlur"
              ></a-input>
              <template #content>
                <RightMenu
                  :tree-data="treeData"
                  @on-menu-item-click="onMenuItemClick"
                  @on-tree-node-click="onTreeNodeClick"
                ></RightMenu>
              </template>
            </a-trigger>
          </template>
        </a-tree>
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { Message, Modal } from '@arco-design/web-vue'
import type { TreeInstance, TreeNodeData, InputInstance } from '@arco-design/web-vue'
import { getCateTreeData, type CateItem } from '@/apis'
import { mapTree } from 'xe-utils'
import RightMenu from './RightMenu.vue'
import GiSvgIcon from '@/components/GiSvgIcon/index.vue'
import type { VNode } from 'vue'

interface Props {
  type?: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 1, // 分类
  placeholder: '请输入关键词'
})

interface TreeCateItem extends CateItem {
  icon: (node: TreeCateItem) => VNode
  popupVisible: boolean
  isEdit: boolean
}

const loading = ref(false)
const treeRef = ref<TreeInstance>()
const inputValue = ref('')
const treeData = ref<TreeCateItem[]>([])

const emit = defineEmits<{
  (e: 'node-click'): void
}>()

const select = () => {
  emit('node-click')
}

// 获取分类树
const getCateTree = async () => {
  try {
    loading.value = true
    const res = await getCateTreeData()
    treeData.value = mapTree(res.data, (i) => ({
      ...i,
      popupVisible: false,
      isEdit: false,
      icon: (node: any) => {
        if (node.expanded && !node.isLeaf) return <GiSvgIcon name="file-open" size={16}></GiSvgIcon>
        if (!node.expanded && !node.isLeaf) return <GiSvgIcon name="file-close" size={16}></GiSvgIcon>
        return <GiSvgIcon name="file" size={16}></GiSvgIcon>
      }
    }))
    nextTick(() => {
      treeRef.value?.expandAll()
    })
  } finally {
    loading.value = false
  }
}
getCateTree()

const inputRef = ref<InputInstance>()
// 保存当前右键的节点
const contextmenuNode = ref<TreeCateItem | null>(null)
const onContextmenu = (node: TreeCateItem) => {
  if (contextmenuNode.value?.isEdit !== undefined) {
    contextmenuNode.value.isEdit = false
  }
  contextmenuNode.value = node
}

// 关闭右键菜单弹框
const closeRightMenuPopup = () => {
  if (contextmenuNode.value?.popupVisible) {
    contextmenuNode.value.popupVisible = false
  }
}

// 右键菜单项点击
const onMenuItemClick = (mode: string) => {
  if (mode !== 'move') {
    Message.info(`${mode}-${contextmenuNode.value?.name ?? ''}`)
    closeRightMenuPopup()
  }
  if (mode === 'edit') {
    if (contextmenuNode.value?.isEdit !== undefined) {
      contextmenuNode.value.isEdit = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
  }
  if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: '是否确认删除？',
      hideCancel: false,
      okButtonProps: { status: 'danger' },
      onBeforeOk: () => {
        return new Promise((resolve) => setTimeout(() => resolve(true), 300))
      }
    })
  }
}

// 移动树节点点击
const onTreeNodeClick = (data: CateItem) => {
  Message.info(data.name)
  closeRightMenuPopup()
}

// 输入框脱焦
const onBlur = () => {
  if (contextmenuNode.value?.isEdit) {
    contextmenuNode.value.isEdit = false
  }
  getCateTree()
}
</script>

<style lang="scss" scoped>
:deep(.arco-tree-node-title-text) {
  white-space: nowrap;
}

.cate-tree {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  &__search {
    margin-bottom: 10px;
  }
  &__tree {
    flex: 1;
    overflow: hidden;
    background-color: var(--color-bg-1);
    position: relative;
  }
}
</style>
