// 表格项目
export interface PersonItem {
  id: string
  name: string
  account: string
  avatar: string
  gender: 1 | 2 | 3
  phone: string
  email: string
  createTime: string
  address: string
  proportion: number
  status: 0 | 1
  hobbys: string[]
}
