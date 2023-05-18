import type { RouteRecordRaw } from 'vue-router'

interface AnyObject {
  [key: string]: unknown
}

interface Options {
  value: unknown
  label: string
}

interface NodeOptions extends Options {
  children?: NodeOptions[]
}

type TimeRanger = [string, string]

// 菜单项
interface MenuItem {
  id: string
  name: string
  icon?: string
  path?: string
  children?: MenuItem[]
  keepAlive?: boolean
  hidden?: boolean
}

// 导航标签项
interface NavTabItem {
  name: string
  path: string
  componentName: string
}

interface AppRouteMeta {
  title?: string
  icon?: string
  svgIcon?: string
  roles?: string[]
  affix?: boolean
  activeMenu?: string
  keepAlive?: boolean
}

interface AppRouteItem extends RouteRecordRaw {
  path: string
  name?: string
  component: any
  redirect?: string
  children?: AppRouteItem[]
  meta?: AppRouteMeta
  hidden?: boolean
  alwaysShow?: boolean
  noShowingChildren?: boolean
  query?: string
  roles?: string[]
  permissions?: string[]
}
