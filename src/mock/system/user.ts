import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '@/mock/_utils'
import userData from '../_data/system_user'

export default [
  {
    url: '/mock/system/user/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const index = userData.findIndex((i) => i.id === id)
      if (index >= 0) {
        if (userData[index].id === '01') {
          return resultSuccess(userData[index])
        }
        if (userData[index].id === '02') {
          return resultSuccess(userData[index])
        }
      } else {
        return resultError(null, '没有该用户', 400)
      }
    }
  },
  {
    url: '/mock/system/user/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/user/delete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  },
  {
    url: '/mock/system/user', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 100,
    response: () => {
      return resultSuccess({
        total: userData.length,
        records: userData
      })
    }
  }
] as MockMethod[]
