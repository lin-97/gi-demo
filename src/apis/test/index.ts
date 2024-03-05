import http from '@/utils/http'

/** @desc 请求成功的接口 */
export function getTestSuccess() {
  return http.get<string>('/test/success')
}

/** @desc 请求失败的接口 */
export function getTestFail() {
  return http.get<any>('/test/fail')
}
