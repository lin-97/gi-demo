<template>
  <GiContextMenu ref="menuRef" :axis="axis" @close="onClose">
    <GiOption width="110" ref="optionRef" style="position: relative">
      <GiOptionItem icon="IconPlusCircle" @click="onClickItem('add')">新增</GiOptionItem>
      <GiOptionItem icon="IconEdit" @click="onClickItem('rename')">重命名</GiOptionItem>
      <a-popover
        position="right"
        trigger="click"
        :content-style="{ padding: 0, overflow: 'hidden' }"
        :unmount-on-close="false"
        :popup-visible="showMoveTreePopup"
      >
        <GiOptionItem more icon="IconExport" :active="showMoveTreePopup" @click="onClickItem('move')">
          移动
        </GiOptionItem>
        <template #content>
          <section class="move-tree-box">
            <MoveTree :tree-data="treeData"></MoveTree>
          </section>
        </template>
      </a-popover>
      <GiOptionItem icon="IconDelete" @click="onClickItem('delete')">删除</GiOptionItem>
    </GiOption>
  </GiContextMenu>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import GiContextMenu from '@/components/GiContextMenu.vue'
import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
import MoveTree from '../MoveTree.vue'

const props = defineProps({
  axis: Object,
  fileInfo: Object,
  treeData: Array,
  onClose: Function,
  onClick: Function
})

let menuRef = ref<HTMLInputElement | null>(null)

let showMoveTreePopup = ref<boolean>(false)

const onClose = () => {
  showMoveTreePopup.value = false
  props.onClose()
}

const onClickItem = (mode: string) => {
  if (mode === 'move') {
    showMoveTreePopup.value = !showMoveTreePopup.value
    return false
  }
  nextTick(() => {
    props.onClick(mode)
    menuRef.value.onHidden()
  })
}

defineExpose({
  menuRef,
  showMoveTreePopup,
  onClose,
  onClickItem
})
</script>

<style lang="scss" scoped>
.move-tree-box {
  width: 250px;
  min-height: 200px;
  max-height: 500px;
  overflow: scroll;
}
</style>
