import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { type RouteRecordRaw } from 'vue-router'
import router, { constantRoutes, asyncRoutes as dynamicRoutes } from '@/router'
import asyncRouteSettings from '@/config/async-route'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import { getUserRouters } from '@/apis'
import has from '@/utils/has'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route: any) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap: any, lastRouter = false) {
  var children: any = []
  childrenMap.forEach((el: any, index: number) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c: any) => {
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
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: any) {
  const res: any = []
  routes.forEach((route: any) => {
    if (route.permissions) {
      if (has.hasPermOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (has.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
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
  const routes = ref<any>([])
  const addRoutes = ref<any>([])
  const defaultRoutes = ref<any>([])
  const topbarRouters = ref<any>([])
  const sidebarRouters = ref<any>([])

  const setRoutes = (routes: any) => {
    addRoutes.value = routes
    routes.value = constantRoutes.concat(routes)
  }

  const setDefaultRoutes = (routes: any) => {
    defaultRoutes.value = constantRoutes.concat(routes)
  }

  const setTopbarRoutes = (routes: any) => {
    topbarRouters.value = routes
  }

  const setSidebarRouters = (routes: any) => {
    sidebarRouters.value = routes
  }

  const generateRoutes = () => {
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
        asyncRoutes.forEach((route: any) => {
          router.addRoute(route)
        })
        setRoutes(rewriteRoutes)
        setSidebarRouters(constantRoutes.concat(sidebarRoutes))
        setDefaultRoutes(sidebarRoutes)
        setTopbarRoutes(defaultRoutes)
        resolve(rewriteRoutes)
      })
    })
  }

  return {
    routes,
    addRoutes,
    defaultRoutes,
    topbarRouters,
    sidebarRouters,
    generateRoutes
  }
}

export const usePermissionStore = defineStore('permission', storeSetup, { persist: true })
