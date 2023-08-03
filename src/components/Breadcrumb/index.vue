<template>
  <a-breadcrumb>
    <template v-for="(item, index) in breadcrumbList" :key="index">
      <a-breadcrumb-item
        class="gi_line_1"
        v-if="item.redirect === 'noRedirect' || index === breadcrumbList.length - 1"
        >{{ item.meta.title }}</a-breadcrumb-item
      >
      <a-breadcrumb-item class="gi_line_1 item" v-else @click="handleLink(item)">{{
        item.meta.title
      }}</a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbList = ref<RouteLocationMatched[]>([])
function getBreadcrumbList() {
  // 只显示有title标题的
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  if (!isHome(first)) {
    matched.unshift({ path: '/', meta: { title: '首页' } } as RouteLocationMatched)
  }
  breadcrumbList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
getBreadcrumbList()

watchEffect(() => {
  if (route.path.startsWith('/redirect/')) return
  getBreadcrumbList()
})

// 判断是否为首页
function isHome(route: RouteLocationMatched) {
  const name = (route?.name as string) || ''
  if (!name) return false
  return name.trim() === 'Home'
}

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
:deep(.item) {
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: $color-theme;
    font-weight: 600;
  }
}
</style>
