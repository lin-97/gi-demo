// 后台可能用 msg 或者 message, 都先保留
export interface ApiRes<T> {
  code: number
  msg?: string
  message?: string
  success: boolean
  data: T
}

export interface ListData<T> {
  total: number
  list: T[]
  [propName: string]: unknown
}

export type ApiResListData<T> = ApiRes<ListData<T>>
