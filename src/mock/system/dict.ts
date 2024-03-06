import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '@/mock/_utils'
import dictData from '../_data/system_dict'

export default [
  {
    url: '/mock/system/dict/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const obj = dictData.find((i) => i.id === id)
      if (obj) {
        return resultSuccess(obj)
      } else {
        return resultError(null, '没有该用户', 400)
      }
    }
  },
  {
    url: '/mock/system/dict/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/dict/delete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  },
  {
    url: '/mock/system/dict/dataList',
    method: 'get',
    timeout: 350,
    response: ({ query }) => {
      const { code } = query
      const obj = dictData.find((i) => i.code === code)
      if (obj) {
        return resultSuccess({
          total: obj.list.length,
          records: obj.list
        })
      }
    }
  },
  {
    url: '/mock/system/dict/dataDelete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  },
  {
    url: '/mock/system/dict/dataSave',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/dict/dataDetail',
    method: 'get',
    timeout: 350,
    response: ({ query }) => {
      const { id, code } = query
      const obj = dictData.find((i) => i.code === code)
      if (!obj) {
        return resultError(null, '无法查找数据！', 403)
      }
      const item = obj.list.find((i) => i.id === id)
      if (!item) {
        return resultError(null, '无法查找数据！', 403)
      }
      return resultSuccess(item)
    }
  },
  {
    url: '/mock/system/dict', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 100,
    response: () => {
      return resultSuccess({
        total: dictData.length,
        records: dictData
      })
    }
  }
] as MockMethod[]
