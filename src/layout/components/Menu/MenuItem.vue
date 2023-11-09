<template>
  <template v-if="!item.meta?.hidden">
    <a-menu-item
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild?.children || onlyOneChild?.meta?.noShowingChildren) &&
        !item?.meta?.alwaysShow
      "
      :key="onlyOneChild?.path"
      v-bind="attrs"
    >
      {{ onlyOneChild?.meta?.title }}
    </a-menu-item>

    <a-sub-menu v-else :key="item.path" :title="item?.meta?.title" v-bind="attrs">
      <MenuItem v-for="child in item.children" :key="child.path" :item="child"></MenuItem>
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

defineOptions({ name: 'MenuItem' })
const attrs = useAttrs()

interface Props {
  item: RouteRecordRaw
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
</script>
