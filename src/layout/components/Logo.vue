<!--
  @file Logo 组件
  @description 系统 Logo 组件，支持折叠状态和首页导航功能
-->
<template>
  <section class="system-logo" :class="{ collapsed: props.collapsed }" @click="handleHomeNavigation">
    <img class="logo" src="@/assets/images/logo.gif" />
    <span class="system-name gi-line-1">Admin Pro</span>
  </section>
</template>

<script setup lang="ts">
/** 组件名称 */
defineOptions({ name: 'Logo' })

/** Props 默认值 */
const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})

/** Props 类型定义 */
interface Props {
  /** 是否折叠状态 */
  collapsed?: boolean
}

/** 路由实例 */
const router = useRouter()

/** 处理首页导航 */
const handleHomeNavigation = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.system-logo {
  height: 56px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  color: var(--color-text-1);
  font-size: 20px;
  line-height: 1;
  transition: padding 0.2s;

  // 折叠状态样式
  &.collapsed {
    padding: 0;
    justify-content: center;

    .system-name {
      display: none;
    }
  }

  // Logo 图片样式
  .logo {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    transition: all 0.2s;
    overflow: hidden;
    flex-shrink: 0;
  }

  // 系统名称样式
  .system-name {
    padding-left: 10px;
    white-space: nowrap;
    transition: color 0.3s;

    &:hover {
      color: $color-theme;
    }
  }
}
</style>
