<template>
  <template v-if="!item.meta?.hidden">
    <a-menu-item
      v-if="
        isOneShowingChild &&
        (!onlyOneChild?.children || onlyOneChild?.meta?.noShowingChildren) &&
        !item?.meta?.alwaysShow
      "
      v-bind="attrs"
      :key="onlyOneChild?.path"
    >
      <template #icon>
        <GiSvgIcon
          v-if="onlyOneChild?.meta?.svgIcon || item?.meta?.svgIcon"
          :name="onlyOneChild?.meta?.svgIcon || item?.meta?.svgIcon"
          :size="24"
        ></GiSvgIcon>
        <component v-else :is="onlyOneChild?.meta?.icon || item?.meta?.icon || ''"></component>
      </template>
      <span>{{ onlyOneChild?.meta?.title }}</span>
    </a-menu-item>

    <a-sub-menu v-else v-bind="attrs" :key="item.path" :title="item?.meta?.title">
      <template #icon>
        <GiSvgIcon v-if="item?.meta?.svgIcon" :name="item?.meta?.svgIcon" :size="24"></GiSvgIcon>
        <component v-else :is="item?.meta?.icon || ''"></component>
      </template>
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
const isOneShowingChild = ref(false)

const handleFunction = () => {
  const chidrens = props.item?.children?.length ? props.item.children : []
  const showingChildrens = chidrens.filter((i) => i.meta?.hidden === false)
  if (showingChildrens.length) {
    onlyOneChild.value = showingChildrens[showingChildrens.length - 1]
  }

  if (showingChildrens.length === 1) {
    isOneShowingChild.value = true
  }

  if (showingChildrens.length === 0) {
    onlyOneChild.value = { ...props.item, meta: { ...props.item.meta, noShowingChildren: true } } as any
    isOneShowingChild.value = true
    // console.log('onlyOneChild.value', onlyOneChild.value)
  }
}

handleFunction()
</script>
