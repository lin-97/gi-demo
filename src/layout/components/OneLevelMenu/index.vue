<template>
  <div class="one-level-menu">
    <Logo class="one-level-menu__logo" hide-name></Logo>
    <div class="one-level-menu__wrap">
      <a-scrollbar style="height:100%;overflow: auto;" :outer-style="{ width: '100%' }">
        <ul class="one-level-menu__list">
          <li v-for="(item) in props.menus" :key="item.path" class="one-level-menu__item"
            :class="{ 'one-level-menu__item--active': calcIsActive(item) }" @click="emits('menu-click', item)">
            <MenuIcon :svg-icon="item?.meta?.svgIcon" :icon="item?.meta?.icon"></MenuIcon>
            <p class="one-level-menu__item__title gi_line_1" :title="item?.meta?.title">{{ item?.meta?.title }}</p>
          </li>
        </ul>
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import Logo from '../Logo.vue'
import MenuIcon from './MenuIcon.vue'

interface Props {
  menus?: RouteRecordRaw[]
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => []
})

const emits = defineEmits<{
  (e: 'menu-click', item: RouteRecordRaw): void
}>()

const route = useRoute()
const calcIsActive = (item: RouteRecordRaw) => {
  return route.path.startsWith(item.path) && item.path !== '/'
}
</script>

<style lang="scss" scoped>
:deep(.arco-scrollbar-track) {
  display: none;
}

.one-level-menu {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 68px;
  height: 100%;
  overflow: hidden;
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
