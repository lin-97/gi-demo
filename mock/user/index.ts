import { defineMock } from '../_base'
import { type MockTokenItem, USER_TOKENS, getDelayTime, isAdmin, resultError, resultSuccess } from '../_utils'
import userData from '../_data/system_user'

export default defineMock([
  {
    url: '/user/login',
    method: 'post',
    timeout: getDelayTime(),
    response: ({ body }) => {
      const { username, password } = body
      if (!username) return resultError(null, '用户名不能为空', 50000)
      if (!password) return resultError(null, '密码不能为空', 50000)
      if (username === 'admin' && password === '123456') {
        const token: MockTokenItem = 'token_admin'
        return resultSuccess({ token })
      }
      if (username === 'user' && password === '123456') {
        const token: MockTokenItem = 'token_user'
        return resultSuccess({ token })
      }
      return resultError(null, '账号或者密码错误', 50000)
    }
  },
  {
    url: '/user/logout',
    method: 'post',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess(null)
    }
  },
  {
    url: '/user/getUserInfo',
    method: 'get',
    timeout: getDelayTime(),
    response: ({ headers }) => {
      const token = headers.token
      if (token && USER_TOKENS.includes(token)) {
        const userList = userData.map((i) => ({
          id: i.id,
          nickname: i.nickname,
          avatar: i.avatar,
          roles: i.roleIds,
          permissions: i.permissions
        }))
        return resultSuccess(isAdmin(token) ? userList[0] : userList[1])
      } else {
        return resultError(null, 'token失效', 401)
      }
    }
  }
])
