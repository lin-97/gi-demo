import Mock from 'mockjs'

/** 返回成功数据 */
export const successResponseWrap = (data: unknown) => {
  return Mock.mock({
    code: 200,
    data,
    message: '请求成功',
    success: true
  })
}

/** 返回失败数据 */
export const failResponseWrap = (data: unknown, message: string, code = 500) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false
  })
}
