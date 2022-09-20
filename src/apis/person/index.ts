import http from '@/utils/http'
import qs from 'qs'
const prefix = '/mock'
import type { PersonItem } from './type'

/** @desc 获取人物列表 */
export function getPersonList(data: Pagination) {
  return http.get<ApiRes<ApiListData<PersonItem[]>>>(`${prefix}/person/list`, data)
}

/** @desc 获取人物列表, 如果想要以表单数据格式发请求, 可以用以下方式定义接口 */
export function getPersonListByFormData(data: Pagination) {
  return http.get<ApiRes<ApiListData<PersonItem[]>>>(`${prefix}/person/list`, qs.stringify(data), {
    'Content-Type': 'application/x-www-form-urlencoded'
  })
}
