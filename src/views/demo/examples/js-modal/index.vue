<template>
  <div>
    <a-space>
      <a-card title="方式1" :bordered="true">
        <template #extra>
          <GiCodeButton lang="javascript" :code="code1"></GiCodeButton>
        </template>
        <a-button type="primary" @click="open1">打开添加用户弹窗</a-button>
      </a-card>
      <a-card title="方式2" :bordered="true">
        <template #extra>
          <GiCodeButton :code="code2"></GiCodeButton>
        </template>
        <a-button type="primary" @click="open2">打开添加用户弹窗</a-button>
      </a-card>
    </a-space>
  </div>
</template>

<script lang="tsx" setup>
import { Modal } from '@arco-design/web-vue'
import AddUserForm from './components/AddUserForm.vue'
import code2 from './index.vue?raw'
import { openAddUserModal } from './tool'
import code1 from './tool.tsx?raw'

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
    width: 'calc(100% - 20px)',
    modalStyle: { maxWidth: '450px' },
    okText: '添加',
    onBeforeOk: async () => {
      return await AddUserFormRef.value?.handleAddUser()
    }
  })
}
</script>

<style lang="scss" scoped></style>
