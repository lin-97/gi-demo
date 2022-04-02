<template>
  <GiContextMenu ref="menuRef" :event="event" @close="onClose">
    <GiOption>
      <GiOptionItem @click="handleClickMenuItem('rename')">
        <template #icon><GiSvgIcon name="menu-edit"></GiSvgIcon> </template>
        <span>重命名</span>
      </GiOptionItem>
      <GiOptionItem @click="handleClickMenuItem('move')">
        <template #icon><GiSvgIcon name="menu-move"></GiSvgIcon> </template>
        <span>移动到</span>
      </GiOptionItem>
      <GiOptionItem @click="handleClickMenuItem('download')">
        <template #icon><GiSvgIcon name="menu-download"></GiSvgIcon> </template>
        <span>下载</span>
      </GiOptionItem>
      <a-popover
        position="right"
        :content-style="{ padding: 0, overflow: 'hidden', width: '150px' }"
        :arrow-style="{ display: 'none' }"
        :popup-visible="showZipPopover"
      >
        <GiOptionItem more @click="handleClickMenuItem('zip')" v-if="fileInfo.extendName === 'zip'">
          <template #icon><GiSvgIcon name="menu-zip"></GiSvgIcon> </template>
          <span>解压</span>
        </GiOptionItem>
        <template #content>
          <GiOption>
            <GiOptionItem @click="handleClickMenuItem('zip1')">
              <template #icon><GiSvgIcon name="file-rar"></GiSvgIcon> </template>
              <span>解压到当前目录</span>
            </GiOptionItem>
            <GiOptionItem @click="handleClickMenuItem('zip2')">
              <template #icon><GiSvgIcon name="file-rar"></GiSvgIcon> </template>
              <span>解压到其他目录</span>
            </GiOptionItem>
          </GiOption>
        </template>
      </a-popover>
      <GiOptionItem @click="handleClickMenuItem('delete')">
        <template #icon><GiSvgIcon name="menu-delete"></GiSvgIcon> </template>
        <span>删除</span>
      </GiOptionItem>
    </GiOption>
  </GiContextMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GiContextMenu from '@/components/GiContextMenu.vue'
import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
import GiSvgIcon from '@/components/GiSvgIcon.vue'

const props = defineProps<{
  event: PointerEvent
  fileInfo: File.FileItem
  onClick: any
  onClose: any
}>()

let menuRef = ref<HTMLInputElement | null>(null)
let showZipPopover = ref<boolean>(false)

const onClose = () => {
  showZipPopover.value = false
  props.onClose()
}

// 点击菜单项
const handleClickMenuItem = (mode: string) => {
  if (mode === 'zip') {
    showZipPopover.value = !showZipPopover.value
    return false
  }
  props.onClick(mode)
}

defineExpose({
  menuRef,
  handleClickMenuItem
})
</script>

<style lang="scss" scoped></style>
