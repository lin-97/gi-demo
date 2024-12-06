/** F: 表单数据 T: 表单数据排除的属性 V: 表单数据里-时间范围属性拆分成的新属性 */
type FormatItem<F, T, V> = {
  field: keyof T | keyof F
  start: keyof V
  end: keyof V
}

/**
 * 合并有时间范围的表单
 * @param form 表单数据
 * @param formatList 需要合并的时间范围属性
 * @returns 合并后的表单数据
 * @example
 * const form = {
     name: '李四',
     startTime1: '2024-01-01',
     endTime1: '2024-01-30',
     startTime2: '2025-01-01',
     endTime2: '2025-01-30'
   }
 *
 * const data = getFieldToRangTimeForm(form, [
     { field: 'rangTime1', start: 'startTime1', end: 'endTime1' },
     { field: 'rangTime2', start: 'startTime2', end: 'endTime2' }
   ])
 *
 * // data的结果为：
 * // {
   //   name: '李四',
   //   rangTime1: ['2024-01-01', '2024-01-30'],
   //   rangTime2: ['2025-01-01', '2025-01-30']
   // }
 */
export const getFieldToRangTimeForm = <F, T, V>(form: F, formatList: FormatItem<F, T, V>[]) => {
  const obj = { ...form } as Omit<F, keyof V> & T
  for (const i of formatList) {
    const startTime = obj[i.start as never] as string
    const endTime = obj[i.end as never] as string
    if (startTime && endTime) {
      (obj[i.field as never] as [string, string]) = [startTime, endTime]
    }
    delete obj[i.start as never]
    delete obj[i.end as never]
  }
  return obj
}
