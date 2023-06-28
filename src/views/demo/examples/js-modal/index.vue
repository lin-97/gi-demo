<template>
  <a-space class="aaa">
    <a-button type="primary" @click="open">打开添加用户弹窗</a-button>
    <a-button type="primary" @click="open2">打开添加用户弹窗(方式2)</a-button>
  </a-space>
</template>

<script lang="tsx" setup>
import { openAddUserModal } from './tool'
import AddUserForm from './components/AddUserForm.vue'
import { Modal } from '@arco-design/web-vue'

// 方式1
const open = () => {
  openAddUserModal()
}

// 方式2
const open2 = () => {
  const AddUserFormRef = ref<InstanceType<typeof AddUserForm> | null>(null)

  Modal.open({
    title: '添加用户',
    content: () => <AddUserForm ref={AddUserFormRef}></AddUserForm>,
    okText: '添加',
    onBeforeOk: async () => {
      return await AddUserFormRef.value?.handleAddUser()
    }
  })
}
</script>

<style lang="scss" scoped></style>
