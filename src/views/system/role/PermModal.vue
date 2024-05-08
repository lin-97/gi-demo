<template>
  <a-modal v-model:visible="visible" :title="title" :fullscreen="isMobile()" :mask-closable="true" @ok="save">
    <a-tree
      ref="treeRef"
      v-model:checked-keys="menuIds"
      size="mini"
      checkable
      :check-strictly="true"
      :data="treeData"
      :fieldNames="{ key: 'id' }"
    ></a-tree>
  </a-modal>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import type { TreeInstance } from '@arco-design/web-vue'
import { getSystemMenuOptions, getSystemRoleMenuIds, type MenuOptionsItem } from '@/apis'
import { isMobile } from '@/utils'

const treeRef = ref<TreeInstance>()
const treeData = ref<MenuOptionsItem[]>([])
const getTreeData = async () => {
  const res = await getSystemMenuOptions()
  treeData.value = res.data
  nextTick(() => {
    treeRef.value?.expandAll()
  })
}
getTreeData()

const title = computed(() => `分配权限`)
const visible = ref(false)
const menuIds = ref<string[]>([])
const open = (data: { code: string; title: string }) => {
  menuIds.value = []
  visible.value = true
  getSystemRoleMenuIds({ role: data.code }).then((res) => {
    menuIds.value = res.data
  })
}
defineExpose({ open })

const save = () => {
  Message.success('模拟保存成功')
}
</script>

<style lang="scss" scoped></style>
