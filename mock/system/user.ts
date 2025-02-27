import { defineMock } from '../_base'
import { getDelayTime, resultError, resultSuccess } from '../_utils'
import userData from '../_data/system_user'

export default defineMock([
  {
    url: '/system/user/getUserDetail',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/user/getUserList', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess({
        total: userData.length,
        records: userData
      })
    }
  }
])
