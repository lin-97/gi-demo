<template>
  <a-card title="IconPark Outline 图标展示" :bordered="true">
    <template #extra>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>
    <a-space wrap :size="16">
      <div v-for="icon in iconList" :key="icon.name" class="icon-item">
        <Icon :icon="icon.code" :width="24" :height="24" />
        <span>{{ icon.name }}</span>
      </div>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import CodeJson from './index.vue?raw'

defineOptions({ name: 'IconDemo' })

// 图标列表 - IconPark Outline 图标
const iconList = [
  { name: 'home', code: 'icon-park-outline:home' },
  { name: 'user', code: 'icon-park-outline:user' },
  { name: 'setting', code: 'icon-park-outline:setting' },
  { name: 'search', code: 'icon-park-outline:search' },
  { name: 'add', code: 'icon-park-outline:add' },
  { name: 'delete', code: 'icon-park-outline:delete' },
  { name: 'edit', code: 'icon-park-outline:edit' },
  { name: 'file-text', code: 'icon-park-outline:file-text' },
  { name: 'folder', code: 'icon-park-outline:folder' },
  { name: 'download', code: 'icon-park-outline:download' },
  { name: 'upload', code: 'icon-park-outline:upload' },
  { name: 'heart', code: 'icon-park-outline:heart' },
  { name: 'star', code: 'icon-park-outline:star' },
  { name: 'like', code: 'icon-park-outline:like' },
  { name: 'share', code: 'icon-park-outline:share' },
  { name: 'menu-unfold', code: 'icon-park-outline:menu-unfold' },
  { name: 'close', code: 'icon-park-outline:close' },
  { name: 'check', code: 'icon-park-outline:check' },
  { name: 'arrow-right', code: 'icon-park-outline:arrow-right' },
  { name: 'arrow-left', code: 'icon-park-outline:arrow-left' },
  { name: 'arrow-up', code: 'icon-park-outline:arrow-up' },
  { name: 'arrow-down', code: 'icon-park-outline:arrow-down' },
  { name: 'calendar', code: 'icon-park-outline:calendar' },
  { name: 'time', code: 'icon-park-outline:time' },
  { name: 'message', code: 'icon-park-outline:message' },
  { name: 'sound', code: 'icon-park-outline:sound' },
  { name: 'lock', code: 'icon-park-outline:lock' },
  { name: 'unlock', code: 'icon-park-outline:unlock' },
  { name: 'preview-close', code: 'icon-park-outline:preview-close' },
  { name: 'preview-open', code: 'icon-park-outline:preview-open' }
]
</script>

<style lang="scss" scoped>
.icon-item {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
</style>
