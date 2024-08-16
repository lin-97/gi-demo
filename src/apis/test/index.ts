import http from '@/utils/http'

/** 请求成功的接口 */
export function getTestSuccess() {
  return http.get<string>('/test/success')
}

/** 请求失败的接口 */
export function getTestFail() {
  return http.get<any>('/test/fail')
}
