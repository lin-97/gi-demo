import { eachTree } from 'xe-utils'
import { defineMock } from '../_base'
import { getDelayTime, resultError, resultSuccess } from '../_utils'
import menuData from '../_data/system_menu'
import roleData from '../_data/system_role'

export default defineMock([
  {
    url: '/system/role/getRoleDetail',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/role/getRoleMenuIds',
    method: 'get',
    timeout: getDelayTime(),
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
    url: '/system/role/getRoleList', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess({
        total: roleData.length,
        records: roleData
      })
    }
  }
])
