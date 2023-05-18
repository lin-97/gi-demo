import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

/**
 * @desc 动态路由
 * @desc 用来放置有权限 (Roles 属性) 的路由
 * @desc 必须带有 Name 属性
 */

export const asyncRoutes = []

export default asyncRoutes
