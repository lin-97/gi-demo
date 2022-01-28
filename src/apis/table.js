import axios from '@/utils/axios'
const prefix = '/api'

// 获取表格
export function getTableList(data) {
  return axios.get(`${prefix}/table/list`, data)
}