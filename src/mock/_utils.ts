import Mock from 'mockjs'

/** 返回成功数据 */
export const resultSuccess = (data: unknown) => {
  return Mock.mock({
    code: 200,
    data,
    message: '请求成功',
    success: true
  })
}

/** 返回失败数据 */
export const resultError = (data: unknown, message: string, code = 500) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false
  })
}

export type MockTokenItem = 'token_admin' | 'token_user'
/** 目前模拟的token主要以下2个 */
export const USER_TOKENS: MockTokenItem[] = ['token_admin', 'token_user']

/** 判断是否是管理员 */
export const isAdmin = (token: string) => {
  return token === 'token_admin'
}
