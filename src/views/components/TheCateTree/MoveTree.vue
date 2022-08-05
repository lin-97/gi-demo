<template>
  <!-- 移动树 -->
  <ul id="movetree" ref="moveTreeRef" class="ztree move-tree"></ul>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'

const props = defineProps({
  treeData: {
    type: Array,
    default: () => []
  }
})

const treeObj = ref<ZTree.IzTreeObj | null>(null)
const treeSetting = reactive({
  callback: {
    // 点击节点
    onClick: (event: PointerEvent, treeId: string, treeNode: ZTree.ITreeNode) => {
      handleNodeClick(event, treeId, treeNode)
    }
  }
})

watch(
  props.treeData,
  () => {
    nextTick(() => {
      treeObj.value = $.fn.zTree.init($('#movetree'), treeSetting, props.treeData)
      treeObj.value?.expandAll(true)
    })
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['node-click'])

function handleNodeClick(event: PointerEvent, treeId: string, treeNode: ZTree.ITreeNode) {
  emit('node-click', treeNode)
}
</script>

<style lang="scss" scoped></style>
