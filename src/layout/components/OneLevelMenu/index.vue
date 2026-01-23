<template>
  <div class="one-level-menu" :class="{ 'app-menu-dark': appStore.menuDark }">
    <Logo class="one-level-menu__logo" hide-name></Logo>
    <div class="one-level-menu__wrap">
      <a-scrollbar style="height:100%;overflow: auto;" :outer-style="{ width: '100%' }">
        <ul class="one-level-menu__list">
          <li v-for="(item) in props.data" :key="item.path" class="one-level-menu__item"
            :class="{ 'one-level-menu__item--active': props.activePath === item.path }"
            @click="emits('menu-click', item)">
            <MenuIcon :icon="item?.meta?.icon"></MenuIcon>
            <p class="one-level-menu__item__title gi-line-1" :title="item?.meta?.title">{{ item?.meta?.title }}</p>
          </li>
        </ul>
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores'
import Logo from '../Logo.vue'
import MenuIcon from '../Menu/MenuIcon.vue'

interface Props {
  activePath?: string
  data?: RouteRecordRaw[]
}

const props = withDefaults(defineProps<Props>(), {
  activePath: '',
  data: () => []
})

const emits = defineEmits<{
  (e: 'menu-click', item: RouteRecordRaw): void
}>()

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
:deep(.arco-scrollbar-track) {
  display: none;
}

.one-level-menu {
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 68px;
  height: 100%;
  overflow: hidden;
  color: var(--color-text-2);
  background-color: var(--color-bg-1);
  border-right: 1px solid var(--color-border-2);

  &__logo {
    justify-content: center;
    border-bottom: 1px solid var(--color-border-2);

    :deep(.logo) {
      width: 40px;
      height: 40px;
    }
  }

  &__wrap {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  &__list {
    box-sizing: border-box;
    padding: 4px 4px 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    margin-bottom: 4px;
    cursor: pointer;
    border-radius: 4px;

    &--active {
      color: rgb(var(--primary-6));
      background-color: var(--color-primary-light-2)
    }

    &:not(.one-level-menu__item--active):hover {
      background-color: var(--color-fill-2);
    }

    &__title {
      box-sizing: border-box;
      padding: 0 8px;
      margin-top: 8px;
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
