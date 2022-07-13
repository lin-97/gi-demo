<template>
  <div class="about">
    <section class="content">
      <a-descriptions title="dependencies" bordered :column="{ xs: 1, md: 2, lg: 3 }">
        <a-descriptions-item v-for="(item, index) of data.dependencies" :label="index" :key="index">
          <a-tag color="arcoblue">{{ item }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <a-descriptions title="devDependencies" bordered :column="{ xs: 1, md: 2, lg: 3 }" style="margin-top: 20px">
        <a-descriptions-item v-for="(item, index) of data.devDependencies" :label="index" :key="index">
          <a-tag>{{ item }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <GiFooter></GiFooter>
    </section>
  </div>
</template>

<script setup lang="ts" name="About">
import { ref } from 'vue'
import packageJson from '../../../package.json'

const data = ref(packageJson)
</script>

<style lang="scss" scoped>
.about {
  padding: $margin;
  box-sizing: border-box;
  overflow-y: auto;
  .content {
    background: var(--color-bg-1);
    padding: $padding;
    box-sizing: border-box;
  }
}
</style>
