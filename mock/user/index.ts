import { successResponseWrap, failResponseWrap } from '../mock'
import routesData from './route-data'

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
    timeout: 300,
    response: () => {
      const token = localStorage.getItem('token')
      if (token) {
        return successResponseWrap({
          name: token === 'TOKEN-admin' ? '管理员' : '木糖醇',
          avatar: 'https://portrait.gitee.com/uploads/avatars/user/1671/5013229_lin0716_1587117839.png!avatar60',
          roles: token === 'TOKEN-admin' ? ['admin'] : ['user'],
          permissions: []
        })
      } else {
      }
    }
  },
  {
    url: '/mock/user/getUserRoutes',
    method: 'get',
    timeout: 300,
    response: () => {
      const token = localStorage.getItem('token')
      if (token) {
        return successResponseWrap(routesData)
      } else {
      }
    }
  }
]
