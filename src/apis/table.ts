import axios from '@/utils/axios'
const prefix = '/mock'

// 获取表格
export function getTableList(data: any) {
  return axios.get(`${prefix}/table/list`, data)
}
