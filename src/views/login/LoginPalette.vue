<template>
  <div class="login-palette">
    <div class="login-palette__dots">
      <div
        v-for="(color, index) in COLORS"
        :key="color"
        class="login-palette__dot"
        :style="{ 'background': color, '--index': index }"
        @click="handleClick(color)"
      />
    </div>
    <div class="login-palette__btn">
      <icon-palette :size="18" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks'

defineOptions({ name: 'LoginPalette' })

const COLORS = ['#165DFF', '#18A058', '#007AFF', '#5856D6', '#536dfe', '#AF52DE', '#f4511e', '#6d4c41']
const { setThemeColor } = useTheme()

const handleClick = (color: string) => {
  setThemeColor(color)
}
</script>

<style scoped lang="scss">
.login-palette {
  position: relative;
  display: flex;
  align-items: center;

  &:hover &__dots {
    pointer-events: auto;
    opacity: 1;
    transform: translateX(0);
  }

  &:hover &__dot {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  &:hover &__btn :deep(.arco-icon) {
    color: rgb(var(--primary-6));
  }

  &__dots {
    position: absolute;
    right: 0;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 36px 8px 10px;
    pointer-events: none;
    border-radius: 100px;
    opacity: 0;
    backdrop-filter: blur(10px);
    transform: translateX(10px);
    transition: all 0.3s ease;
  }

  &__dot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgb(0 0 0 / 15%);
    opacity: 0;
    transform: translateX(20px) scale(0.8);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: calc(var(--index) * 0.05s);

    &:hover {
      box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
      transform: translateX(0) scale(1.1);
    }
  }

  &__btn {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: all 0.3s;
  }
}
</style>
