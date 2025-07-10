import type * as T from './type'
import { getBaseApi } from '@/apis/base'

export type * from './type'

/** 人物模块 */
export const baseAPI = getBaseApi<T.ListItem>({ baseUrl: '/person' })
