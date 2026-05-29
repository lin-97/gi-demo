export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  roles: string[]
  permissions: string[]
}

export interface Login {
  token: string
}

export interface UserRouteItem {
  activeMenu: string
  alwaysShow: boolean
  breadcrumb: boolean
  children: UserRouteItem[]
  component: string
  hidden: boolean
  icon: string
  id: string
  keepAlive: boolean
  parentId: string
  path: string
  permission: string
  redirect: string
  roles: string[]
  showInTabs: boolean
  sort: number
  status: Status
  title: string
  type: 1 | 2 | 3
  affix: boolean
}
