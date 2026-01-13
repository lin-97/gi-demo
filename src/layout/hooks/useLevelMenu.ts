import type { CSSProperties } from 'vue'
import type { RouteLocationNormalizedGeneric, RouteRecordRaw } from 'vue-router'
import { eachTree, searchTree } from 'xe-utils'
import { useRouteListener } from '@/hooks'
import { useAppStore, useRouteStore } from '@/stores'
import { filterTree } from '@/utils'
import { isExternal } from '@/utils/validate'

/** 获取一级菜单，二级菜单的hooks */
export function useLevelMenu() {
  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const { listenerRouteChange } = useRouteListener()

  const menuTheme = computed(() => appStore.menuDark ? 'dark' : 'light')

  // 获取菜单样式
  const getMenuStyle = computed(() => {
    return { backgroundColor: menuTheme.value === 'dark' ? 'var(--color-menu-dark-bg)' : 'var(--color-menu-light-bg)' } as CSSProperties
  })

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
  const oneActiveRoute = ref<RouteRecordRaw | null>(null)
  const oneActivePath = ref('')
  const getOneActiveRoute = (to: RouteLocationNormalizedGeneric) => {
    let path = to.path
    if (to?.meta?.activeMenu) {
      path = to.meta.activeMenu
    }
    const arr = searchTree(showMenuList, (i) => i.path === path)
    oneActivePath.value = arr?.[0]?.path
    return arr?.[0]
  }

  // 二级菜单选中的路由
  const twoActivePath = ref<string>('')
  const getTwoActivePath = (to: RouteLocationNormalizedGeneric) => {
    let path = to.path
    if (to?.meta?.activeMenu) {
      path = to.meta.activeMenu
    }
    return path
  }

  listenerRouteChange(({ to }) => {
    oneActiveRoute.value = getOneActiveRoute(to)
    twoActivePath.value = getTwoActivePath(to)
  })

  // 获取一级菜单
  function getOneLevelMenus() {
    const cloneRoutes = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
    const showMenuList = filterTree(cloneRoutes, (i) => i.meta?.hidden === false) as RouteRecordRaw[]
    eachTree(showMenuList, (i) => {
      if (i?.children?.length === 1 && i?.meta?.alwaysShow !== true) {
        if (i.meta) {
          i.meta.title = i.meta?.title || i.children?.[0]?.meta?.title
          i.meta.icon = i.meta?.icon || i.children?.[0]?.meta?.icon
        }
        delete i.children
      }
    })
    oneLevelMenus.value = showMenuList
  }

  // 一级菜单点击事件
  function handleOneMenuItemClick(path: string) {
    if (isExternal(path)) {
      window.open(path)
      return
    }
    oneActivePath.value = path
    const obj = oneLevelMenus.value.find((i) => i.path === path)
    if (obj?.redirect === 'noRedirect' || !obj?.redirect) {
      router.push({ path: obj?.children?.[0]?.path })
      return
    }
    router.push({ path: (obj?.redirect as string) || path })
  }

  // 二级菜单点击事件
  function handleTwoMenuItemClick(path: string) {
    if (isExternal(path)) {
      window.open(path)
      return
    }
    twoActivePath.value = path
    router.push({ path })
  }

  return {
    menuTheme,
    getMenuStyle,
    oneLevelMenus,
    twoLevelMenus,
    oneActiveRoute,
    oneActivePath,
    twoActivePath,
    getOneLevelMenus,
    handleOneMenuItemClick,
    handleTwoMenuItemClick
  }
}
