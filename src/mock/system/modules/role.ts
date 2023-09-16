import { successResponseWrap, failResponseWrap } from '@/mock/mock'

const data = [
  {
    id: '01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: true,
    name: '超级管理员',
    code: 'role_admin',
    sort: 1,
    status: 1,
    type: 1,
    description: '系统初始角色'
  },
  {
    id: '02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: false,
    name: '普通用户',
    code: 'role_user',
    sort: 2,
    status: 1,
    type: 2,
    description: '普通用户，无系统管理权限，系统管理菜单无权访问'
  },
  {
    id: '03',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: false,
    name: '普通用户2',
    code: 'role_user2',
    sort: 3,
    status: 0,
    type: 2,
    description: '禁用状态'
  }
]

export default [
  {
    url: '/mock/system/role',
    method: 'get',
    timeout: 100,
    response: () => {
      return successResponseWrap({
        total: 2,
        list: data
      })
    }
  },
  {
    url: '/mock/system/role/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }: any) => {
      const { id } = query
      const index = data.findIndex((i) => i.id === id)
      if (index >= 0) {
        return successResponseWrap(data[index])
      } else {
        return failResponseWrap(null, '没有该角色', 400)
      }
    }
  },
  {
    url: '/mock/system/role/save',
    method: 'post',
    timeout: 350,
    response: ({ query }: any) => {
      return successResponseWrap(true)
    }
  }
]
