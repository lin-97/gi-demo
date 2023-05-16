<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <SideLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <a-menu-item :index="resolvePath(onlyOneChild.path)">
          <template #icon>
            <GiSvgIcon :name="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          </template>
          <span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      </SideLink>
    </template>

    <a-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-if="item.meta" #title>
        <GiSvgIcon :icon-class="item.meta && item.meta.icon" />
        <span class="menu-title" :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>

      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      ></SidebarItem>
    </a-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { isExternal } from '@/utils/validate'
import SideLink from './SideLink.vue'

interface Props {
  item: any
  basePath: string
  isNest?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

// 返回项目路径
function getNormalPath(p: string) {
  console.log('p', p)
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}

const onlyOneChild = ref<any>({})

function hasOneShowingChild(children = [], parent: any) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
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

function resolvePath(routePath: string, routeQuery?: any) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery)
    return { path: getNormalPath(props.basePath + '/' + routePath), query: query }
  }
  return getNormalPath(props.basePath + '/' + routePath)
}

function hasTitle(title: string) {
  console.log('title', title)
  if (title?.length) {
    return title
  } else {
    return ''
  }
}
</script>
