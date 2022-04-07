<template>
  <GiContextMenu ref="menuRef" :event="event" @close="onClose">
    <GiOption width="110" ref="optionRef" style="position: relative">
      <GiOptionItem icon="IconPlusCircle" @click="onClickItem('add')" v-if="showAdd">新增</GiOptionItem>
      <GiOptionItem icon="IconEdit" @click="onClickItem('rename')" v-if="showRename">重命名</GiOptionItem>
      <a-popover
        position="right"
        trigger="click"
        :content-style="{ padding: 0, overflow: 'hidden' }"
        :unmount-on-close="false"
        :popup-visible="showMoveTreePopup"
      >
        <GiOptionItem more icon="IconExport" :active="showMoveTreePopup" @click="onClickItem('move')" v-if="showMove">
          移动
        </GiOptionItem>
        <template #content>
          <section class="move-tree-box" @click.stop>
            <MoveTree :tree-data="treeData" @node-click="moveTreeNodeClick"></MoveTree>
          </section>
        </template>
      </a-popover>
      <GiOptionItem icon="IconDelete" @click="onClickItem('delete')" v-if="showDelete">删除</GiOptionItem>
    </GiOption>
  </GiContextMenu>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import GiContextMenu from '@/components/GiContextMenu.vue'
import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
import MoveTree from '../MoveTree.vue'

const props = defineProps<{
  event: PointerEvent
  fileInfo: File.FileItem
  treeData: any
  onClose: any
  onClick: any
}>()

let menuRef = ref<HTMLInputElement | null>(null)

let showMoveTreePopup = ref<boolean>(false)

let showAdd = computed<boolean>(() => props.fileInfo.id !== '')
let showRename = computed<boolean>(() => props.fileInfo.id !== 'root')
let showMove = computed<boolean>(() => props.fileInfo.id !== 'root')
let showDelete = computed<boolean>(() => props.fileInfo.id !== 'root')

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

const moveTreeNodeClick = () => {
  menuRef.value.onHidden()
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
  z-index: 9999;
}
</style>
