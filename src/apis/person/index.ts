import type * as T from './type'
import http from '@/utils/http'
// import qs from 'qs'
export type * from './type'

/** 获取人物列表 */
export function getPersonList(data: { name?: string, status?: string } & Pagination) {
  return http.get<PageRes<T.PersonItem[]>>('/person/list', data)
}

/** 初始化人物表单 */
export function initPerson() {
  return http.get('/person/init')
}

/** 获取人物详情 */
export function getPersonById(params: { id: string }) {
  return http.get('/person/detail', params)
}

/** 新增人物 */
export function addPerson(data: any) {
  return http.post('/person/add', data)
}

/** 修改人物 */
export function updatePerson(data: any) {
  return http.post('/person/update', data)
}

/** 获取人物列表, 如果想要以表单数据格式发请求, 可以用以下方式定义接口 */
// export function getPersonListByFormData(data: Pagination) {
//   return http.get<ApiRes<PageRes<T.PersonItem[]>>>('/person/list', qs.stringify(data), {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }
