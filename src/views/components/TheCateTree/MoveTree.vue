<template>
  <!-- 移动树 -->
  <ul id="movetree" ref="moveTreeRef" class="ztree move-tree"></ul>
</template>

<script setup lang="ts">
import { reactive, watch, nextTick } from 'vue'
const props = defineProps({
  treeData: {
    type: Array,
    default: () => []
  }
})

let treeObj: object = reactive({})
const treeSetting = reactive({
  callback: {
    // 点击节点
    onClick: (event, treeId, treeNode) => {
      handleNodeClick(event, treeId, treeNode)
    }
  }
})

watch(
  props.treeData,
  () => {
    nextTick(() => {
      treeObj = $.fn.zTree.init($('#movetree'), treeSetting, props.treeData)
      treeObj.expandAll(true)
    })
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['node-click'])
function handleNodeClick(event, treeId, treeNode) {
  emit('node-click', treeNode)
}
</script>

<style lang="scss" scoped></style>
