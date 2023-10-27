import { reactive } from 'vue'
import _ from 'lodash'
import type { Options, ColumnsItem } from './type'
import { Message } from '@arco-design/web-vue'

export default function (initValue: Options) {
  const getInitValue = () => _.cloneDeep(initValue)

  const options = reactive(getInitValue())

  const resetOptions = () => {
    Object.assign(options, getInitValue())
  }

  const setValue = <T>(field: string, key: keyof ColumnsItem, value: T) => {
    if (!options.columns.length) return
    const index = options.columns.findIndex((i) => i.field === field)
    if (index >= 0) {
      options.columns[index][key] = value as never
    } else {
      Message.warning(`没有这个属性值-${field}，请检查！`)
    }
  }

  const setPropsValue = <T>(field: string, key: string, value: T) => {
    if (!options.columns.length) return
    const index = options.columns.findIndex((i) => i.field === field)
    if (index >= 0) {
      if (!options.columns?.[index]) return
      if (!options.columns[index].props) {
        options.columns[index].props = {}
      }
      options.columns[index].props[key as keyof Required<ColumnsItem['props']>] = value as never
    } else {
      Message.warning(`没有这个属性值-${field}，请检查！`)
    }
  }

  return { options, resetOptions, setValue, setPropsValue }
}
