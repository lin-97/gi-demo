<!--
  @file MenuFoldBtn 组件
  @description 菜单折叠按钮组件，支持响应式布局和抽屉模式
-->
<template>
  <!-- 折叠按钮 -->
  <a-button size="mini" class="gi_hover_btn menu-fold-btn" @click="handleFoldClick">
    <template #icon>
      <icon-menu-fold v-if="!appStore.menuCollapse" :size="18" :stroke-width="3" />
      <icon-menu-unfold v-else :size="18" :stroke-width="3" />
    </template>
  </a-button>

  <!-- 移动端抽屉菜单 -->
  <div class="drawer" :class="{ 'app-menu-dark': appStore.menuDark }"
    :style="appStore.menuDark ? appStore.themeCSSVar : undefined">
    <a-drawer v-model:visible="visible" placement="left" :header="false" :footer="false" :render-to-body="false"
      :drawer-style="drawerStyle">
      <Logo :collapsed="false" />
      <a-menu class="menu w-full" :menu-trigger-props="menuTriggerProps" :selected-keys="selectedKeys"
        @menu-item-click="onMenuItemClick">
        <MenuItem v-for="item in menuList" :key="item.path" :item="item">
        </MenuItem>
      </a-menu>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from '@/hooks'
import { useMenu } from '@/layout/hooks/useMenu'
import { useAppStore } from '@/stores'

/** 组件名称 */
defineOptions({ name: 'MenuFoldBtn' })
const Logo = defineAsyncComponent(() => import('@/layout/components/Logo.vue'))
const MenuItem = defineAsyncComponent(() => import('@/layout/components/Menu/MenuItem.vue'))

/** 状态管理 */
const appStore = useAppStore()
const { isDesktop } = useDevice()
const { menuList, menuTriggerProps, handleMenuItemClick, selectedKeys } = useMenu()

/** 抽屉可见性状态 */
const visible = ref(false)

/** 抽屉样式配置 */
const drawerStyle = {
  borderRight: '1px solid var(--color-border-2)',
  boxSizing: 'border-box',
  backgroundColor: 'var(--color-bg-1)'
} as const

/** 处理折叠按钮点击 */
const handleFoldClick = () => {
  if (isDesktop.value) {
    appStore.setMenuCollapse(!appStore.menuCollapse)
  } else {
    visible.value = !visible.value
  }
}

/** 处理菜单项点击 */
const onMenuItemClick = (key: string) => {
  handleMenuItemClick(key)
  visible.value = false
}
</script>

<style lang="scss" scoped>
.menu-fold-btn {
  flex-shrink: 0;
  background-color: var(--color-secondary-hover) !important;
}

.drawer {

  // 菜单样式
  .menu {
    flex: 1;
    overflow: hidden;
    background-color: inherit;
  }

  // 抽屉内容样式
  :deep(.arco-drawer-body) {
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }
}
</style>
