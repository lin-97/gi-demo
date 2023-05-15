import http from '@/utils/http'
import qs from 'qs'
import { prefix } from '../config'
import type * as Person from './type'

/** @desc 获取人物列表 */
export function getPersonList(data: { name?: string; status?: string; current: number; pageSize: number }) {
  return http.get<ApiListData<Person.PersonItem[]>>(`${prefix}/person/list`, data)
}

/** @desc 获取人物列表, 如果想要以表单数据格式发请求, 可以用以下方式定义接口 */
// export function getPersonListByFormData(data: { current: number; pageSize: number }) {
//   return http.get<ApiRes<ApiListData<PersonItem[]>>>(`${prefix}/person/list`, qs.stringify(data), {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   })
// }
