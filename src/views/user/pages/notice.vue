<template>
  <div class="aaa">
    消息通知
    <a-input v-model="form.name"></a-input>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineOptions({ name: 'UserNotice' })

const form = reactive({ name: '' })
</script>

<style lang="scss" scoped></style>
