import axios from '@/utils/axios'
// const prefix = '/api'

// 获取表格
export function getTableList(data: any) {
  return axios.get(`/mock/getTable`, data)
}
