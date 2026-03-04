interface AnyObject {
  [key: string]: unknown
}

interface Options {
  value: unknown
  label: string
}

interface NodeOptions extends Options {
  children?: NodeOptions[]
}

type TimeRanger = [string, string]

/** 系统管理通用状态 与字典 STATUS 一致，'0' 禁用 '1' 启用 */
type Status = '0' | '1'

/** 性别 与字典 GENDER 一致，'1' 男 '2' 女 '3' 保密 */
type Gender = '1' | '2' | '3'

/** 接口需要的分页参数 */
type Pagination = { page: number, size: number }
