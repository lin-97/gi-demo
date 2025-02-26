<template>
  <a-modal v-model:visible="visible" :title="title" :fullscreen="isMobile()" :mask-closable="true" @ok="save">
    <a-tree ref="treeRef" v-model:checked-keys="menuIds" size="mini" checkable :check-strictly="true" :data="treeData"
      :field-names="{ key: 'id' }"></a-tree>
  </a-modal>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { type MenuOptionsItem, getMenuOptions, getRoleMenuIds } from '@/apis/system'
import { isMobile } from '@/utils'

const treeRef = useTemplateRef('treeRef')
const treeData = ref<MenuOptionsItem[]>([])
const getTreeData = async () => {
  const res = await getMenuOptions()
  treeData.value = res.data
  nextTick(() => {
    treeRef.value?.expandAll()
  })
}
getTreeData()

const title = computed(() => `分配权限`)
const visible = ref(false)
const menuIds = ref<string[]>([])
const open = (data: { code: string, title: string }) => {
  menuIds.value = []
  visible.value = true
  getRoleMenuIds({ role: data.code }).then((res) => {
    menuIds.value = res.data
  })
}

const save = () => {
  Message.success('模拟保存成功')
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
