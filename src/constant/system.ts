export type Status = 0 | 1
export type StatusItem = { label: string; value: Status; color: 'green' | 'red' }
export const StatusList: StatusItem[] = [
  { label: '正常', value: 1, color: 'green' },
  { label: '禁用', value: 0, color: 'red' }
]

export type IGender = Record<1 | 2, '男' | '女'>
export const GenderMap: IGender = { 1: '男', 2: '女' }
