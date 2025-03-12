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
      <Menu class="menu w-full" @menu-item-click-after="handleMenuItemClick" />
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import Logo from '@/layout/components/Logo.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useDevice } from '@/hooks'

/** 组件名称 */
defineOptions({ name: 'MenuFoldBtn' })

/** 状态管理 */
const appStore = useAppStore()
const { isDesktop } = useDevice()

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
const handleMenuItemClick = () => {
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
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
