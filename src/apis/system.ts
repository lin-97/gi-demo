import axios from '@/utils/axios'
// const prefix = '/api'

// 获取表格
export function getSystemDeptList(data: any) {
  return axios.get(`/mock/system-manage/dept/list`, data)
}
