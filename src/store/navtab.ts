import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

export const useNavTabStore = defineStore({
  id: 'NavTab', // 页签缓存
  state() {
    return {
      tabList: [], // 保存页签tab的数组
      cacheList: [] // keep-alive缓存的数组, 元素是组件名
    }
  },
  getters: {},
  actions: {
    // 添加一个页签, 如果当前路由已经打开, 则不再重复添加
    addTabItem(item) {
      let flag = this.tabList.findIndex((i) => i.path === item.path)
      if (flag >= 0) return
      this.tabList.push(item)
    },
    // 添加缓存页
    addCacheItem(item) {
      if (this.cacheList.includes(item.componentName)) return
      this.cacheList.push(item.componentName)
    },
    // 删除一个页签
    removeTabItem(path: string, currentPath: string) {
      let index = this.tabList.findIndex((item) => item.path === path)
      console.log('111', currentPath)
      let isActive = currentPath === this.tabList[index]['path']
      let len = this.tabList.length - 1
      this.tabList.splice(index, 1)
      if (index == len || isActive) {
        router.push({ path: this.tabList[this.tabList.length - 1]['path'] })
      }
    },
    // 删除一个缓存页
    removeCacheItem(componentName: string) {
      let index = this.cacheList.findIndex((item) => item === componentName)
      this.cacheList.splice(index, 1)
    }
  }
})
