import { defineStore } from 'pinia'
import router from '@/router'

interface NavTabState {
  tagList: NavTabItem[]
  cacheList: string[]
}

const defaultTabItem: NavTabItem = { name: '首页', path: '/dashboard/workplace', componentName: 'Home' }

export const useNavTabStore = defineStore({
  id: 'NavTab', // 页签缓存
  state: (): NavTabState => {
    return {
      tagList: [defaultTabItem], // 保存页签tab的数组
      cacheList: [] // keep-alive缓存的数组, 元素是组件名
    }
  },
  getters: {},
  actions: {
    // 添加一个页签, 如果当前路由已经打开, 则不再重复添加
    addTagItem(item: NavTabItem) {
      const ignoreTagList = ['Login']
      if (ignoreTagList.includes(item.componentName)) return
      const flag = this.tagList.findIndex((i) => i.path === item.path)
      if (flag >= 0) return
      this.tagList.push(item)
    },
    // 删除一个页签
    removeTagItem(path: string) {
      if (path === defaultTabItem.path) return
      const index = this.tagList.findIndex((item) => item.path === path)
      if (index >= 0) {
        const isActive = router.currentRoute.value.path === this.tagList[index]['path']
        this.tagList.splice(index, 1)
        if (isActive) {
          router.push({ path: this.tagList[this.tagList.length - 1]['path'] })
        }
      }
    },
    // 清空页签
    clearTagList() {
      this.tagList = [defaultTabItem]
      router.push(defaultTabItem.path)
    },
    // 添加缓存页
    addCacheItem(componentName: string) {
      if (this.cacheList.includes(componentName)) return
      this.cacheList.push(componentName)
    },
    // 删除一个缓存页
    removeCacheItem(componentName: string) {
      const index = this.cacheList.findIndex((item) => item === componentName)
      if (index >= 0) {
        this.cacheList.splice(index, 1)
      }
    },
    // 清空缓存页
    clearCacheList() {
      this.cacheList = []
    },
    // 关闭当前
    closeCurrent(key: string | number) {
      const item = this.tagList.find((i) => i.path === key)
      this.removeTagItem(key.toString())
      if (item?.componentName) {
        this.removeCacheItem(item.componentName)
      }
    },
    // 关闭其他
    closeOther(key: string | number) {
      const arr = this.tagList.filter((i) => i.path !== key)
      arr.forEach((item) => {
        this.removeTagItem(item.path)
        if (item?.componentName) {
          this.removeCacheItem(item.componentName)
        }
      })
    },
    // 关闭全部
    closeAll() {
      this.clearTagList()
    },
    // 初始化
    init() {
      this.clearTagList()
      this.clearCacheList()
    }
  }
})
