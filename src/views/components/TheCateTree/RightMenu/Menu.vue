<template>
  <GiContentMenu ref="menuRef" :axis="axis" @close="onClose">
    <GiOption ref="option">
      <GiOptionItem icon="IconPlusCircle" @click="onClickItem('add')">新增</GiOptionItem>
      <GiOptionItem icon="IconEdit" @click="onClickItem('rename')">重命名</GiOptionItem>
      <!-- <a-popover
        position="right"
        trigger="click"
        :content-style="{ padding: 0, overflow: 'hidden' }"
        :popup-visible="showTreePopover"
        v-if="showMove"
      >
        <OptionItem mode="more" icon="IconExport" :active="showTreePopover" @click="onMove"> 移动 </OptionItem>
        <template #content>
          <section style="width: 250px; min-height: 200px; max-height: 500px; overflow: scroll">
            <MoveTree :tree-data="treeData" @node-click="moveTreeNodeClick"></MoveTree>
          </section>
        </template>
      </a-popover> -->
      <GiOptionItem icon="IconDelete" @click="onClickItem('delete')">删除</GiOptionItem>
    </GiOption>
  </GiContentMenu>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import GiContentMenu from '@/components/GiContentMenu.vue'
import GiOption from '@/components/GiOption.vue'
import GiOptionItem from '@/components/GiOptionItem.vue'
// import MoveTree from './MoveTree.vue'

export default defineComponent({
  components: {
    GiContentMenu,
    GiOption,
    GiOptionItem
    // MoveTree,
  },
  props: {
    axis: Object,
    fileInfo: Object,
    onClose: Function,
    onClick: Function
  },
  setup(props) {
    let menuRef = ref(null)

    const onClose = () => {
      props.onClose()
    }

    const onClickItem = (mode: string) => {
      nextTick(() => {
        props.onClick(mode)
        menuRef.value.onHidden()
      })
    }

    return {
      menuRef,
      onClose,
      onClickItem
    }
  }
})
</script>
