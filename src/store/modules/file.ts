import { defineStore } from 'pinia'
import type { ApiFileItem } from '@/apis'

type ViewMode = 'grid' | 'list'

interface FileState {
  viewMode: ViewMode
  selectedFileList: ApiFileItem[]
  isBatchMode: boolean
}

export const useFileStore = defineStore({
  id: 'File',
  state: (): FileState => {
    return {
      // 视图: grid宫格模式 list列表模式
      viewMode: 'grid',
      // 是否批量操作: true:批量 false:单文件
      isBatchMode: false,
      // 当前批量勾选的文件列表
      selectedFileList: JSON.parse(sessionStorage.getItem('FILE_LIST') as string) || []
    }
  },
  getters: {
    // 当前勾选文件的id数组
    selectedFileIdList(): string[] {
      return this.selectedFileList.map((i) => i.id)
    }
  },
  actions: {
    // 改变视图模式
    changeViewMode() {
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid'
    },
    // 添加选中的文件到文件勾选列表
    addSelectedFileItem(item: ApiFileItem) {
      if (this.selectedFileIdList.includes(item.id)) {
        const index = this.selectedFileList.findIndex((i) => i.id === item.id)
        this.selectedFileList.splice(index, 1)
        window.sessionStorage.setItem('FILE_LIST', JSON.stringify(this.selectedFileList))
      } else {
        this.selectedFileList.push(item)
        window.sessionStorage.setItem('FILE_LIST', JSON.stringify(this.selectedFileList))
      }
    }
  }
})
