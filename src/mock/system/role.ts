import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '@/mock/_utils'
import { eachTree } from 'xe-utils'
import menuData from '../_data/system_menu'
import roleData from '../_data/system_role'

export default [
  {
    url: '/mock/system/role/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const index = roleData.findIndex((i) => i.id === id)
      if (index >= 0) {
        return resultSuccess(roleData[index])
      } else {
        return resultError(null, '没有该角色', 400)
      }
    }
  },
  {
    url: '/mock/system/role/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/role/delete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  },
  {
    url: '/mock/system/role/menuIds',
    method: 'get',
    timeout: 350,
    response: ({ query }) => {
      const { role } = query
      if (role === 'role_user') {
        const arr: string[] = []
        eachTree(JSON.parse(JSON.stringify(menuData)), (i) => {
          if (!['08101', '0810204', '0810205', '0810206'].includes(i.id) && !i.path.startsWith('/system')) {
            arr.push(i.id)
          }
        })
        return resultSuccess(arr)
      }
      if (role === 'role_user2') {
        return resultSuccess([])
      }
    }
  },
  {
    url: '/mock/system/role', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 100,
    response: () => {
      return resultSuccess({
        total: roleData.length,
        records: roleData
      })
    }
  }
] as MockMethod[]
