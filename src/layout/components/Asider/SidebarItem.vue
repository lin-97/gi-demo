<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <SideLink v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild?.path, onlyOneChild?.query || '')">
        <a-menu-item v-if="onlyOneChild.meta" :key="resolvePath(onlyOneChild.path)">
          <template #icon>
            <component :is="onlyOneChild.meta.icon || (item?.meta?.icon as any)"></component>
          </template>
          <span>{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      </SideLink>
    </template>

    <a-sub-menu v-else :key="resolvePath(item.path)">
      <template #title v-if="item.meta">
        <component :is="(item?.meta?.icon as any)"></component>
        <span>{{ item.meta.title }}</span>
      </template>

      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></SidebarItem>
    </a-sub-menu>
  </div>
</template>

<script lang="ts" setup name="SidebarItem">
import { ref } from 'vue'
import { isExternal } from '@/utils/validate'
import SideLink from './SideLink.vue'

interface Props {
  item: AppRouteItem
  basePath: string
  isNest?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  basePath: ''
})

const onlyOneChild = ref<AppRouteItem | null>(null)

function hasOneShowingChild(children: AppRouteItem[] = [], parent: AppRouteItem) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      // console.log('onlyOneChild', onlyOneChild.value)
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

// 返回项目路径
function getNormalPath(p: string) {
  // console.log('p', p)
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}

function resolvePath(routePath: string): string
function resolvePath(routePath: string, routeQuery: string): string | { path: string; query: AnyObject }
function resolvePath(routePath: string, routeQuery?: string) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  if (routeQuery) {
    const query = JSON.parse(routeQuery)
    return { path: getNormalPath(props.basePath + '/' + routePath), query: query }
  }
  return getNormalPath(props.basePath + '/' + routePath)
}
</script>
