<template>
  <transition name="slide-dynamic-origin">
    <div v-show="showContentMenu" class="wrap file-context-menu" ref="contentMenuRef" :style="contentMenuStyle">
      <Option>
        <OptionItem icon="icon-edit" @click="handleClickMenuItem('edit')">编辑</OptionItem>
        <OptionItem icon="icon-delete" @click="handleClickMenuItem('delete')">删除</OptionItem>
        <OptionItem icon="icon-copy" @click="handleClickMenuItem('copy')">复制</OptionItem>
        <OptionItem icon="icon-download" @click="handleClickMenuItem('download')">下载</OptionItem>
        <a-popover position="right" :content-style="{ padding: 0, overflow: 'hidden' }">
          <OptionItem icon="icon-download" @click="handleClickMenuItem('zip')">解压</OptionItem>
          <template #content>
            <Option>
              <OptionItem icon="icon-download" @click="handleClickMenuItem('zip1')">解压1</OptionItem>
              <OptionItem icon="icon-download" @click="handleClickMenuItem('zip2')">解压2</OptionItem>
            </Option>
          </template>
        </a-popover>
      </Option>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Option from './Option.vue'
import OptionItem from './OptionItem.vue'
export default defineComponent({
  components: {
    Option,
    OptionItem
  },
  props: {
    axis: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    },
    fileInfo: Object,
    handleClickMenuItem: Function
  },
  setup(props) {
    let showContentMenu = ref(false)
    let contentMenuStyle = ref({})
    let contentMenuWidth = ref(0)
    let contentMenuHeight = ref(0)
    let contentMenuRef = ref(null)

    const getStyle = () => {
      const obj = {}
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

    //  关闭右键菜单
    function closeRightMenu() {
      console.log('event.target', event.target.className)
      if (!event.target.className.includes('file-context-menu')) {
        showContentMenu.value = false
      }
    }

    onMounted(() => {
      document.body.addEventListener('click', closeRightMenu)
      setTimeout(() => {
        showContentMenu.value = true
        nextTick(() => {
          contentMenuWidth.value = contentMenuRef.value.offsetWidth
          contentMenuHeight.value = contentMenuRef.value.offsetHeight
          getStyle()
        })
      }, 100)
    })

    onBeforeUnmount(() => {
      document.body.removeEventListener('click', closeRightMenu)
    })

    return {
      showContentMenu,
      contentMenuStyle,
      contentMenuRef
    }
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  width: 100px;
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-bg-3);
  z-index: 999;
  color: var(--color-text-2);
}
</style>
