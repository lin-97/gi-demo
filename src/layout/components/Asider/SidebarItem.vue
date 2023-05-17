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
        <span>{{ item?.meta?.title }}</span>
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

// 如果 hidden: false 那么代表这个路由项显示在左侧菜单栏中
// 如果 props.item 的子项 chidren 只有一个 hidden: false 的子元素，那么 onlyOneChild 就表示这个子元素
const onlyOneChild = ref<AppRouteItem | null>(null)

// 判断 children 是否只有一个显示的子项
function hasOneShowingChild(children: AppRouteItem[] = [], parent: AppRouteItem) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // 保存 children 最后一个 hidden: false 的元素
      // 并不一定是最后一个元素，最后一个元素的 hidden 不一定为 false
      onlyOneChild.value = item
      // console.log('onlyOneChild', onlyOneChild.value)
      return true
    }
  })

  // 当只有一个子路由时，默认显示该子路由器
  if (showingChildren.length === 1) {
    return true
  }

  // 如果没有要显示的子路由，则显示父路由
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

function resolvePath(path: string): string
function resolvePath(path: string, routeQuery: string): string | { path: string; query: AnyObject }

// 如果只有第一个参数，则函数返回字符串，这个返回的字符串就是 key
// 如果有第二个参数，则函数返回一个 { path: '', query: {}} 路由参数对象，用于路由跳转
function resolvePath(path: string, routeQuery?: string) {

  if (isExternal(path)) {
    return path
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  if (routeQuery) {
    const query = JSON.parse(routeQuery)
    return { path: getNormalPath(`${props.basePath}/${path}`), query: query }
  }
  console.log(`${props.basePath}/${path}`)
  return getNormalPath(`${props.basePath}/${path}`)
}
</script>
