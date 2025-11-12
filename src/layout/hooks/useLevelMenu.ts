import type { RouteRecordRaw } from 'vue-router'
import { eachTree, searchTree } from 'xe-utils'
import { useRouteListener } from '@/hooks'
import { useRouteStore } from '@/stores'
import { filterTree } from '@/utils'
import { isExternal } from '@/utils/validate'

/** 获取一级菜单，二级菜单的hooks */
export function useLevelMenu() {
  const route = useRoute()
  const router = useRouter()
  const routeStore = useRouteStore()
  const { listenerRouteChange } = useRouteListener()

  // 克隆一份路由，避免直接操作原始路由
  const cloneRoutes = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
  const showMenuList = filterTree(cloneRoutes, (i) => i.meta?.hidden === false) as RouteRecordRaw[]

  // 一级菜单
  const oneLevelMenus = ref<RouteRecordRaw[]>([])

  // 二级菜单
  const twoLevelMenus = computed(() => {
    const path = route.matched[0].path
    return showMenuList.find((i) => i.path === path)?.children || []
  })

  // 一级菜单选中的路由
  const oneLevelMenuActiveRoute = ref<RouteRecordRaw | null>(null)

  const getOneLevelMenuActiveRoute = (path: string) => {
    const arr = searchTree(showMenuList, (i) => i.path === path)
    return arr?.[0]
  }

  listenerRouteChange(({ to }) => {
    oneLevelMenuActiveRoute.value = getOneLevelMenuActiveRoute(to.path)
  })

  // 获取一级菜单
  function getOneLevelMenus() {
    const cloneRoutes = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
    const showMenuList = filterTree(cloneRoutes, (i) => i.meta?.hidden === false) as RouteRecordRaw[]
    eachTree(showMenuList, (i) => {
      if (i?.children?.length === 1 && i?.meta?.alwaysShow !== true) {
        if (i.meta) {
          i.meta.title = i.meta?.title || i.children?.[0]?.meta?.title
          i.meta.svgIcon = i.meta?.svgIcon || i.children?.[0]?.meta?.svgIcon
          i.meta.icon = i.meta?.icon || i.children?.[0]?.meta?.icon
        }
        delete i.children
      }
    })
    oneLevelMenus.value = showMenuList
  }

  // 菜单点击事件
  function handleMenuItemClickByItem(item: RouteRecordRaw) {
    let path = (item.redirect as string) || item.path
    if ((!item.redirect && item?.children?.length) || (item.redirect === 'noRedirect' && item?.children?.length)) {
      path = item.children?.[0]?.path
    }
    if (isExternal(path)) {
      window.open(path)
      return
    }
    if (item.redirect === 'noRedirect') {
      router.replace({ path })
      return
    }
    router.replace({ path })
  }

  // 菜单点击事件
  function handleMenuItemClickByPath(path: string) {
    if (isExternal(path)) {
      window.open(path)
      return
    }
    const obj = oneLevelMenus.value.find((i) => i.path === path)
    if (obj?.redirect === 'noRedirect') {
      router.push({ path: obj.children?.[0]?.path })
      return
    }
    router.push({ path: (obj?.redirect as string) || path })
  }

  return {
    oneLevelMenus,
    twoLevelMenus,
    oneLevelMenuActiveRoute,
    getOneLevelMenus,
    handleMenuItemClickByItem,
    handleMenuItemClickByPath
  }
}
