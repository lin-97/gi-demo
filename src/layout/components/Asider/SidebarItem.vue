<template>
  <div v-if="!item.meta?.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild?.children || onlyOneChild?.meta?.noShowingChildren) &&
        !item?.meta?.alwaysShow
      "
    >
      <SideLink v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild?.path, onlyOneChild?.meta?.query || '')">
        <a-menu-item v-if="onlyOneChild.meta" :key="onlyOneChild.path">
          <template #icon>
            <GiSvgIcon
              v-if="onlyOneChild.meta.svgIcon || item?.meta?.svgIcon"
              :name="onlyOneChild.meta.svgIcon || item?.meta?.svgIcon"
              :size="24"
            ></GiSvgIcon>
            <component v-else :is="onlyOneChild.meta.icon || item?.meta?.icon || ''"></component>
          </template>
          <span>{{ onlyOneChild.meta?.title }}</span>
        </a-menu-item>
      </SideLink>
    </template>

    <a-sub-menu v-else :key="item.path">
      <template #icon>
        <GiSvgIcon v-if="item?.meta?.svgIcon" :name="item?.meta?.svgIcon" :size="24"></GiSvgIcon>
        <component v-else :is="item?.meta?.icon || ''"></component>
      </template>
      <template #title v-if="item.meta">
        <span>{{ item?.meta?.title }}</span>
      </template>

      <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"></SidebarItem>
    </a-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
import SideLink from './SideLink.vue'
import type { RouteRecordRaw } from 'vue-router'

defineOptions({ name: 'SidebarItem' })

interface Props {
  item: RouteRecordRaw
  isNest?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

// 如果 hidden: false 那么代表这个路由项显示在左侧菜单栏中
// 如果 props.item 的子项 chidren 只有一个 hidden: false 的子元素，那么 onlyOneChild 就表示这个子元素
const onlyOneChild = ref<RouteRecordRaw | null>(null)

// 判断 children 是否只有一个显示的子项
function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.meta?.hidden) {
      return false
    } else {
      // 保存 children 最后一个 hidden: false 的元素
      // 并不一定是最后一个元素，最后一个元素的 hidden 不一定为 false
      onlyOneChild.value = item
      // console.log('onlyOneChild', onlyOneChild.value)
      return true
    }
  })

  // 当只有一个要显示子路由时，默认显示该子路由器
  if (showingChildren.length === 1) {
    return true
  }

  // 如果没有要显示的子路由，则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, meta: { ...parent.meta, noShowingChildren: true } }
    return true
  }

  return false
}

/**
 *
 * @param path 路由
 * @param routeQuery 路由query参数
 * @desc 优先级1 如果 path 是外链，返回外链
 * @desc 优先级2 如果 path 配有路由参数，要带上路由参数
 * @desc 优先级3 如果不是外链，也没有路由参数，返回原本 path
 */
function resolvePath(path: string, routeQuery?: string): string | { path: string; query: AnyObject } {
  if (isExternal(path)) {
    return path
  }
  if (routeQuery) {
    const query = JSON.parse(JSON.stringify(routeQuery))
    return { path: path, query: query }
  }
  return path
}
</script>
