import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError, USER_TOKENS, isAdmin } from '@/mock/_utils'
import { mapTree, findTree } from 'xe-utils'
import { filterTree } from '@/utils'
import menuData from '../_data/system_menu'
import type { MockSystemMenuItem } from '../_data/_type'

export default [
  {
    url: '/mock/user/routes',
    method: 'get',
    timeout: 50,
    response: ({ headers }) => {
      const token = headers.token
      if (token && USER_TOKENS.includes(token)) {
        const roles = isAdmin(token) ? ['role_admin'] : ['role_user']
        // 如果是超级管理员角色
        if (roles.includes('role_admin')) {
          const data = filterTree<MockSystemMenuItem>(JSON.parse(JSON.stringify(menuData)), (i) =>
            [1, 2].includes(i.type)
          )
          return resultSuccess(data)
        }
        // 如果是普通用户角色
        if (roles.includes('role_user')) {
          const data = filterTree<MockSystemMenuItem>(JSON.parse(JSON.stringify(menuData)), (i) => {
            return i.path !== '/system' && i.roles.some((i) => roles.includes(i)) && [1, 2].includes(i.type)
          })
          return resultSuccess(data)
        }
        return resultSuccess([])
      } else {
        return resultError(null, 'token失效', 401)
      }
    }
  },
  {
    url: '/mock/system/menu/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const obj = findTree(menuData, (i) => i.id === id)
      if (obj.item) {
        return resultSuccess(obj.item)
      } else {
        return resultError(null, '没有该部门', 400)
      }
    }
  },
  {
    url: '/mock/system/menu/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/menu/options',
    method: 'get',
    timeout: 350,
    response: () => {
      const data = mapTree(JSON.parse(JSON.stringify(menuData)), (i) => ({
        id: i.id,
        title: i.title,
        children: i.children
      }))
      return resultSuccess(data)
    }
  },
  {
    url: '/mock/system/menu', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 10,
    response: () => {
      return resultSuccess(mapTree(JSON.parse(JSON.stringify(menuData)), (i) => ({ ...i })))
    }
  }
] as MockMethod[]
