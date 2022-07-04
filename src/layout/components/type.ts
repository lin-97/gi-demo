export interface MenuItem {
  id: string
  name: string
  icon?: string
  path?: string
  children?: MenuItem[]
  keepAlive?: boolean
  hidden?: boolean
}

export interface NavTabItem {
  name: string
  path: string
  componentName: string
}
