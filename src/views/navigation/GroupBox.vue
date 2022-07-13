<template>
  <div class="group-box">
    <section class="header" :id="id">{{ title }}</section>
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
  },
  id: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.group-box {
  border-radius: 6px;
  background-color: var(--color-bg-1);
  margin-bottom: 20px;
  padding-bottom: 15px;
  .header {
    height: 56px;
    font-size: 15px;
    padding: 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      width: 6px;
      height: 16px;
      background-color: $color-theme;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 16px;
  }
}
</style>
