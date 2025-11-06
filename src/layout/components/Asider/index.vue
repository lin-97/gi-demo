<template>
  <div v-if="isDesktop" class="asider" :class="{ 'app-menu-dark': appStore.menuDark }"
    :style="appStore.menuDark ? appStore.themeCSSVar : undefined">
    <a-layout-sider class="asider__menu" collapsible breakpoint="xl" hide-trigger :width="220"
      :collapsed="appStore.menuCollapse" @collapse="handleCollapse">
      <Logo :collapsed="appStore.menuCollapse"></Logo>
      <a-scrollbar outer-class="asider__menu-scroll-view" style="height: 100%; overflow: auto">
        <Menu></Menu>
      </a-scrollbar>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from '@/hooks'
import { useAppStore } from '@/stores'
import Logo from '../Logo.vue'
import Menu from '../Menu/index.vue'

defineOptions({ name: 'AppAsider' })
const appStore = useAppStore()
const { isDesktop } = useDevice()

const handleCollapse = (isCollapsed: boolean) => {
  appStore.menuCollapse = isCollapsed
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {

  // Menu菜单组件修改
  .arco-menu-icon {
    padding: 10px 0;
    margin-right: 0;
  }

  .arco-menu-has-icon {
    justify-content: center;
    padding: 0;
  }

  .arco-menu-title {
    display: none;
  }
}

:deep(.arco-layout-sider-children) {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.asider {
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
  border-right: 1px solid var(--color-border-2);

  &__menu-scroll-view {
    flex: 1;
    overflow: hidden;
  }

  &__menu {
    flex: 1;
    overflow: hidden;
    background-color: inherit;
  }
}
</style>
