import type { MockMethod } from 'vite-plugin-mock'
import { successResponseWrap, failResponseWrap } from '../mock'
import RoutesAdmin from './routes-admin'

export default [
  {
    url: '/mock/user/login',
    method: 'post',
    timeout: 300,
    response: ({ body }) => {
      const { username, password } = body
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (username === 'admin' && password === '123456') {
        return successResponseWrap({
          token: 'TOKEN-admin'
        })
      }
      if (username === 'user' && password === '123456') {
        return successResponseWrap({
          token: 'TOKEN-user'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 50000)
    }
  },
  {
    url: '/mock/user/logout',
    method: 'post',
    timeout: 300,
    response: () => {
      return successResponseWrap(null)
    }
  },
  {
    url: '/mock/user/getUserInfo',
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      const token = headers.token
      if (token) {
        const isAdmin = token === 'TOKEN-admin'
        return successResponseWrap({
          name: isAdmin ? '管理员' : '木糖醇',
          avatar: 'https://s1.ax1x.com/2022/07/05/jtMjGq.jpg',
          roles: isAdmin ? ['admin'] : ['user'],
          permissions: []
        })
      } else {
      }
    }
  },
  {
    url: '/mock/user/getUserRoutes',
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      const token = headers.token
      if (token) {
        return successResponseWrap(RoutesAdmin)
      } else {
      }
    }
  }
] as MockMethod[]
