import { computed } from 'vue'
import type * as A from '@arco-design/web-vue'
import { useDictStore } from '@/stores'

type Options =
  & A.SelectInstance['$props']['options']
  & A.RadioGroupInstance['$props']['options']
  & A.CheckboxGroupInstance['$props']['options']
  & A.CascaderInstance['$props']['options']
  & A.TreeSelectInstance['$props']['data']

/** 字典模块 */
export function useDict(option: { code: string }) {
  const dictStore = useDictStore()

  const data = computed(() => {
    return dictStore.dictData[option.code] as Options
  })

  return { data }
}
