<template>
  <a-card title="快捷操作" :bordered="false" size="medium">
    <a-card-grid :style="{ width: '33.33%' }" v-for="item in list" :key="item.name" class="card-grid">
      <a-card :bordered="false" hoverable>
        <a-row justify="center" align="center">
          <a-space direction="vertical" align="center">
            <component :is="item.icon" :size="30" :style="{ color: item.color }"></component>
            <span>{{ item.name }}</span>
          </a-space>
        </a-row>
      </a-card>
    </a-card-grid>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  { name: '主控台', icon: 'icon-dashboard', color: 'rgb(104, 199, 85)' },
  { name: '列表', icon: 'icon-list', color: 'rgb(250, 178, 81)' },
  { name: '表单', icon: 'icon-file', color: 'rgb(24, 144, 255)' },
  { name: '权限管理', icon: 'icon-mind-mapping', color: 'rgb(240, 107, 150)' },
  { name: '系统管理', icon: 'icon-computer', color: 'rgb(114, 56, 209)' },
  { name: '消息', icon: 'icon-notification', color: 'rgb(92, 219, 211)' }
]
</script>

<style lang="scss" scoped>
:deep(.arco-card-header) {
  border: none;
}
.card-grid {
  box-shadow: none;
  border-top: 1px solid var(--color-neutral-3);
  border-right: 1px solid var(--color-neutral-3);
  cursor: pointer;
  &:nth-child(3n) {
    border-right: none;
  }
}
</style>
