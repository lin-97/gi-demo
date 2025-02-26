import { findTree } from 'xe-utils'
import { defineMock } from '../_base'
import { getDelayTime, resultError, resultSuccess } from '../_utils'
import deptData from '../_data/system_dept'

export default defineMock([
  {
    url: '/system/dept/getDeptDetail',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/dept/getDeptList', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess(deptData)
    }
  }
])
