import { defineStore } from 'pinia'

export const useFileStore = defineStore({
  id: 'File',
  state() {
    return {
      // 当前批量勾选的文件列表
      selectedFileList: JSON.parse(window.sessionStorage.getItem('FILE_LIST')) || []
    }
  },
  getters: {
    // 当前勾选文件的id数组
    selectedFileIdList() {
      return this.selectedFileList.map((i) => i.id)
    }
  },
  actions: {
    // 添加选中的文件到文件勾选列表
    addSelectedFileItem(item) {
      if (this.selectedFileIdList.includes(item.id)) {
        let index = this.selectedFileList.findIndex((i) => i.id === item.id)
        this.selectedFileList.splice(index, 1)
        window.sessionStorage.setItem('FILE_LIST', JSON.stringify(this.selectedFileList))
      } else {
        this.selectedFileList.push(item)
        window.sessionStorage.setItem('FILE_LIST', JSON.stringify(this.selectedFileList))
      }
    }
  }
})
