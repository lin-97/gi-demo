import type { MockMethod } from 'vite-plugin-mock'
import { successResponseWrap, failResponseWrap } from '@/mock/mock'
import { menus } from './data/menu'
import { mapTree, findTree } from 'xe-utils'

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

const filterUserTree = (value: typeof menus) => {
  const arr = value.filter((i) => i.path !== '/system')
  const data = mapTree(arr, (i) => {
    if (i.children && i.children.length) {
      i.children.filter((i) => i.path !== '/system')
    }
    return i
  })
  return data
}

export default [
  {
    url: '/mock/user/routes',
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      const token = headers.token
      const isAdmin = token === 'TOKEN-admin'
      const data = isAdmin ? menus : filterUserTree(menus)
      const routes = mapTree(data, (item) => {
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
        if (item.breadcrumb === false) {
          meta.breadcrumb = item.breadcrumb
        }
        if (item.alwaysShow === true) {
          meta.alwaysShow = item.alwaysShow
        }
        meta.roles = item.roles?.length ? item.roles : []
        meta.permissions = item.permissions?.length ? item.permissions : []

        return {
          component: item.component,
          path: item.path,
          name: getPathToName(item.path),
          meta: meta,
          redirect: item.redirect
        }
      })

      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        return successResponseWrap(routes)
      } else {
        return failResponseWrap(null, 'token失效', 401)
      }
    }
  },
  {
    url: '/mock/system/menu/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      let obj = findTree(menus, (i) => i.id === id)
      if (obj.item) {
        return successResponseWrap(obj.item)
      } else {
        return failResponseWrap(null, '没有该部门', 400)
      }
    }
  },
  {
    url: '/mock/system/menu/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return successResponseWrap(true)
    }
  },
  {
    url: '/mock/system/menu', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      const token = headers.token
      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        const isAdmin = token === 'TOKEN-admin'
        return isAdmin
          ? successResponseWrap(mapTree(menus, (i) => ({ ...i })))
          : successResponseWrap(filterUserTree(menus))
      } else {
        return failResponseWrap(null, 'token失效', 401)
      }
    }
  }
] as MockMethod[]
