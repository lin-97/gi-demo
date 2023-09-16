import { successResponseWrap, failResponseWrap } from '@/mock/mock'

const data = [
  {
    id: '01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: true,
    username: 'admin',
    nickname: '超级管理员',
    gender: 1,
    avatar: 'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    email: '326010228@qq.com',
    phone: '199****6962',
    status: 1,
    type: 1,
    description: '系统初始用户',
    roleIds: ['role_admin'],
    deptId: '01'
  },
  {
    id: '02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: false,
    username: 'user',
    nickname: '普通用户',
    gender: 2,
    avatar: 'https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    email: '155****8810@qq.com',
    phone: '155****8810',
    status: 1,
    type: 2,
    description: null,
    roleIds: ['role_user'],
    deptId: '01010101'
  }
]

export default [
  {
    url: '/mock/system/user',
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
    url: '/mock/system/user/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }: any) => {
      const { id } = query
      const index = data.findIndex((i) => i.id === id)
      if (index >= 0) {
        if (data[index].id === '01') {
          return successResponseWrap(data[index])
        }
        if (data[index].id === '02') {
          return successResponseWrap(data[index])
        }
      } else {
        return failResponseWrap(null, '没有该用户', 400)
      }
    }
  },
  {
    url: '/mock/system/user/save',
    method: 'post',
    timeout: 350,
    response: ({ query }: any) => {
      return successResponseWrap(true)
    }
  }
]
