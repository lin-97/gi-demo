import http from '@/utils/http'
import { prefix } from '../config'

/** @desc 请求成功的接口 */
export function getTestSuccess() {
  return http.get<ApiRes<string>>(`${prefix}/test/success`)
}

/** @desc 请求失败的接口 */
export function getTestFail() {
  return http.get<ApiRes<any>>(`${prefix}/test/fail`)
}
