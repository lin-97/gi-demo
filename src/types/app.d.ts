declare namespace App {
  interface MenuItem {
    id: string
    name: string
    icon?: string
    path?: string
    children?: MenuItem[]
  }
}
