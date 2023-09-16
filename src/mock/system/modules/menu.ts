import { successResponseWrap, failResponseWrap } from '@/mock/mock'
import type { MockMethod } from 'vite-plugin-mock'
import { menus } from './data/menu'
import { filterTree, mapTree } from 'xe-utils'
import { upperCase } from 'lodash'

/**
 * @description path 转 name
 * @demo /system => System
 * @demo /system/menu => SystemMenu
 */
const getPathToName = (path: string) => {
  let name = ''
  if (path) {
    let arr = path
      .split('/')
      .filter((i) => i)
      .map((i) => i.substring(0, 1).toUpperCase() + i.substring(1))
    arr.forEach((i) => {
      name += i
    })
  }
  return name
}

export default [
  {
    url: '/mock/system/menu',
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      const token = headers.token
      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        const isAdmin = token === 'TOKEN-admin'
        return isAdmin
          ? successResponseWrap(mapTree(menus, (i) => ({ ...i, affix: true })))
          : successResponseWrap(filterTree(menus, (i) => i.path !== '/system'))
      } else {
        return failResponseWrap(null, 'token失效', 401)
      }
    }
  },
  {
    url: '/mock/user/routes',
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      // 过滤状态开启的路由
      const statusRoutes = filterTree(menus, (i) => i.status === 1)
      // 序列化
      const orderRoutes = JSON.parse(JSON.stringify(statusRoutes))
      const routes = mapTree(menus, (item) => {
        const meta: any = {
          hidden: item.hidden,
          keepAlive: item.keepAlive
        }
        if (item.title) {
          meta.title = item.title
        }
        if (item.svgIcon) {
          meta.svgIcon = item.svgIcon
        }
        if (item.icon) {
          meta.icon = item.icon
        }
        if (item.affix === false) {
          meta.affix = item.affix
        }
        if (item.activeMenu) {
          meta.activeMenu = item.activeMenu
        }
        if (item.type === 2) {
          meta.roles = item.roles?.length ? item.roles : []
          meta.permissions = item.permissions?.length ? item.permissions : []
        }
        return {
          component: item.component,
          path: item.path,
          name: getPathToName(item.path),
          meta: meta,
          redirect: item.redirect
        }
      })

      const token = headers.token
      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        const isAdmin = token === 'TOKEN-admin'
        return isAdmin
          ? successResponseWrap(routes)
          : successResponseWrap(filterTree(routes, (i) => i.path !== '/system'))
      } else {
        return failResponseWrap(null, 'token失效', 401)
      }
    }
  }
] as MockMethod[]
