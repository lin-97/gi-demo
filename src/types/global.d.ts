// 分页
type Pagination = {
  current: number
  pageSize: number
}

// 菜单项
interface MenuItem {
  id: string
  name: string
  icon?: string
  path?: string
  children?: MenuItem[]
  keepAlive?: boolean
  hidden?: boolean
}

// 导航标签项
interface NavTabItem {
  name: string
  path: string
  componentName: string
}

// 接口返回数据格式
interface HttpResponse<T = unknown> {
  code: number
  message: string
  data: T
  success: boolean
}

// 接口返回的列表数据
interface IResListData<T> {
  total: number
  list: T
  [propName: string]: unknown
}

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

interface GetParams {
  body: null
  type: string
  url: string
}

interface PostData {
  body: string
  type: string
  url: string
}

type TimeRanger = [string, string]

interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}
