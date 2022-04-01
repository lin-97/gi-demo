<template>
  <ul class="gi-option">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.gi-option {
  width: 100%;
  min-width: 120px;
  // height: 100%;
  // display: flex;
  // flex-direction: column;
  // box-sizing: border-box;
  // background: var(--color-bg-popup);
}
</style>
