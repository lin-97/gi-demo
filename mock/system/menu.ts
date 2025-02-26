import { findTree, mapTree } from 'xe-utils'
import { defineMock } from '../_base'
import { USER_TOKENS, filterTree, getDelayTime, isAdmin, resultError, resultSuccess } from '../_utils'
import menuData from '../_data/system_menu'
import type { MockSystemMenuItem } from '../_data/_type'

export default defineMock([
  {
    url: '/user/getUserRoutes',
    method: 'get',
    timeout: getDelayTime(),
    response: ({ headers }) => {
      const token = headers.token
      if (token && USER_TOKENS.includes(token)) {
        const roles = isAdmin(token) ? ['role_admin'] : ['role_user']
        // 如果是超级管理员角色
        if (roles.includes('role_admin')) {
          const data = filterTree<MockSystemMenuItem>(JSON.parse(JSON.stringify(menuData)), (i) =>
            [1, 2].includes(i.type))
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
    url: '/system/menu/getMenuDetail',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/menu/getMenuOptions',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/menu/getMenuList', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess(mapTree(JSON.parse(JSON.stringify(menuData)), (i) => ({ ...i })))
    }
  }
])
