import type { VNodeChild } from 'vue'
import type { TableColumnData, TableData } from '@arco-design/web-vue'

/**
 * 带泛型 record 的表格列配置，render 中 record 会推断为 R，无需再写 as 断言
 */
export type TableColumnDataWithRecord<R = TableData> = Omit<TableColumnData, 'render'> & {
  render?: (data: { record: R; column: TableColumnData; rowIndex: number }) => VNodeChild
}
