<template>
  <GiContentMenu ref="menuRef" :axis="axis" @close="onClose">
    <GiOption width="110" ref="option">
      <GiOptionItem icon="IconPlusCircle" @click="onClickItem('add')">新增</GiOptionItem>
      <GiOptionItem icon="IconEdit" @click="onClickItem('rename')">重命名</GiOptionItem>
      <a-popover
        position="right"
        trigger="click"
        :content-style="{ padding: 0, overflow: 'hidden' }"
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
  </GiContentMenu>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import GiContentMenu from '@/components/GiContentMenu.vue'
import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
import MoveTree from '../MoveTree.vue'

export default defineComponent({
  components: {
    GiContentMenu,
    GiOption,
    GiOptionItem,
    MoveTree
  },
  props: {
    axis: Object,
    fileInfo: Object,
    treeData: Array,
    onClose: Function,
    onClick: Function
  },
  setup(props) {
    let menuRef = ref(null)
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

    return {
      menuRef,
      showMoveTreePopup,
      onClose,
      onClickItem
    }
  }
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
