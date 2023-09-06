import { Random } from 'mockjs'
import { successResponseWrap, failResponseWrap } from '@/mock/mock'

const data = [
  {
    id: 'U01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: true,
    username: 'admin',
    nickname: '超级管理员',
    gender: 1,
    avatar: 'https://s1.ax1x.com/2022/07/05/jtMjGq.jpg',
    email: '326010228@qq.com',
    phone: '199****6962',
    status: 1,
    type: 1,
    description: '系统初始用户'
  },
  {
    id: 'U02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: false,
    username: 'user',
    nickname: '普通用户',
    gender: 2,
    avatar: 'https://s1.ax1x.com/2022/06/14/XhtSwF.jpg',
    email: '155****8810@qq.com',
    phone: '155****8810',
    status: 1,
    type: 2,
    description: null
  }
]

export default [
  {
    url: '/mock/system/user/list',
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
        if (data[index].id === 'U01') {
          return successResponseWrap({ ...data[index], deptId: '1' })
        }
        if (data[index].id === 'U02') {
          return successResponseWrap({ ...data[index], deptId: '7' })
        }
      } else {
        return failResponseWrap(null, '没有该用户', 400)
      }
    }
  }
]
