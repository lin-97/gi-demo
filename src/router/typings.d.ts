import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[] // 对页面具有访问权限的角色
    requiresAuth: boolean // 是否需要登录才能访问当前页面(每个路由必须声明)
    icon?: string // 菜单的图标
    locale?: string // 区域名称显示在侧边菜单和面包屑中
    hideInMenu?: boolean // 如果为真，则不会显示在侧边菜单中
    hideChildrenInMenu?: boolean // 如果设置为true，子菜单不会显示在侧边菜单中
    activeMenu?: string // 如果设置了名称，菜单将根据您设置的名称高亮显示
    order?: number // 排序路由菜单项。如果set key，值越高，越正向
    noAffix?: boolean // 如果设置为true，标签将不会粘贴在选项卡栏中
    keepAlive?: boolean // 如果设置为true，页面将不会被缓存
  }
}
