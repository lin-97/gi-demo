<template>
  <ul class="gi-option">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
.gi-option {
  min-width: 120px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: var(--color-bg-popup);
  position: relative;
}
</style>
