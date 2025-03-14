<template>
  <a-card title="函数弹窗" :bordered="false">
    <a-space>
      <a-button type="primary" @click="open1">打开添加用户弹窗(方式1)</a-button>
      <a-button type="primary" @click="open2">打开添加用户弹窗(方式2)</a-button>
    </a-space>
  </a-card>
</template>

<script lang="tsx" setup>
import { Modal } from '@arco-design/web-vue'
import { openAddUserModal } from './tool'
import AddUserForm from './components/AddUserForm.vue'

// 方式1
const open1 = () => {
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
