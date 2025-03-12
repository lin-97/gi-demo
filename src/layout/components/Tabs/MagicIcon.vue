<!--
  @file MagicIcon 组件
  @description 可旋转的魔法图标组件，用于展示更多操作的下拉菜单触发器
-->
<template>
  <span class="magic-icon-wrapper">
    <span class="magic-icon">
      <i class="magic-dot magic-dot-top"></i>
      <i class="magic-dot magic-dot-bottom"></i>
    </span>
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'MagicIcon' })
</script>

<style lang="scss" scoped>
.magic-icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  // 点击区域扩展
  &::before {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    left: -6px;
    top: -6px;
    cursor: pointer;
  }
}

.magic-icon {
  display: inline-block;
  color: var(--color-text-2);
  cursor: pointer;
  transition: transform 0.3s ease-out;

  // 魔法点样式
  .magic-dot {
    position: relative;
    display: block;
    width: 14px;
    height: 6px;

    &-bottom {
      margin-top: 2px;
    }

    // 左侧点
    &::before {
      position: absolute;
      left: 0;
      width: 6px;
      height: 6px;
      content: '';
      background: var(--color-text-3);
      transition: transform 0.3s ease-out;
    }

    // 右侧点
    &::after {
      position: absolute;
      left: 8px;
      width: 6px;
      height: 6px;
      content: '';
      background: var(--color-text-3);
      transition: background-color 0.3s ease-out;
    }
  }
}

// 悬浮和打开状态样式
.magic-icon-wrapper:hover,
.arco-dropdown-open {
  .magic-icon {
    transform: rotate(90deg);

    .magic-dot {

      &::before,
      &::after {
        background: rgb(var(--primary-6));
      }

      &-top::before {
        transform: rotate(45deg);
        background: rgb(var(--primary-3));
      }
    }
  }
}
</style>
