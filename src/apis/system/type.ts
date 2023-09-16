/** 系统部门类型 */
export interface DeptItem {
  id: string
  name: string
  sort: number
  status: 0 | 1
  createTime: string
  parentId: string
  children?: DeptItem[]
  description: string
}

/** 系统角色类型 */
export interface RoleItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  name: string
  code: string
  sort: number
  status: 0 | 1
  type: number
  description: string
}

/** 系统用户类型 */
export interface UserItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  username: string
  nickname: string
  sex: number
  avatar: string
  email: string
  phone: string
  status: 0 | 1
  type: 1
  description: string
}

/** 系统菜单类型 */
export interface MenuItem {
  activeMenu: string
  breadcrumb: boolean
  children: MenuItem[]
  component: string
  hidden: boolean
  icon: string
  id: string
  keepAlive: boolean
  parentId: string
  path: string
  permissions: string[]
  redirect: string
  roles: string[]
  sort: number
  status: 0 | 1
  svgIcon: string
  title: string
  type: 1 | 2
}
