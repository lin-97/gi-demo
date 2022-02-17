<template>
  <div class="option">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.option {
  min-width: 120px;
  width: 100%;
  height: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: var(--color-bg-popup);
  position: relative;
}
</style>
