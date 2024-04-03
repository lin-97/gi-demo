import http from '@/utils/http'
import type * as Person from './type'
// import qs from 'qs'

/** @desc 获取人物列表 */
export function getPersonList(data: { name?: string; status?: string; current: number; pageSize: number }) {
  return http.get<PageRes<Person.PersonItem[]>>('/person/list', data)
}

/** @desc 初始化人物表单 */
export function initPerson() {
  return http.get<any>('/person/init')
}

/** @desc 获取人物详情 */
export function getPersonById(params: { id: string }) {
  return http.get<any>('/person/detail', params)
}

/** @desc 新增人物 */
export function addPerson(data: any) {
  return http.post<any>('/person/add', data)
}

/** @desc 修改人物 */
export function updatePerson(data: any) {
  return http.post<any>('/person/update', data)
}

/** @desc 获取人物列表, 如果想要以表单数据格式发请求, 可以用以下方式定义接口 */
// export function getPersonListByFormData(data: { current: number; pageSize: number }) {
//   return http.get<ApiRes<PageRes<Person.PersonItem[]>>>('/person/list', qs.stringify(data), {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }
