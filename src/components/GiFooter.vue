<template>
  <div class="gi-footer">Copyright 2022 Gi Admin Pro</div>
</template>

<script setup lang="ts" name="GiFooter"></script>
<script lang="ts">
export default {
  name: 'GiFooter'
}
</script>

<style lang="scss" scoped>
.gi-footer {
  height: 50px;
  font-size: 12px;
  color: var(--color-text-3);
  margin-top: 12px;
  border-top: 1px dashed var(--color-neutral-3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
