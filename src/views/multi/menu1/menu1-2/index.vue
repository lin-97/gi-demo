<template>
  <a-card :title="route.meta.title" class="gi_page_card">
    <a-alert type="normal">
      <template #icon>
        <icon-exclamation-circle-fill />
      </template>
      <span>
        <span>当前页面的</span>
        <a-typography-text type="primary"> keepAlive </a-typography-text>
        <span>为 </span>
        <a-typography-text type="primary">{{ String(route.meta.keepAlive) }}</a-typography-text>
      </span>
    </a-alert>
    <a-input v-model="inputValue" placeholder="请输入..." allow-clear :max-length="50" style="margin: 24px 0"></a-input>
  </a-card>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'

defineOptions({ name: 'MultiMenu1Menu12' })
const route = useRoute()
const inputValue = ref('')

onMounted(() => {
  Message.info(`${route.meta?.title}-触发了 onMounted`)
})

onActivated(() => {
  Message.success(`${route.meta?.title}-触发了 onActivated`)
})
</script>

<style lang="scss" scoped></style>
