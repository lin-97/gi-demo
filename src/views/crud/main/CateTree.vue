<template>
  <div class="cate-tree">
    <!-- 搜索框 -->
    <div class="cate-tree__search">
      <a-input v-model="inputValue" allow-clear :maxlength="20" :placeholder="props.placeholder">
        <template #prefix><icon-search /></template>
      </a-input>
    </div>
    <!-- 分类树 -->
    <div class="cate-tree__tree">
      <a-scrollbar style="height: 100%; overflow: auto" outer-style="height: 100%">
        <a-tree ref="treeRef" show-line size="mini" :data="(treeData as unknown as TreeNodeData[])"
          :field-names="{ key: 'id' }" @select="select">
          <template #title="node">
            <span>{{ node.name }}</span>
          </template>
        </a-tree>
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { TreeNodeData } from '@arco-design/web-vue'
import type { CateTreeItem } from '@/apis/cate'
import { mapTree } from 'xe-utils'
import { getCateTree } from '@/apis/cate'
import { GiSvgIcon } from '@/components/index'

interface Props {
  type?: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 1, // 分类
  placeholder: '请输入关键词'
})

const emit = defineEmits<{
  (e: 'node-click'): void
}>()

interface TreeCateItem extends CateTreeItem {
  icon: (node: TreeCateItem) => VNode
}

const loading = ref(false)
const treeRef = useTemplateRef('treeRef')
const inputValue = ref('')
const treeData = ref<TreeCateItem[]>([])

const select = () => {
  emit('node-click')
}

// 获取分类树
const getTreeData = async () => {
  try {
    loading.value = true
    const res = await getCateTree()
    treeData.value = mapTree(res.data, (i) => ({
      ...i,
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
getTreeData()
</script>

<style lang="scss" scoped>
:deep(.arco-tree-node-title-text) {
  white-space: nowrap;
}

.cate-tree {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;

  &__search {
    margin-bottom: 10px;
  }

  &__tree {
    position: relative;
    flex: 1;
    overflow: hidden;
    background-color: var(--color-bg-1);
  }
}
</style>
