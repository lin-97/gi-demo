<template>
  <a-breadcrumb>
    <transition-group name="breadcrumb">
      <div v-for="(item, index) in breadcrumbList" :key="item.meta.title">
        <a-breadcrumb-item v-bind="attrs">
          <span v-if="item.redirect === 'noRedirect' || item.redirect === '' || index === breadcrumbList.length - 1"
            class="gi_line_1">{{ item.meta.title }}</span>
          <span v-else class="gi_line_1 breadcrumb-item-title" @click="handleLink(item)">{{ item.meta.title }}</span>
          <icon-right v-if="index !== breadcrumbList.length - 1" />
        </a-breadcrumb-item>
      </div>
    </transition-group>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router'
import { findTree } from 'xe-utils'
import { useRouteStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const { routes } = useRouteStore()
const attrs = useAttrs()

let home: RouteLocationMatched | null = null
const getHome = () => {
  if (!home) {
    const cloneRoutes = JSON.parse(JSON.stringify(routes)) as RouteLocationMatched[]
    const obj = findTree(cloneRoutes, (i) => i.path === '/home')
    home = obj.item
  }
}

const breadcrumbList = ref<RouteLocationMatched[]>([])
function getBreadcrumbList() {
  getHome()
  const arr = route.matched.filter((i) => i.meta.title && i.meta.breadcrumb !== false)
  if (home) {
    breadcrumbList.value = [home, ...arr]
  }
}
getBreadcrumbList()

watchEffect(() => {
  if (route.path.startsWith('/redirect/')) return
  getBreadcrumbList()
})

// 路由跳转
function handleLink(item: RouteLocationMatched) {
  const { redirect, path } = item
  if (redirect) {
    return router.push(redirect as string)
  }
  router.push(path)
}
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
