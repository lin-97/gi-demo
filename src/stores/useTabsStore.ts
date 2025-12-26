/**
 * @file 标签页状态管理模块
 * @description 处理标签页（Tabs）的状态管理，包括页签的增删改查和缓存控制
 */

import type { RouteLocationNormalized, RouteRecordName } from 'vue-router'
import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

/**
 * 标签页 Store 的核心设置逻辑
 * @description 管理标签页相关的状态和操作
 */
const storeSetup = () => {
  const router = useRouter()

  /**
   * 标签页列表
   * 存储当前打开的所有标签页
   */
  const tabList = ref<RouteLocationNormalized[]>([])

  /**
   * 缓存组件列表
   * 存储需要被 keep-alive 缓存的组件名称
   */
  const cacheList = ref<RouteRecordName[]>([])

  /**
   * 页面重载标志
   * 用于控制页面的重新加载
   */
  const reloadFlag = ref(true)

  /**
   * 判断是否为首页
   */
  const isHomePath = (path: string) => path === '/' || path === '/home'

  /**
   * 获取所有固定标签页
   * @description 从路由中筛选出所有 affix: true 的固定标签页，首页排在最前面
   */
  const getAffixTabs = (): RouteLocationNormalized[] => {
    const tabs = router
      .getRoutes()
      .filter((route) => route.meta?.affix)
      .map((route) => route as unknown as RouteLocationNormalized)
    // 首页排在最前面
    tabs.sort((a, b) => Number(isHomePath(b.path)) - Number(isHomePath(a.path)))
    return tabs
  }

  /**
   * 更新缓存列表
   */
  const updateCache = (name: RouteRecordName | null | undefined, keepAlive: boolean | undefined) => {
    if (!name) return
    const hasCache = cacheList.value.includes(name)
    if (keepAlive && !hasCache) {
      cacheList.value.push(name)
    } else if (!keepAlive && hasCache) {
      const index = cacheList.value.findIndex((n) => n === name)
      if (index >= 0) cacheList.value.splice(index, 1)
    }
  }

  /**
   * 添加标签页
   * @description 添加新的标签页，如果已存在则更新，同时处理缓存
   */
  const addTabItem = (item: RouteLocationNormalized) => {
    const index = tabList.value.findIndex((i) => i.path === item.path)

    if (index >= 0) {
      // 更新已存在的标签页
      if (tabList.value[index].fullPath !== item.fullPath) {
        tabList.value[index] = item
      }
      updateCache(item.name, item.meta?.keepAlive)
    } else if (item.meta?.showInTabs ?? true) {
      // 添加新标签页
      tabList.value.push(item)
      updateCache(item.name, item.meta?.keepAlive)
    }
  }

  /**
   * 设置标签页标题
   */
  const setTabTitle = (title: string): boolean => {
    if (!title) return false
    const route = router.currentRoute.value
    const path = route?.fullPath || route.path
    const tab = tabList.value.find((i) => i.fullPath === path)
    if (tab) {
      tab.meta.title = title
      return true
    }
    return false
  }

  /**
   * 删除标签页并清理缓存
   */
  const removeTabByIndex = (index: number) => {
    if (index < 0 || index >= tabList.value.length) return
    const item = tabList.value[index]
    updateCache(item.name, false) // 删除缓存
    tabList.value.splice(index, 1)
  }

  /**
   * 跳转到指定标签页
   */
  const jumpToTab = (path: string) => {
    const tab = tabList.value.find((t) => t.path === path) ?? tabList.value[0]
    if (tab) router.push(tab.fullPath || tab.path)
  }

  /**
   * 获取固定标签页的缓存列表
   */
  const getAffixCacheList = (tabs: RouteLocationNormalized[]) => {
    return tabs.filter((tab) => tab.name && tab.meta?.keepAlive).map((tab) => tab.name!)
  }

  /**
   * 统一关闭标签页方法
   * @description 根据类型关闭标签页：left(左侧)、right(右侧)、other(其他)、all(全部)、current(当前)
   */
  const close = (type: string, path?: string) => {
    const currentPath = router.currentRoute.value.path
    const targetPath = path || currentPath
    const targetIndex = tabList.value.findIndex((i) => i.path === targetPath)

    // 关闭所有
    if (type === 'all') {
      const affixTabs = getAffixTabs()
      tabList.value = affixTabs
      cacheList.value = getAffixCacheList(affixTabs)
      router.push('/')
      return
    }

    // 关闭当前
    if (type === 'current') {
      if (targetIndex < 0 || tabList.value[targetIndex].meta?.affix) return
      removeTabByIndex(targetIndex)
      if (currentPath === targetPath && tabList.value.length) {
        jumpToTab(tabList.value[tabList.value.length - 1].path)
      }
      return
    }

    if (targetIndex < 0) return

    // 关闭左侧
    if (type === 'left') {
      for (let i = targetIndex - 1; i >= 0; i--) {
        if (!tabList.value[i].meta?.affix) removeTabByIndex(i)
      }
      return
    }

    // 关闭右侧
    if (type === 'right') {
      const currentIndex = tabList.value.findIndex((t) => t.path === currentPath)
      const willDeleteCurrent = currentIndex > targetIndex && !tabList.value[currentIndex]?.meta?.affix

      for (let i = tabList.value.length - 1; i > targetIndex; i--) {
        if (!tabList.value[i].meta?.affix) removeTabByIndex(i)
      }

      if (willDeleteCurrent && tabList.value.length) {
        jumpToTab(tabList.value[targetIndex].path)
      }
      return
    }

    // 关闭其他
    if (type === 'other') {
      for (let i = tabList.value.length - 1; i >= 0; i--) {
        const item = tabList.value[i]
        if (item.path !== targetPath && !item.meta?.affix) {
          removeTabByIndex(i)
        }
      }
      const currentExists = tabList.value.some((t) => t.path === currentPath)
      if (!currentExists && tabList.value.length) {
        jumpToTab(targetPath)
      }
    }
  }

  /**
   * 重置标签页状态
   * @description 清空标签页和缓存列表，保留固定标签页及其缓存
   */
  const reset = () => {
    const affixTabs = getAffixTabs()
    tabList.value = affixTabs
    cacheList.value = getAffixCacheList(affixTabs)
  }

  /**
   * 初始化标签页
   * @description 初始化标签页状态，如果没有非固定标签页则重置
   */
  const init = () => {
    if (tabList.value.some((i) => !i?.meta?.affix)) return
    reset()
  }

  /**
   * 重新加载当前页面
   * @description 清除当前页面的缓存并重新加载
   */
  const reloadPage = () => {
    const route = router.currentRoute.value
    if (!route.name) return

    updateCache(route.name, false) // 删除缓存
    reloadFlag.value = false

    nextTick(() => {
      reloadFlag.value = true
      updateCache(route.name, route.meta?.keepAlive) // 重新添加缓存
    })
  }

  return {
    tabList,
    cacheList,
    reloadFlag,
    addTabItem,
    setTabTitle,
    close,
    reset,
    init,
    reloadPage
  }
}

/**
 * 标签页状态管理 Store
 * @description 创建标签页相关的状态管理 store，使用 sessionStorage 进行持久化存储
 */
export const useTabsStore = defineStore('tabs', storeSetup, { persist: true })
