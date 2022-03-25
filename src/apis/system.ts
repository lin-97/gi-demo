import axios from '@/utils/axios'
// const prefix = '/api'

// 获取部门数据
export function getSystemDeptList(data: any) {
  return axios.get(`/mock/system-manage/dept/list`, data)
}

// 获取用户数据
export function getSystemUserList(data: any) {
  return axios.get(`/mock/system-manage/user/list`, data)
}

// 获取角色数据
export function getSystemRoleList(data?: any) {
  return axios.get(`/mock/system-manage/role/list`, data)
}
