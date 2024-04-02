import { defineMock } from '../_base'
import { resultSuccess, resultError, getDelayTime } from '../_utils'
import dictData from '../_data/system_dict'

export default defineMock([
  {
    url: '/system/dict/detail',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/dict/dataList',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/dict/dataDetail',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/dict', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess({
        total: dictData.length,
        records: dictData
      })
    }
  }
])
