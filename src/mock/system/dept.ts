import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '@/mock/_utils'
import { findTree } from 'xe-utils'
import deptData from '../_data/system_dept'

export default [
  {
    url: '/mock/system/dept/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const obj = findTree(deptData, (i) => i.id === id)
      if (obj.item) {
        return resultSuccess(obj.item)
      } else {
        return resultError(null, '没有该部门', 400)
      }
    }
  },
  {
    url: '/mock/system/dept/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/dept', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 100,
    response: () => {
      return resultSuccess(deptData)
    }
  }
] as MockMethod[]
