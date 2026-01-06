import type { CSSProperties } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
import { eachTree } from 'xe-utils'
import { useDevice, useRouteListener } from '@/hooks'
import { useAppStore, useRouteStore } from '@/stores'
import { filterTree } from '@/utils'
import { isExternal } from '@/utils/validate'

/**
 * 菜单管理 Hooks
 * 用于获取和处理应用程序的菜单列表
 * 提供菜单的过滤、展平处理等功能
 * @returns {object} 包含处理后菜单列表的响应式对象
 */
export function useMenu() {
  const router = useRouter()
  // 路由存储实例，用于获取原始路由配置
  const routeStore = useRouteStore()
  const appStore = useAppStore()
  const { listenerRouteChange } = useRouteListener()
  const { isDesktop } = useDevice()

  // 是否折叠菜单
  const collapsed = computed(() =>
    !isDesktop.value ? false : appStore.menuCollapse
  )

  // 菜单触发器配置
  const menuTriggerProps = {
    animationName: 'slide-dynamic-origin'
  }

  // 菜单主题
  const menuTheme = computed(() => appStore.menuDark ? 'dark' : 'light')

  // 获取菜单样式
  const getMenuStyle = computed(() => {
    return { backgroundColor: menuTheme.value === 'dark' ? 'var(--color-menu-dark-bg)' : 'var(--color-menu-light-bg)' } as CSSProperties
  })

  /**
   * 处理后的菜单列表
   * 响应式计算属性，当路由配置变化时自动更新，
   * > hidden:false那么代表这个路由项显示在左侧菜单栏中
   * > 子项chidren只有一个hidden:false的子元素时, 且alwaysShow为false, 那么这个子项会被展平到父项中
   * 包含以下处理逻辑：
   * 1. 深拷贝原始路由配置避免直接修改
   * 2. 过滤掉设置为隐藏的菜单项
   * 3. 展平只有一个子项的菜单项（提升用户体验）
   */
  const menuList = computed(() => {
    // 深拷贝路由配置，防止修改原始数据
    const cloneRoutes = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]

    // 过滤出非隐藏的菜单（meta.hidden !== false）
    const showMenuList = filterTree(cloneRoutes, (i) => i.meta?.hidden === false) as RouteRecordRaw[]

    // 遍历处理菜单树，展平只有一个子项的菜单项
    eachTree(showMenuList, (i) => {
      if (i?.children?.length === 1 && i?.meta?.alwaysShow !== true) {
        if (i.meta) {
          i.meta.title = i.meta?.title || i.children?.[0]?.meta?.title
          i.meta.svgIcon = i.meta?.svgIcon || i.children?.[0]?.meta?.svgIcon
          i.meta.icon = i.meta?.icon || i.children?.[0]?.meta?.icon
        }
        i.path = i.children?.[0]?.path
        delete i.children
      }
    })
    return showMenuList
  })

  const selectedKeys = ref<string[]>([])

  function handleMenuItemClick(key: string) {
    if (isExternal(key)) {
      window.open(key)
      return
    }
    selectedKeys.value = [key]
    router.push({ path: key })
  }

  listenerRouteChange(({ to }) => {
    if (to?.meta?.activeMenu) {
      selectedKeys.value = [to.meta.activeMenu]
      return
    }
    selectedKeys.value = [to.path]
  })

  return {
    menuTheme,
    getMenuStyle,
    menuList,
    menuTriggerProps,
    selectedKeys,
    collapsed,
    handleMenuItemClick
  }
}
