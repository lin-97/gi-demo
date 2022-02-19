<template>
  <a-modal title="移动到" width="500px" v-model:visible="visible" @cancel="handleCancel">
    <a-form :model="form" :style="{ width: '100%' }" label-align="left">
      <a-form-item field="path" label="目标路径：" required>
        <a-input v-model="form.path" placeholder="请输入" />
      </a-form-item>
    </a-form>
    <section class="tree-box">
      <a-tree show-line :data="treeData" @select="handleClickNode"> </a-tree>
    </section>
  </a-modal>
</template>

<script lang="ts">
import { ref, reactive, onMounted, defineComponent } from 'vue'
import data from './treedata.js'

export default defineComponent({
  props: {
    fileInfo: Object,
    onClose: Function
  },
  setup(props) {
    let visible = ref<boolean>(false)

    type Form = { path: string }
    const form: Form = reactive({
      path: '/'
    })

    let treeData = ref<object[]>([])
    treeData.value = data
    onMounted(() => {
      visible.value = true
    })

    const handleClickNode = (selectedKeys, { selected, selectedNodes, node }) => {
      form.path = `/${selectedNodes[0].title}`
    }

    const handleCancel = () => {
      visible.value = false
      props.onClose()
    }

    return {
      form,
      visible,
      treeData,
      handleClickNode,
      handleCancel
    }
  }
})
</script>

<style lang="scss" scoped>
.label {
  color: $text-color;
}
:deep(.arco-form-item-label-col > label) {
  white-space: nowrap;
}
.tree-box {
  width: 100%;
  height: 360px;
  padding: 0 $padding;
  box-sizing: border-box;
  border: 1px solid $border-color;
  overflow: auto;
}
</style>
