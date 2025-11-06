<template>
  <div class="bbb">
    <a-button type="primary" @click="click">把A改成B</a-button>
  </div>
</template>

<script lang="ts" setup>
import mittBus from '@/utils/mitt'

const click = () => {
  mittBus.emit('changeText', 'B')
}
</script>

<style lang="scss" scoped>
.bbb {
  box-sizing: border-box;
  width: 400px;
  height: 400px;
  padding: 16px;
  border: 1px solid var(--color-border-2);
}
</style>
