/** F: 表单数据 T: 表单数据排除的属性 V: 表单数据里-时间范围属性拆分成的新属性 */
type FormatItem<F, T, V> = {
  field: keyof T | keyof F
  start: keyof V
  end: keyof V
}

/**
 * 拆分有时间范围的表单
 * @param form 表单数据
 * @param formatList 需要拆分的时间范围属性
 * @returns 时间范围转成指定字段的表单
 * @example
 * const form = {
     name: '张三',
     rangTime1: ['2024-01-01', '2024-01-30'] as [string, string],
     rangTime2: ['2025-01-01', '2025-01-30'] as [string, string]
   }
 *
 * const data = getRangeTimeToFieldForm(form, [
    { field: 'rangTime1', start: 'startTime1', end: 'endTime1' },
    { field: 'rangTime2', start: 'startTime2', end: 'endTime2' }
   ])
 *
 * // data的结果为：
   // {
   //   name: '张三',
   //   startTime1: '2024-01-01',
   //   endTime1: '2024-01-30',
   //   startTime2: '2025-01-01',
   //   endTime2: '2025-01-30'
   // }
 */
export const getRangeTimeToFieldForm = <F, T, V>(form: F, formatList: FormatItem<F, T, V>[]) => {
  const obj = { ...form } as Omit<F, keyof T> & V
  for (const i of formatList) {
    const value = obj[i.field as never] as [string, string]
    if (Array.isArray(value)) {
      delete obj[i.field as never];
      (obj[i.start] as string) = value[0] || '';
      (obj[i.end] as string) = value[1] || ''
    }
  }
  return obj
}
