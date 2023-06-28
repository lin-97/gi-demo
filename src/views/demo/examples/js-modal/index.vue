<template>
  <div class="aaa">
    <a-button type="primary" @click="open">打开添加用户弹窗</a-button>
  </div>
</template>

<script lang="tsx" setup>
import { openAddUserModal } from './tool'

const open = () => {
  openAddUserModal()
}
</script>

<style lang="scss" scoped></style>
