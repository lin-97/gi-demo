/** 系统部门类型 */
export interface SystemDeptItem {
  id: string
  name: string
  sort: number
  status: Status
  createTime: string
  parentId: string
  children?: SystemDeptItem[]
  description: string
}

/** 系统角色类型 */
export interface SystemRoleItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  name: string
  code: string
  sort: number
  status: Status
  type: number
  description: string
}

/** 系统用户类型 */
export interface SystemUserItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  deptId: string
  deptName: string
  username: string
  nickname: string
  gender: Gender
  avatar: string
  email: string
  phone: string
  status: Status
  type: 1 | 2
  description: string
}

export type SystemUserDetail = SystemUserItem & { roleNames: string }

/** 系统菜单类型 */
export interface SystemMenuItem {
  activeMenu: string
  alwaysShow: boolean
  breadcrumb: boolean
  children: SystemMenuItem[]
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
  svgIcon: string
  title: string
  type: 1 | 2
  affix: boolean
}

export interface SystemMenuOptionsItem {
  id: string
  title: string
  children: SystemMenuOptionsItem[]
}

export interface SystemDictItem {
  id: string
  createUserString: string
  createTime: string
  name: string
  code: string
  sort: number
  status: Status
  description: string
}

export type SystemDictDetail = SystemDictItem

export type SystemDictDataItem = {
  id: string
  name: string
  value: string | number
  status: Status
}
