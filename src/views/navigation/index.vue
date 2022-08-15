<template>
  <div class="navigation">
    <iframe src="https://www.5cv.top/" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts" name="Navigation">
import { ref } from 'vue'
</script>

<style lang="scss" scoped>
.navigation {
  flex: 1;
  display: flex;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
