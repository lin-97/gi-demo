declare namespace Menu {
  interface MenuItem {
    id: string
    name: string
    icon?: string
    path?: string
    children?: MenuItem[]
    keepAlive?: boolean
    hidden?: boolean
  }
}
