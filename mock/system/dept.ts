import { findTree } from 'xe-utils'
import { defineMock } from '../_base'
import deptData from '../_data/system_dept'
import { getBaseApi, resultError, resultSuccess } from '../_utils'

export default defineMock([
  ...getBaseApi({
    baseUrl: '/system/dept',
    getListData: () => {
      return resultSuccess(deptData)
    },
    getDetailData: (query) => {
      const { id } = query
      const obj = findTree(deptData, (i) => i.id === id)
      if (obj.item) {
        return resultSuccess(obj.item)
      } else {
        return resultError(null, '没有该部门', 400)
      }
    }
  })
])
