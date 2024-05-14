import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SelectOptionData } from '@arco-design/web-vue'
import { getSystemDictData } from '@/apis'

const storeSetup = () => {
  const dictData = ref<Record<string, SelectOptionData[]>>({})

  const getDictData = async () => {
    const res = await getSystemDictData()
    dictData.value = res.data
  }

  return {
    dictData,
    getDictData
  }
}

export const useDictStore = defineStore('dict', storeSetup, { persist: false })
