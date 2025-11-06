<template>
  <div class="aaa">
    <h3>{{ text }}</h3>
  </div>
</template>

<script lang="ts" setup>
import mittBus from '@/utils/mitt'

const text = ref('A')
mittBus.on('changeText', (e) => {
  text.value = e
})
</script>

<style lang="scss" scoped>
.aaa {
  box-sizing: border-box;
  width: 400px;
  height: 400px;
  padding: 16px;
  border: 1px solid var(--color-border-2);

  h3 {
    font-size: 28px;
  }
}
</style>
