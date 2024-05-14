import { computed } from 'vue'
import { useDictStore } from '@/stores'

/** 字典模块 */
export function useDict(option: { code: string }) {
  const dictStore = useDictStore()

  const data = computed(() => {
    return dictStore.dictData[option.code]
  })

  return { data }
}
