<template>
  <div class="group-box">
    <section class="header">{{ title }}</section>
    <section class="list">
      <slot></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.group-box {
  border-radius: 4px;
  background-color: var(--color-bg-2);
  margin-bottom: 20px;
  padding-bottom: 15px;
  .header {
    &::before {
      content: '';
      width: 4px;
      height: 6px;
      background-color: $color-theme;
      position: absolute;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 16px;
  }
}
</style>
