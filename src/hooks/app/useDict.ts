import { computed } from 'vue'
import type * as A from '@arco-design/web-vue'
import { useDictStore } from '@/stores'

type Options = A.SelectInstance['$props']['options']

/** 字典模块 */
export function useDict(option: { code: string }) {
  const dictStore = useDictStore()

  const data = computed(() => {
    return dictStore.dictData[option.code] as Options
  })

  return { data }
}
