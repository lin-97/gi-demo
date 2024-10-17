<template>
  <div class="modal-content">
    <a-form ref="formRef" :model="form" auto-label-width class="w-full">
      <a-form-item field="path" label="目标路径" :rules="[{ required: true, message: '请输入目标路径' }]">
        <a-input v-model="form.path" placeholder="请输入目标路径" />
      </a-form-item>
    </a-form>
    <div class="tree-box">
      <a-tree size="mini" show-line block-node :data="treeData" @select="select"></a-tree>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import type { TreeInstance } from '@arco-design/web-vue'
import { mapTree } from 'xe-utils'
import GiSvgIcon from '@/components/GiSvgIcon/index.vue'

const formRef = useTemplateRef('formRef')
const form = reactive({
  id: '',
  path: ''
})

const setForm = (obj: { id: string, path: string }) => {
  Object.assign(form, obj)
}

const treeData = ref([
  {
    title: '图片文件夹',
    key: '0-0',
    children: [
      {
        title: '图片文件夹1',
        key: '0-0-0',
        children: [
          { title: '图片文件夹1-1', key: '0-0-0-0' },
          { title: '图片文件夹1-2', key: '0-0-0-1' },
          { title: '图片文件夹1-3', key: '0-0-0-2' }
        ]
      },
      {
        title: '新建文件夹',
        key: '0-0-1'
      },
      {
        title: '视频文件夹',
        key: '0-0-2',
        children: [
          { title: '视频文件夹1', key: '0-0-2-0' },
          { title: '视频文件夹2', key: '0-0-2-1' }
        ]
      }
    ]
  }
])
treeData.value = mapTree(treeData.value, (i) => ({
  ...i,
  icon: (node: any) => {
    if (node.expanded) {
      return <GiSvgIcon name="file-open" size={16}></GiSvgIcon>
    } else {
      return <GiSvgIcon name="file-close" size={16}></GiSvgIcon>
    }
  }
}))

const select: TreeInstance['onSelect'] = (selectedKeys, data) => {
  form.path = `/${data.selectedNodes[0].title}`
}

defineExpose({ formRef, setForm })
</script>

<style lang="scss" scoped>
.tree-box {
  width: 100%;
  height: 300px;
  padding: 10px $padding;
  box-sizing: border-box;
  border: 1px solid $color-border;
  overflow: auto;
}
</style>
