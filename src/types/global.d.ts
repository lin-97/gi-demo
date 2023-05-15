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
