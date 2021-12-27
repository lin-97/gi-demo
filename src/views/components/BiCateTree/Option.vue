<template>
  <div class="option">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.option {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  background: var(--color-bg-2);
  position: relative;
}
</style>
