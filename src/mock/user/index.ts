import type { MockMethod } from 'vite-plugin-mock'
import { successResponseWrap, failResponseWrap } from '../mock'

import Analyse from './route-modules/analyse'
import Data from './route-modules/data'
import File from './route-modules/file'
import Form from './route-modules/form'
import Table from './route-modules/table'
import Error from './route-modules/error'
import Result from './route-modules/result'
import Demo from './route-modules/demo'
import About from './route-modules/about'
import Gitee from './route-modules/gitee'
import User from './route-modules/user'
import System from './route-modules/system'

const RoutesAdmin = [Analyse, Data, File, Form, Table, Error, Result, System, Demo, User, About, Gitee]
const RoutesUser = [Analyse, Data, File, Form, Table, Error, Result, Demo, User, About, Gitee]

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
        const isAdmin = token === 'TOKEN-admin'
        return successResponseWrap({
          name: isAdmin ? '管理员' : '木糖醇',
          avatar: isAdmin ? 'https://s1.ax1x.com/2022/07/05/jtMjGq.jpg' : 'https://s1.ax1x.com/2022/06/14/XhtSwF.jpg',
          roles: isAdmin ? ['admin'] : ['user'],
          permissions: isAdmin ? ['table:btn:edit'] : ['']
        })
      } else {
        return failResponseWrap(null, 'token失效', 401)
      }
    }
  },
  {
    url: '/mock/user/getUserRoutes',
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      const token = headers.token
      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        const isAdmin = token === 'TOKEN-admin'
        return isAdmin ? successResponseWrap(RoutesAdmin) : successResponseWrap(RoutesUser)
      } else {
        return failResponseWrap(null, 'token失效', 401)
      }
    }
  }
] as MockMethod[]
