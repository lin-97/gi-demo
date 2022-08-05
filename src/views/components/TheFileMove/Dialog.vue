<template>
  <a-modal
    title="移动到"
    width="500px"
    v-model:visible="visible"
    modal-animation-name="el-dialog"
    mask-animation-name="el-mask"
    @cancel="handleCancel"
  >
    <a-form :model="form" :style="{ width: '100%' }" label-align="left">
      <a-form-item field="path" label="目标路径：" required>
        <a-input v-model="form.path" placeholder="请输入" />
      </a-form-item>
    </a-form>
    <section class="tree-box">
      <a-tree show-line size="mini" blockNode :data="treeData" @select="handleClickNode">
        <template #switcher-icon="node, { checked, selected, expanded }">
          <GiSvgIcon name="plus-square" :size="16" v-if="node.children && expanded" />
          <GiSvgIcon
            name="minus-square"
            :size="16"
            style="transform: rotate(0deg)"
            v-else-if="node.children && !expanded"
          />
          <icon-drive-file :size="16" v-else />
        </template>
        <template #icon>
          <GiSvgIcon name="menu-zip" :size="16"></GiSvgIcon>
        </template>
      </a-tree>
    </section>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, type PropType } from 'vue'
import type { ApiFileItem } from '@/apis'
import type { TreeNodeData } from '@arco-design/web-vue'
import data from './treedata'
import GiSvgIcon from '@/components/GiSvgIcon.vue'

const props = defineProps({
  fileInfo: Object as PropType<ApiFileItem>,
  onClose: Function
})

const visible = ref(false)

type Form = { path: string }
const form: Form = reactive({
  path: '/'
})

const treeData = ref<object[]>([])

treeData.value = data
onMounted(() => {
  visible.value = true
})

const handleClickNode = (
  selectedKeys: Array<string | number>,
  data: { selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event }
) => {
  form.path = `/${data.selectedNodes[0].title}`
}

const handleCancel = () => {
  visible.value = false
  props.onClose && props.onClose()
}

defineExpose({
  form,
  visible,
  treeData,
  handleClickNode,
  handleCancel
})
</script>

<style lang="scss" scoped>
.label {
  color: $color-text-2;
}
:deep(.arco-form-item-label-col > label) {
  white-space: nowrap;
}
:deep(.arco-tree-node-switcher-icon) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tree-box {
  width: 100%;
  height: 300px;
  padding: 10px $padding;
  box-sizing: border-box;
  border: 1px solid $color-border;
  overflow: auto;
}
</style>
