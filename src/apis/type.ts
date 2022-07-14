export interface ApiListData<T> {
  total: number
  list: T[]
  [propName: string]: unknown
}
