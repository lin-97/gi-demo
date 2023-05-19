interface MockRouteMeta {
  title?: string
  svgIcon?: string
  icon?: string
  hidden?: boolean
  breadcrumb?: false
  affix?: boolean
  alwaysShow?: boolean
  activeMenu?: string
  keepAlive?: boolean
  query?: string
  noShowingChildren?: boolean
  roles?: string[]
  permissions?: string[]
}

export interface MockRouteItem {
  path: string
  name?: string
  redirect?: string
  component: string
  meta: MockRouteMeta
  children?: MockRouteItem[]
}
