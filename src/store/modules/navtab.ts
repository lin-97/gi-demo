import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

const defaultTabItem: NavTabItem = { name: '首页', path: '/dashboard/workplace', componentName: 'Home' }

const storeSetup = () => {
  const tagList = ref<NavTabItem[]>([defaultTabItem]) // 保存页签tab的数组
  const cacheList = ref<string[]>([]) // keep-alive缓存的数组, 元素是组件名

  // 添加一个页签, 如果当前路由已经打开, 则不再重复添加
  const addTagItem = (item: NavTabItem) => {
    const ignoreTagList = ['Login']
    if (ignoreTagList.includes(item.componentName)) return
    const flag = tagList.value.findIndex((i) => i.path === item.path)
    if (flag >= 0) return
    tagList.value.push(item)
  }
  // 删除一个页签
  const removeTagItem = (path: string) => {
    if (path === defaultTabItem.path) return
    const index = tagList.value.findIndex((item) => item.path === path)
    if (index >= 0) {
      const isActive = router.currentRoute.value.path === tagList.value[index]['path']
      tagList.value.splice(index, 1)
      if (isActive) {
        router.push({ path: tagList.value[tagList.value.length - 1]['path'] })
      }
    }
  }
  // 清空页签
  const clearTagList = () => {
    tagList.value = [defaultTabItem]
    router.push(defaultTabItem.path)
  }
  // 添加缓存页
  const addCacheItem = (componentName: string) => {
    if (cacheList.value.includes(componentName)) return
    cacheList.value.push(componentName)
  }
  // 删除一个缓存页
  const removeCacheItem = (componentName: string) => {
    const index = cacheList.value.findIndex((item) => item === componentName)
    if (index >= 0) {
      cacheList.value.splice(index, 1)
    }
  }
  // 清空缓存页
  const clearCacheList = () => {
    cacheList.value = []
  }
  // 关闭当前
  const closeCurrent = (key: string | number) => {
    const item = tagList.value.find((i) => i.path === key)
    removeTagItem(key.toString())
    if (item?.componentName) {
      removeCacheItem(item.componentName)
    }
  }
  // 关闭其他
  const closeOther = (key: string | number) => {
    const arr = tagList.value.filter((i) => i.path !== key)
    arr.forEach((item) => {
      removeTagItem(item.path)
      if (item?.componentName) {
        removeCacheItem(item.componentName)
      }
    })
  }
  // 关闭全部
  const closeAll = () => {
    clearTagList()
  }
  // 初始化
  const init = () => {
    clearTagList()
    clearCacheList()
  }

  return {
    tagList,
    cacheList,
    addTagItem,
    removeTagItem,
    clearTagList,
    addCacheItem,
    removeCacheItem,
    clearCacheList,
    closeCurrent,
    closeOther,
    closeAll,
    init
  }
}

export const useNavTabStore = defineStore('navTab', storeSetup, { persist: false })
