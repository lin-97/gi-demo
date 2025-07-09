import { getBaseApi } from '../base'
import type * as T from './type'

export type * from './type'

/** 人物模块 */
export const baseAPI = getBaseApi<T.ListItem>({ baseUrl: '/person' })
