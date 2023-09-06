// 部门
export interface DeptItem {
  id: string
  name: string
  sort: number
  createTime: string
  parentId: string
  children?: DeptItem[]
}

// 角色
export interface RoleItem {
  id: string
  createUserString: string
  createTime: string
  disabled: boolean
  name: string
  code: string
  sort: number
  status: number
  type: number
  description: string
}

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
  status: 1 | 0
  type: 1
  description: string
}
