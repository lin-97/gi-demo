import type { SelectOptionData } from '@arco-design/web-vue'
import { computed } from 'vue'
import { useDictStore } from '@/stores'

/**
 * 将字符串数组转换为对象类型
 * @example
 * ArrayToObject<['status', 'gender']> // { status: SelectOptionData[], gender: SelectOptionData[] }
 */
type ArrayToObject<T extends readonly string[]> = {
  [K in T[number]]: SelectOptionData[]
}

/**
 * 字典数据 Hook
 * @description 根据传入的字典代码数组，返回对应的字典数据对象
 * @param codes - 字典代码数组，会自动推断字面量类型以提供类型提示
 * @returns 返回包含字典数据的响应式对象，对象的键为 codes 中的元素
 * @example
 * const { dictData } = useDict(['status', 'gender'] as const)
 * // dictData.value.status ✅ 有类型提示
 * // dictData.value.gender ✅ 有类型提示
 * // dictData.value.other ❌ TypeScript 会报错
 */
export function useDict<const T extends readonly string[]>(codes: T) {
  const dictStore = useDictStore()

  const dictData = computed<ArrayToObject<T>>(() => {
    const result = {} as ArrayToObject<T>
    for (const code of codes) {
      result[code as T[number]] = dictStore.dictData[code] || []
    }
    return result
  })

  return { dictData }
}
