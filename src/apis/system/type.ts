// 部门
export interface ApiDeptItem {
  id: string
  name: string
  sort: number
  status: 0 | 1
  createTime: string
  parentId: string
  children?: ApiDeptItem[]
}

// 角色
export interface ApiRoleItem {
  id: string
  name: string
  roleCode: string
  status: 1 | 0
  description: string
  createTime: string
}

export interface ApiUserItem {
  id: string
  userNo: string
  userName: string
  nickName: string
  avatar: string
  sex: 0 | 1 // 1男 0女
  status: 0 | 1
  address: string
  phone: string
  createTime: string
}
