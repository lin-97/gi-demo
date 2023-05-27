<template>
  <div class="about">
    <a-space direction="vertical" :size="20" fill class="content">
      <a-descriptions title="dependencies" bordered :column="{ xs: 1, md: 2, lg: 3 }">
        <a-descriptions-item v-for="(item, index) of data.dependencies" :label="index" :key="index">
          <a-tag>{{ item }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <a-descriptions title="devDependencies" bordered :column="{ xs: 1, md: 2, lg: 3 }">
        <a-descriptions-item v-for="(item, index) of data.devDependencies" :label="index" :key="index">
          <a-tag>{{ item }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <GiFooter></GiFooter>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import packageJson from '../../../package.json'

defineOptions({ name: 'About' })
const data = packageJson
</script>

<style lang="scss" scoped>
:deep(.arco-descriptions-border .arco-descriptions-body) {
  overflow-x: auto;
}

.about {
  padding: $margin;
  box-sizing: border-box;
  overflow-y: auto;

  .content {
    background: var(--color-bg-1);
    padding: $padding;
    padding-bottom: 0;
    box-sizing: border-box;
  }
}
</style>
