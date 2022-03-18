<template>
  <transition name="slide-dynamic-origin">
    <div v-show="showContentMenu" class="wrap file-context-menu" ref="contextMenuRef" :style="contentMenuStyle">
      <GiOption>
        <GiOptionItem @click="handleClickMenuItem('rename')">
          <template #icon><GiSvgIcon name="menu-edit"></GiSvgIcon> </template>
          重命名
        </GiOptionItem>
        <GiOptionItem @click="handleClickMenuItem('move')">
          <template #icon><GiSvgIcon name="menu-move"></GiSvgIcon> </template>
          移动到
        </GiOptionItem>
        <!-- <OptionItem icon="menu-copy" @click="handleClickMenuItem('copy')">复制到</OptionItem> -->
        <GiOptionItem @click="handleClickMenuItem('download')">
          <template #icon><GiSvgIcon name="menu-download"></GiSvgIcon> </template>
          下载
        </GiOptionItem>
        <a-popover
          position="right"
          :content-style="{ padding: 0, overflow: 'hidden' }"
          :arrow-style="{ display: 'none' }"
        >
          <GiOptionItem more @click="handleClickMenuItem('zip')" v-if="fileInfo.extendName === 'zip'">
            <template #icon><GiSvgIcon name="menu-zip"></GiSvgIcon> </template>
            解压
          </GiOptionItem>
          <template #content>
            <GiOption>
              <GiOptionItem @click="handleClickMenuItem('zip1')">
                <template #icon><GiSvgIcon name="file-rar"></GiSvgIcon> </template>
                解压1
              </GiOptionItem>
              <GiOptionItem @click="handleClickMenuItem('zip2')">
                <template #icon><GiSvgIcon name="file-rar"></GiSvgIcon> </template>
                解压2
              </GiOptionItem>
            </GiOption>
          </template>
        </a-popover>
        <GiOptionItem @click="handleClickMenuItem('delete')">
          <template #icon><GiSvgIcon name="menu-delete"></GiSvgIcon> </template>
          删除
        </GiOptionItem>
      </GiOption>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch, reactive } from 'vue'
import { onClickOutside, useWindowSize } from '@vueuse/core'
import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
import GiSvgIcon from '@/components/GiSvgIcon.vue'

const props = defineProps({
  axis: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  },
  fileInfo: Object,
  onClick: Function,
  onClose: Function
})

let showContentMenu = ref<boolean>(false)
let contentMenuStyle = ref<object>({})
let contentMenuWidth = ref<number>(0)
let contentMenuHeight = ref<number>(0)
let contextMenuRef = ref<HTMLInputElement | null>(null)

const getStyle = () => {
  const obj: any = {}
  // console.log('props.axis.x', props.axis.x)
  // console.log('props.axis.y', props.axis.y)
  // console.log('window.innerWidth', window.innerWidth)
  // console.log('window.innerHeight', window.innerHeight)
  // console.log('contentMenuWidth', contentMenuWidth.value)
  // console.log('contentMenuHeight', contentMenuHeight.value)

  if (props.axis.x > window.innerWidth - contentMenuWidth.value) {
    obj.right = window.innerWidth - props.axis.x + 'px'
  } else {
    obj.left = props.axis.x + 2 + 'px'
  }
  if (props.axis.y > window.innerHeight - contentMenuHeight.value) {
    obj.bottom = window.innerHeight - props.axis.y + 'px'
    obj['transform-origin'] = 'center bottom'
  } else {
    obj.top = props.axis.y + 2 + 'px'
    obj['transform-origin'] = 'center top'
  }
  obj['z-index'] = 1000
  contentMenuStyle.value = obj
}

// 检测在一个元素之外的任何点击
onClickOutside(contextMenuRef, () => {
  showContentMenu.value = false
  props.onClose()
})

// 点击菜单项
const handleClickMenuItem = (item: File.FileItem) => {
  showContentMenu.value = false
  props.onClick(item)
}

// 窗口尺寸变化关闭
const windowSize = reactive(useWindowSize())
watch(
  () => [windowSize.width, windowSize.height],
  () => {
    showContentMenu.value = false
    props.onClose()
  }
)

onMounted(() => {
  setTimeout(() => {
    showContentMenu.value = true
    nextTick(() => {
      contentMenuWidth.value = contextMenuRef.value.offsetWidth
      contentMenuHeight.value = contextMenuRef.value.offsetHeight
      getStyle()
    })
  }, 100)
})

defineExpose({
  showContentMenu,
  contentMenuStyle,
  contextMenuRef,
  handleClickMenuItem
})
</script>

<style lang="scss" scoped>
.wrap {
  width: 120px;
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border-2);
  background: var(--color-bg-3);
  z-index: 999;
  color: var(--color-text-2);
}
</style>
