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

/** 系统管理通用状态 0禁用 1启用 */
type Status = 0 | 1

/** 性别 1男 2女 3保密 */
type Gender = 1 | 2 | 3

/** 接口需要的分页参数 */
type Pagination = { page: number, size: number }
