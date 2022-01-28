import { defineStore } from 'pinia'
import router from '@/router'
console.log('router', router)

type TabListItem = {
  name: string
  path: string
  componentName: string
}

interface NavTabState {
  tabList: TabListItem[]
  cacheList: string[]
}

const defaultTabItem = { name: '首页', path: '/home', componentName: 'Home' }

export const useNavTabStore = defineStore({
  id: 'NavTab', // 页签缓存
  state: (): NavTabState => {
    return {
      tabList: [defaultTabItem], // 保存页签tab的数组
      cacheList: [] // keep-alive缓存的数组, 元素是组件名
    }
  },
  getters: {},
  actions: {
    // 添加一个页签, 如果当前路由已经打开, 则不再重复添加
    addTabItem(item: TabListItem) {
      let flag = this.tabList.findIndex((i) => i.path === item.path)
      if (flag >= 0) return
      this.tabList.push(item)
    },
    // 添加缓存页
    addCacheItem(componentName: string) {
      if (this.cacheList.includes(componentName)) return
      this.cacheList.push(componentName)
    },
    // 删除一个页签
    removeTabItem(path: string) {
      if (path === defaultTabItem.path) return
      let index = this.tabList.findIndex((item) => item.path === path)
      if (index >= 0) {
        let isActive = router.currentRoute.value.path === this.tabList[index]['path']
        // let len = this.tabList.length - 1
        this.tabList.splice(index, 1)
        // if (index == len || isActive) {
        if (isActive) {
          router.push({ path: this.tabList[this.tabList.length - 1]['path'] })
        }
      }
    },
    // 删除一个缓存页
    removeCacheItem(componentName: string) {
      let index = this.cacheList.findIndex((item) => item === componentName)
      if (index >= 0) {
        this.cacheList.splice(index, 1)
      }
    },
    // 清空页签
    clearTabList() {
      this.tabList = [defaultTabItem]
      router.push(defaultTabItem.path)
    },
    // 清空缓存页
    clearCacheList() {
      this.cacheList = []
    }
  }
})
