<template>
  <GiContentMenu :axis="axis" v-model="showContentMenu" @close="onClose">
    <Option ref="option">
      <OptionItem icon="IconPlusCircle">新增</OptionItem>
      <OptionItem icon="IconEdit">重命名</OptionItem>
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
      <OptionItem icon="IconDelete">删除</OptionItem>
    </Option>
  </GiContentMenu>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, watch, reactive } from 'vue'
import GiContentMenu from '@/components/GiContentMenu.vue'
// import MoveTree from './MoveTree.vue'
import Option from '../Option.vue'
import OptionItem from '../OptionItem.vue'

export default defineComponent({
  components: {
    GiContentMenu,
    // MoveTree,
    Option,
    OptionItem
  },
  props: {
    axis: Object,
    fileInfo: Object,
    onClose: Function,
    onClick: Function
  },
  setup(props) {
    let showContentMenu = ref<boolean>(false)

    onMounted(() => {
      showContentMenu.value = true
    })

    const onClose = () => {
      props.onClose()
    }

    return {
      onClose
    }
  }
})
</script>
