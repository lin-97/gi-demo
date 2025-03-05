import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SelectOptionData } from '@arco-design/web-vue'
import { getDictData as getDictDataApi } from '@/apis/system'

/**
 * 字典数据类型定义
 */
type DictDataMap = Record<string, SelectOptionData[]>

/**
 * 字典 Store 的核心设置逻辑
 * 用于管理系统字典数据的状态
 */
const storeSetup = () => {
  /**
   * 存储字典数据的响应式对象
   * key: 字典类型
   * value: 字典选项数组
   */
  const dictData = ref<DictDataMap>({})

  /**
   * 获取字典数据
   * 从后端 API 获取字典数据并更新到 store 中
   * @throws 当 API 请求失败时抛出错误
   */
  const getDictData = async () => {
    try {
      const res = await getDictDataApi()
      if (res?.data) {
        dictData.value = res.data
      }
    } catch (error) {
      console.error('获取字典数据失败:', error)
      throw error
    }
  }

  /**
   * 获取指定类型的字典数据
   * @param dictType - 字典类型
   * @returns 对应类型的字典选项数组，如果不存在则返回空数组
   */
  const getDictOptions = (dictType: string): SelectOptionData[] => {
    return dictData.value[dictType] || []
  }

  /**
   * 重置字典数据
   * 清空所有已加载的字典数据
   */
  const resetDict = () => {
    dictData.value = {}
  }

  return {
    dictData,
    getDictData,
    getDictOptions,
    resetDict
  }
}

// 创建并导出字典 Store，不启用持久化存储
export const useDictStore = defineStore('dict', storeSetup, { persist: false })
