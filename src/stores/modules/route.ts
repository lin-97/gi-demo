import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import constantRoutes from '@/router/constant-routes'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import { getUserRoutes } from '@/apis'
import Has from '@/utils/has'
import { mapTree } from 'xe-utils'

// 匹配 views 里面所有的.vue文件
const modules = import.meta.glob('@/views/**/*.vue')

// 动态路由遍历，验证是否具备权限（暂时没用）
function filterPermRoutes(routes: RouteRecordRaw[]) {
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

/** 加载模块 */
export const loadView = (view: string) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

/** 遍历后台返回的路由，将 component 转成真正的模块 */
const filterAsyncRouter = (routes: RouteRecordRaw[]) => {
  routes?.sort((a, b) => (a?.meta?.sort ?? 0) - (b?.meta?.sort ?? 0))
  return mapTree(routes, (item) => {
    item.children?.sort((a, b) => (a?.meta?.sort ?? 0) - (b?.meta?.sort ?? 0))
    let componentView
    const component = item['component'] as unknown as string
    if (component === 'Layout') {
      componentView = Layout as never
    } else if (component === 'ParentView') {
      componentView = ParentView as never
    } else {
      componentView = loadView(component) as never
    }
    return {
      ...item,
      component: componentView
    }
  })
}

const storeSetup = () => {
  /** 所有路由（常驻路由 + 动态路由） */
  const routes = ref<RouteRecordRaw[]>([])

  const setRoutes = (value: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(value)
  }

  /** 生成路由 */
  const generateRoutes = (): Promise<RouteRecordRaw[]> => {
    return new Promise((resolve) => {
      // 向后端请求路由数据
      getUserRoutes().then((res) => {
        const data = JSON.parse(JSON.stringify(res.data))
        const asyncRoutes = filterAsyncRouter(data)
        setRoutes(asyncRoutes)
        resolve(asyncRoutes)
      })
    })
  }

  return {
    routes,
    generateRoutes
  }
}

export const useRouteStore = defineStore('route', storeSetup, { persist: true })
