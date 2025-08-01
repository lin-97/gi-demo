<!--
  @file Breadcrumb 组件
  @description 面包屑导航组件，支持路由导航、动画效果和自定义样式
-->
<template>
  <a-breadcrumb>
    <transition-group name="breadcrumb">
      <div v-for="(item, index) in breadcrumbList" :key="item.path + index">
        <a-breadcrumb-item v-bind="attrs">
          <template v-if="isLastItem(index) && !hasRedirect(item)">
            <span class="gi-line-1">{{ lastTitle || item.meta.title }}</span>
          </template>
          <template v-else>
            <span class="gi-line-1 breadcrumb-item-title" @click="handleLink(item)">
              {{ item.meta.title }}
            </span>
          </template>
          <icon-right v-if="!isLastItem(index)" />
        </a-breadcrumb-item>
      </div>
    </transition-group>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import type { RouteLocationMatched, RouteLocationNormalized } from 'vue-router'
import { useRouteListener } from '@/hooks'
import { useTabsStore } from '@/stores'

/** 组件名称 */
defineOptions({ name: 'Breadcrumb' })

/** 路由相关 */
const route = useRoute()
const router = useRouter()
const attrs = useAttrs()

const { listenerRouteChange } = useRouteListener()
const tabsStore = useTabsStore()

/** 首页路由缓存 */
let homeRoute: RouteLocationMatched | null = null

/** 获取首页路由信息 */
const getHomeRoute = () => {
  if (homeRoute) return
  const allRoutes = router.getRoutes()
  const obj = allRoutes.find((i) => i.path === '/home')
  if (obj) {
    homeRoute = obj
  }
}

/** 面包屑列表 */
const breadcrumbList = ref<RouteLocationMatched[]>([])

/** 获取面包屑列表 */
const getBreadcrumbList = (to: RouteLocationNormalized) => {
  getHomeRoute()
  const arr = to.matched.filter((i) => i.meta.title && i.meta.breadcrumb !== false)
  if (homeRoute) {
    breadcrumbList.value = [homeRoute, ...arr]
  }
}

/** 判断是否为最后一项 */
const isLastItem = (index: number) => index === breadcrumbList.value.length - 1

/** 判断是否有重定向 */
const hasRedirect = (item: RouteLocationMatched) =>
  item.redirect && item.redirect !== 'noRedirect' && item.redirect !== ''

/** 处理路由跳转 */
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(path)
}

/** 监听路由变化 */
listenerRouteChange(({ to }) => {
  if (to.path.startsWith('/redirect/')) return
  getBreadcrumbList(to)
}, true)

const lastTitle = computed(() => {
  return tabsStore.tabList.find((i) => i.path === route.path)?.meta?.title || ''
})
</script>

<style lang="scss" scoped>
/** breadcrumb-transform 面包屑动画 */
.breadcrumb-enter-active {
  transition: all 0.2s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(10px);
}

:deep(.arco-breadcrumb-item) {
  padding: 0;
  display: flex;
  align-items: center;

  .arco-icon-right {
    margin: 0 4px;
  }
}

.breadcrumb-item-title {
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: $color-theme;
    font-weight: 600;
  }
}
</style>
