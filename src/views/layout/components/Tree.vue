<template>
  <a-card class="gi_card" :header-style="{ display: 'none' }" style="flex: 1;">
    <a-spin :loading="loading">
      <a-scrollbar style="height: 100%; overflow: auto" outer-style="height: 100%">
        <a-tree ref="treeRef" show-line size="mini" :data="(treeData as unknown as TreeNodeData[])"
          :field-names="{ key: 'id', title: 'name' }" @select="select">
        </a-tree>
      </a-scrollbar>
    </a-spin>
  </a-card>
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

<style lang="scss" scoped>
:deep(.arco-spin) {
  height: 100%;
}
</style>
