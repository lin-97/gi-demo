import Mock from 'mockjs'

export const successResponseWrap = (data: unknown) => {
  return Mock.mock({
    code: 200,
    data,
    message: '请求成功',
    success: true
  })
}

export const failResponseWrap = (data: unknown, message: string, code = 500) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false
  })
}
