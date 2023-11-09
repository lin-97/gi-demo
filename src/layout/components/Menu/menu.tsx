import { defineComponent, toRaw } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object as any,
      default: () => ({})
    }
  },
  setup(props) {
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

    const MItem = (props: any) => {
      const item = props.item
      console.log('item', item)
      const a = hasOneShowingChild(item.children, item)
      const flag =
        a && (!onlyOneChild?.value?.children || onlyOneChild?.value?.meta?.noShowingChildren) && !item?.meta?.alwaysShow
      console.log('flag', flag, onlyOneChild.value)
      if (flag) {
        return <a-menu-item key={onlyOneChild.value?.path}>{onlyOneChild?.value?.meta?.title}</a-menu-item>
      } else {
        return (
          <a-sub-menu key={item.path} title={item?.meta?.title}>
            {item.children.length &&
              item.children.map((i) => {
                return <MItem key={i.path} item={i}></MItem>
              })}
          </a-sub-menu>
        )
      }
    }

    if (!props.item?.meta?.hidden) {
      return () => <MItem item={props.item}></MItem>
    }
    return () => null
  }
})
