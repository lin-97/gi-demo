import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import router, { constantRoutes, asyncRoutes as dynamicRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import { getUserRouters } from '@/apis'
import Has from '@/utils/has'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(
  asyncRouterMap: RouteRecordRaw[],
  lastRouter: boolean | RouteRecordRaw = false,
  type = false
) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component && typeof route.component === 'string') {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children !== null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap: RouteRecordRaw[], lastRouter: boolean | RouteRecordRaw = false) {
  let children: RouteRecordRaw[] = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (typeof el.component === 'string' && el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c: RouteRecordRaw) => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter && typeof lastRouter === 'object') {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: RouteRecordRaw[]) {
  const arr: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.meta?.permissions) {
      if (Has.hasPermOr(route.meta?.permissions)) {
        arr.push(route)
      }
    } else if (route.meta?.roles) {
      if (Has.hasRoleOr(route.meta?.roles)) {
        arr.push(route)
      }
    }
  })
  return arr
}

export const loadView = (view: any) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

const storeSetup = () => {
  const routes = ref<RouteRecordRaw[]>([]) // 常驻路由 + 动态路由（这时候component已经从字符串转为模块）
  const defaultRoutes = ref<RouteRecordRaw[]>([]) // 动态路由
  const topbarRouters = ref<RouteRecordRaw[]>([])
  const sidebarRouters = ref<RouteRecordRaw[]>([]) // 侧边栏路由

  const setRoutes = (routesArray: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(routesArray)
  }

  const setDefaultRoutes = (routes: RouteRecordRaw[]) => {
    defaultRoutes.value = constantRoutes.concat(routes)
  }

  const setTopbarRoutes = (routes: RouteRecordRaw[]) => {
    topbarRouters.value = routes
  }

  const setSidebarRouters = (routes: RouteRecordRaw[]) => {
    sidebarRouters.value = routes
  }

  /** 生成路由 */
  const generateRoutes = (): Promise<RouteRecordRaw[]> => {
    return new Promise((resolve) => {
      // 向后端请求路由数据
      getUserRouters().then((res) => {
        const sdata = JSON.parse(JSON.stringify(res.data))
        const rdata = JSON.parse(JSON.stringify(res.data))
        const defaultData = JSON.parse(JSON.stringify(res.data))
        const sidebarRoutes = filterAsyncRouter(sdata)
        const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        const defaultRoutes = filterAsyncRouter(defaultData)
        const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
        asyncRoutes.forEach((route) => {
          router.addRoute(route)
        })
        setRoutes(rewriteRoutes)
        console.log('常驻路由constantRoutes', constantRoutes)
        setSidebarRouters(constantRoutes.concat(sidebarRoutes))
        setDefaultRoutes(sidebarRoutes)
        setTopbarRoutes(defaultRoutes)
        resolve(rewriteRoutes)
      })
    })
  }

  return {
    routes,
    defaultRoutes,
    topbarRouters,
    sidebarRouters,
    generateRoutes
  }
}

export const usePermissionStore = defineStore('permission', storeSetup, { persist: true })
