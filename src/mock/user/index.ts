import type { MockMethod } from 'vite-plugin-mock'
import { successResponseWrap, failResponseWrap } from '../mock'

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
      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        const admin = {
          id: '01',
          nickname: '管理员',
          avatar: 'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          roles: ['role_admin'],
          permissions: ['*:*:*']
        }
        const user = {
          id: '02',
          nickname: '木糖醇',
          avatar: 'https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          roles: ['role_user'],
          permissions: ['user:btn:add', 'user:btn:edit', 'user:btn:delete']
        }
        const isAdmin = token === 'TOKEN-admin'
        return successResponseWrap(isAdmin ? admin : user)
      } else {
        return failResponseWrap(null, 'token失效', 401)
      }
    }
  }
] as MockMethod[]
