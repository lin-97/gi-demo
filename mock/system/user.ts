import { defineMock } from '../_base'
import userData from '../_data/system_user'
import { getBaseApi, resultError, resultSuccess } from '../_utils'

export default defineMock([
  ...getBaseApi({
    baseUrl: '/system/user',
    getListData: () => {
      return resultSuccess({
        total: userData.length,
        records: userData
      })
    },
    getDetailData: (query) => {
      const { id } = query
      const index = userData.findIndex((i) => i.id === id)
      if (index >= 0) {
        return resultSuccess(userData[index])
      } else {
        return resultError(null, '没有该用户', 400)
      }
    }
  })
])
