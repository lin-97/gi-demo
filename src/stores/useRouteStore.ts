/**
 * @file 路由状态管理模块
 * @description 处理动态路由的加载、格式化和状态管理
 */

import type { RouteRecordRaw } from 'vue-router'
import type { ListItem } from '@/apis/system/menu'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mapTree } from 'xe-utils'
import { getUserRoutes } from '@/apis/user'
import { constantRoutes } from '@/router'
import { transformPathToName } from '@/utils'
import Message from '@/views/demo/examples/fn-component/Message/Message.vue'

/**
 * 布局组件
 * 用于页面整体布局结构
 */
const Layout = () => import('@/layout/index.vue')

/**
 * 视图模块映射
 * 自动导入 views 目录下的所有 .vue 文件
 * 用于动态加载路由组件
 */
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * 组件路径映射缓存
 * 将视图路径映射到对应的模块加载函数，避免每次遍历查找
 * key: 视图路径（如 'system/user/index'）
 * value: 模块加载函数
 */
const viewPathMap = new Map<string, () => Promise<any>>()

/**
 * 初始化组件路径映射
 * @description 在模块加载时构建路径映射表，提升查找效率
 */
function initViewPathMap() {
  if (viewPathMap.size > 0) return // 已初始化则跳过

  for (const path in modules) {
    // 提取视图路径：从 'src/views/system/user/index.vue' 提取 'system/user/index'
    const dir = path.split('views/')[1]?.split('.vue')[0]
    if (dir) {
      viewPathMap.set(dir, () => modules[path]())
    }
  }
}

// 初始化路径映射
initViewPathMap()

/**
 * 加载视图组件
 * @description 根据路径加载对应的视图组件，使用 Map 缓存提升查找效率
 * @param {string} view - 组件路径（相对于 views 目录）
 * @returns {Function|undefined} 返回组件的加载函数或 undefined
 * @example
 * loadView('system/user/index')
 */
export const loadView = (view: string) => {
  return viewPathMap.get(view)
}

/**
 * 转换组件标识为实际组件
 * @description 将字符串类型的组件标识转换为实际的组件
 * @param {string} component - 组件标识
 * @returns {Function} 返回组件的加载函数
 * @example
 * transformComponentView('Layout')
 * transformComponentView('system/user/index')
 */
const transformComponentView = (component: string) => {
  if (component === 'Layout') {
    return Layout as never
  } else {
    return loadView(component) as never
  }
}

/**
 * 格式化异步路由配置
 * @description 处理后端返回的菜单数据，转换为路由配置
 * @param {MenuItem[]} menus - 后端返回的菜单数据（已经过权限过滤）
 * @returns {RouteRecordRaw[]} 返回格式化后的路由配置数组
 *
 * @remarks
 * 1. 对菜单数据进行排序（根据 sort 字段）
 * 2. 将字符串类型的组件标识转换为实际组件
 * 3. 处理路由元数据（meta）
 *
 * @example
 * const routes = formatAsyncRoutes([
 *   {
 *     path: '/system',
 *     component: 'Layout',
 *     children: [...]
 *   }
 * ])
 */
const formatAsyncRoutes = (menus: ListItem[]) => {
  if (!menus.length) return []

  // 对顶层菜单进行排序
  menus.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0))

  // 使用 mapTree 递归处理菜单树
  const routes = mapTree(menus, (item) => {
    // 对子菜单进行排序
    if (item.children && item.children.length) {
      item.children.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0))
    }

    // 转换为路由配置
    return {
      path: item.path,
      name: transformPathToName(item.path),
      component: item.component ? transformComponentView(item.component) : undefined,
      redirect: item.redirect,
      meta: {
        hidden: item.hidden, // 是否在菜单中隐藏
        keepAlive: item.keepAlive, // 是否缓存该路由
        title: item.title, // 路由标题，用于显示在菜单和标签页
        icon: item.icon, // 图标
        affix: item.affix, // 是否固定在标签页
        breadcrumb: item.breadcrumb, // 是否显示在面包屑
        showInTabs: item.showInTabs, // 是否显示在标签页
        activeMenu: item.activeMenu, // 激活的菜单项
        alwaysShow: item.alwaysShow // 是否总是显示
      }
    }
  })
  return routes as RouteRecordRaw[]
}

/**
 * 路由状态管理的核心逻辑
 * @description 管理路由相关的状态和操作
 */
const storeSetup = () => {
  /**
   * 所有路由配置
   * 包含常驻路由和动态路由
   */
  const routes = ref<RouteRecordRaw[]>([])

  /**
   * 动态路由配置
   * 根据用户权限动态生成的路由
   */
  const asyncRoutes = ref<RouteRecordRaw[]>([])

  /**
   * 合并路由配置
   * @description 将动态路由与常驻路由合并
   * @param {RouteRecordRaw[]} data - 动态路由配置
   */
  const setRoutes = (data: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(data)
    asyncRoutes.value = data
  }

  /**
   * 生成路由配置
   * @description 获取用户路由权限并生成路由配置
   * @returns {Promise<RouteRecordRaw[]>} 返回生成的路由配置
   * @throws {Error} 当路由生成失败时返回空数组
   */
  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    try {
      // 获取用户路由权限数据
      const res = await getUserRoutes()
      const asyncRoutes = formatAsyncRoutes(res.data)
      setRoutes(asyncRoutes)
      return cloneDeep(asyncRoutes)
    } catch (error) {
      Message.error(`路由生成失败-${error}`)
      return []
    }
  }

  return {
    routes,
    asyncRoutes,
    generateRoutes
  }
}

/**
 * 路由状态管理 Store
 * @description 创建路由相关的状态管理 store，启用持久化存储
 */
export const useRouteStore = defineStore('route', storeSetup, { persist: true })
