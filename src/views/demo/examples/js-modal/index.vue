<template>
  <div>
    <a-space>
      <a-button type="primary" @click="open1">打开添加用户弹窗(方式1)</a-button>
      <a-button type="primary" @click="open2">打开添加用户弹窗(方式2)</a-button>
    </a-space>
  </div>
</template>

<script lang="tsx" setup>
import { Modal } from '@arco-design/web-vue'
import AddUserForm from './components/AddUserForm.vue'
import { openAddUserModal } from './tool'

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
