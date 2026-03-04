/** 省市区数据类型 */
export type MockAreaItem = { label: string, code: string, children?: MockAreaItem[] }

/** 文件数据类型 */
export interface MockFileItem {
  id: string
  name: string
  extendName: string
  src: string
  updateTime: string
  isDir: boolean
  filePath: string
  size: number
}

/** 树分类数据类型 */
export interface MockCateTreeItem {
  id: string
  name: string
  pid: string | null
  type: number
  children?: MockCateTreeItem[]
}

/** 系统部门数据类型，status 与字典 STATUS 一致为字符串 */
export interface MockSystemDeptItem {
  id: string
  parentId: string
  name: string
  sort: number
  status: Status
  createTime: string
  description: string
  children?: MockSystemDeptItem[]
}

/** 系统字典数据类型，status 与字典一致为字符串 */
export interface MockSystemDictItem {
  id: string
  createUserString: string
  createTime: string
  name: string
  code: string
  sort: number
  status: Status
  description: string
  list: {
    id: string
    name: string
    value: string | number
    sort: number
    status: Status
    color?: string
  }[]
}

/** 系统菜单数据类型 */
export interface MockSystemMenuItem {
  id: string
  parentId: string
  path: string
  component: string
  redirect: string
  type: 1 | 2 | 3
  title: string
  icon: string
  keepAlive: boolean
  hidden: boolean
  sort: number
  activeMenu: string
  breadcrumb: boolean
  status: Status
  roles: string[]
  permission: string
  showInTabs: boolean
  affix: boolean
  alwaysShow: boolean
  children?: MockSystemMenuItem[]
}

/** 系统角色数据类型 */
export interface MockSystemRoleItem {
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

/** 系统用户数据类型，gender/status 与字典一致为字符串 */
export interface MockSystemUserItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  username: string
  nickname: string
  gender: Gender
  avatar: string
  email: string
  phone: string
  status: Status
  type: number
  description: string
  roleIds: string[]
  roleNames: string
  deptId: string
  deptName: string
  permissions: string[]
}
