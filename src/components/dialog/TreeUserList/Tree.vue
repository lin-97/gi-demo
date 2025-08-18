<template>
  <a-spin :loading="loading" class="gi_full_column">
    <a-input-search class="gi_mb" placeholder="请输入关键词" allow-clear />

    <a-scrollbar style="height: 100%; overflow: auto" outer-style="flex: 1;overflow: hidden">
      <a-tree ref="treeRef" show-line size="mini" :data="(treeData as unknown as TreeNodeData[])"
        :field-names="{ key: 'id', title: 'name' }" @select="select">
      </a-tree>
    </a-scrollbar>
  </a-spin>
</template>

<script lang="ts" setup>
import type { TreeNodeData } from '@arco-design/web-vue'
import { getCateTree } from '@/apis/cate'

const emit = defineEmits<{
  (e: 'node-click'): void
}>()

const treeRef = useTemplateRef('treeRef')
const loading = ref(false)
const treeData = ref<any[]>([])

// 获取分类树
const getTreeData = async () => {
  try {
    loading.value = true
    const res = await getCateTree()
    treeData.value = res.data
    nextTick(() => {
      treeRef.value?.expandAll()
    })
  } finally {
    loading.value = false
  }
}
getTreeData()

const select = () => {
  emit('node-click')
}
</script>

<style lang="scss" scoped></style>
