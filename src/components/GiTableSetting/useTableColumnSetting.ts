import type { TableColumnData, TableInstance } from '@arco-design/web-vue'
import type { MaybeRefOrGetter } from 'vue'
import type { TableSettingColumnListItem } from './type'
import { computed, ref, toValue, watch } from 'vue'

export interface UseTableColumnSettingOptions {
  columns: MaybeRefOrGetter<TableInstance['columns'] | undefined>
  disabledColumnKeys?: MaybeRefOrGetter<string[]>
}

/** 获取列的 key */
export function getTableColumnKey(column: TableColumnData, index?: number) {
  if (column.dataIndex) return String(column.dataIndex)
  if (typeof column.title === 'string' && column.title) return column.title
  return `__column_${index ?? Date.now()}__`
}

/** 表格列设置：显隐、排序、固定 */
export function useTableColumnSetting(options: UseTableColumnSettingOptions) {
  const showSettingColumnBtn = computed(() => {
    const columns = Array.isArray(toValue(options.columns)) ? toValue(options.columns) : undefined
    return Boolean(columns?.length)
  })

  const initialSettingColumns = computed<TableSettingColumnListItem[]>(() => {
    const raw = toValue(options.columns)
    if (!raw) return []

    const columns = Array.isArray(raw) ? raw : []
    return columns.map((column, index) => {
      const key = getTableColumnKey(column, index)
      const fixed = column.fixed
      const disabledKeys = toValue(options.disabledColumnKeys) ?? []
      return {
        key,
        title: typeof column.title === 'string' ? column.title : '',
        show: true,
        disabled: disabledKeys.includes(key),
        fixedLeft: fixed === 'left',
        fixedRight: fixed === 'right'
      }
    })
  })

  const settingColumnList = ref<TableSettingColumnListItem[]>([])

  const isColumnStructureMatch = (
    userColumns: TableSettingColumnListItem[],
    initialColumns: TableSettingColumnListItem[]
  ): boolean => {
    if (userColumns.length === 0 || userColumns.length !== initialColumns.length) return false
    const initialKeys = new Set(initialColumns.map((item) => item.key))
    const userKeys = new Set(userColumns.map((item) => item.key))
    return initialKeys.size === userKeys.size && [...initialKeys].every((key) => userKeys.has(key))
  }

  const columnMap = computed(() => {
    const raw = toValue(options.columns)
    if (!raw) return new Map<string, TableColumnData>()
    const columns = Array.isArray(raw) ? raw : []
    return new Map(columns.map((col, index) => [getTableColumnKey(col, index), col]))
  })

  const currentSettingColumns = computed(() => {
    const isValid = isColumnStructureMatch(settingColumnList.value, initialSettingColumns.value)
    return isValid ? settingColumnList.value : initialSettingColumns.value
  })

  const resetSettingColumns = () => {
    settingColumnList.value = [...initialSettingColumns.value]
  }

  const ensureSettingColumnList = () => {
    if (settingColumnList.value.length === 0 && initialSettingColumns.value.length > 0) {
      settingColumnList.value = initialSettingColumns.value.map((item) => ({ ...item }))
    }
  }

  const toggleFixedLeft = (key: string) => {
    ensureSettingColumnList()
    settingColumnList.value = settingColumnList.value.map((item) =>
      item.key === key
        ? { ...item, fixedLeft: !item.fixedLeft, fixedRight: false }
        : item
    )
  }

  const toggleFixedRight = (key: string) => {
    ensureSettingColumnList()
    settingColumnList.value = settingColumnList.value.map((item) =>
      item.key === key
        ? { ...item, fixedRight: !item.fixedRight, fixedLeft: false }
        : item
    )
  }

  watch(
    () => toValue(options.columns),
    () => {
      if (!isColumnStructureMatch(settingColumnList.value, initialSettingColumns.value)) {
        resetSettingColumns()
      }
    },
    { deep: true }
  )

  const settingColumns = computed(() => {
    const raw = toValue(options.columns)
    if (!raw) return []

    const shown = currentSettingColumns.value.filter((item) => item.show)
    const leftFixed: typeof shown = []
    const noFixed: typeof shown = []
    const rightFixed: typeof shown = []
    for (const item of shown) {
      if (item.fixedLeft) leftFixed.push(item)
      else if (item.fixedRight) rightFixed.push(item)
      else noFixed.push(item)
    }
    const ordered = [...leftFixed, ...noFixed, ...rightFixed]

    return ordered
      .map((item) => {
        const col = columnMap.value.get(item.key)
        if (!col) return null
        const fixed = item.fixedRight ? 'right' : item.fixedLeft ? 'left' : undefined
        return { ...col, fixed }
      })
      .filter(Boolean) as TableColumnData[]
  })

  return {
    showSettingColumnBtn,
    currentSettingColumns,
    settingColumnList,
    settingColumns,
    resetSettingColumns,
    toggleFixedLeft,
    toggleFixedRight
  }
}
