import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import { getUserAsyncRoutes } from '@/apis'
import Has from '@/utils/has'
import { mapTree } from 'xe-utils'

// 匹配 views 里面所有的.vue文件
const modules = import.meta.glob('@/views/**/*.vue')

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
  return mapTree(routes, (item) => {
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
      /**
       * @description 向后端请求路由数据 这个接口已经帮把路由排序好了，和根据用户角色过滤了路由
       * @description 后端根据用户角色过滤路由显得比较安全些
       *  */
      getUserAsyncRoutes().then((res) => {
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
