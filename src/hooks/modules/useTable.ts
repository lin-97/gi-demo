import type { TableData, TableInstance } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import { useBreakpoint, usePagination } from '@/hooks'

interface Options<T, U> {
  formatResult?: (data: T[]) => U[]
  onSuccess?: () => void
  immediate?: boolean
  rowKey?: keyof T
}

/** 分页参数类型 */
type PaginationParams = {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  size: number
}

/** API 函数类型 */
type Api<T> = (params: PaginationParams) => Promise<ApiRes<PageRes<T[]>>> | Promise<ApiRes<T[]>>

/** 删除操作的配置选项 */
interface DeleteOptions {
  /** 确认框标题 */
  title?: string
  /** 确认框内容 */
  content?: string
  /** 成功提示信息 */
  successTip?: string
  /** 是否显示确认框 */
  showModal?: boolean
}

/**
 * 表格数据管理 Hook
 * @description 提供表格数据管理的响应式 Hook，支持分页、搜索、刷新、删除等功能
 * @template T - 原始数据类型
 * @template U - 格式化后的数据类型
 * @param api - 获取表格数据的 API 函数
 * @param options - 表格配置选项
 * @returns 表格相关的状态和方法
 * @example
 * const {
 *   loading,
 *   tableData,
 *   pagination,
 *   selectedKeys,
 *   search,
 *   refresh,
 *   handleDelete
 * } = useTable(getTableApi, {
 *   formatResult: (data) => data.map(formatData),
 *   immediate: true,
 *   rowKey: 'id'
 * })
 */
export function useTable<T extends U, U = T>(api: Api<T>, options?: Options<T, U>) {
  const { formatResult, onSuccess, immediate = true, rowKey = 'id' } = options || {}

  // 分页相关
  const { pagination, setTotal } = usePagination(() => getTableData())
  const loading = ref(false)
  const tableData: Ref<U[]> = ref([])

  /**
   * 获取表格数据
   * @description 调用 API 获取数据，处理分页、格式化等逻辑
   */
  async function getTableData() {
    try {
      loading.value = true
      const res = await api({ page: pagination.current, size: pagination.pageSize })
      // 处理返回的数据结构可能是分页或数组的情况
      const data = !Array.isArray(res.data) ? res.data.records : res.data
      tableData.value = formatResult ? formatResult(data) : data
      // 设置总数据量
      const total = !Array.isArray(res.data) ? res.data.total : data.length
      setTotal(total)
      onSuccess?.()
    } finally {
      loading.value = false
    }
  }

  // 首次加载数据
  immediate && getTableData()

  // 多选
  const selectedKeys = ref<(string | number)[]>([])

  /**
   * 行选择回调
   * @param rowKeys - 选中的行 key 数组
   */
  const select: TableInstance['onSelect'] = (rowKeys) => {
    selectedKeys.value = rowKeys
  }

  /**
   * 全选回调
   * @param checked - 是否全选
   */
  const selectAll: TableInstance['onSelectAll'] = (checked) => {
    const arr = (tableData.value as TableData[]).filter((i) => !(i?.disabled ?? false))
    selectedKeys.value = checked ? arr.map((i) => i[rowKey as string]) : []
  }

  /**
   * 搜索
   * @description 重置页码为1并重新获取数据
   */
  const search = () => {
    selectedKeys.value = []
    pagination.onChange(1)
  }

  /**
   * 刷新表格数据
   * @description 使用当前的分页参数重新获取数据
   */
  const refresh = () => {
    getTableData()
  }

  /**
   * 处理删除操作
   * @description 支持删除确认框，自动处理删除后的刷新
   * @param deleteApi - 删除操作的 API 函数
   * @param options - 删除操作的配置选项
   * @returns Promise<boolean | undefined> 删除操作的结果
   */
  const handleDelete = async <T>(
    deleteApi: () => Promise<ApiRes<T>>,
    options?: DeleteOptions
  ): Promise<boolean | undefined> => {
    const onDelete = async (isMultiple: boolean) => {
      try {
        const res = await deleteApi()
        if (res.success) {
          Message.success(options?.successTip || '删除成功！')
          // 处理当前页码
          const deleteNum = isMultiple ? selectedKeys.value.length : 1
          const totalPage = Math.ceil((pagination.total - deleteNum) / pagination.pageSize)
          if (pagination.current > totalPage) {
            pagination.current = totalPage > 0 ? totalPage : 1
          }
          isMultiple && (selectedKeys.value = [])
          getTableData()
        }
        return res.success
      } catch (error) {
        return false
      }
    }

    if (!(options?.showModal ?? true)) {
      return onDelete(false)
    }

    Modal.warning({
      title: options?.title || '提示',
      content: options?.content || '是否确认删除？',
      hideCancel: false,
      maskClosable: false,
      onBeforeOk: () => onDelete(true)
    })
  }

  // 响应式处理表格操作列固定状态
  const { breakpoint } = useBreakpoint()
  const fixed = computed(() => !['xs', 'sm'].includes(breakpoint.value) ? 'right' : undefined)

  return {
    /** 表格加载状态 */
    loading,
    /** 表格数据 */
    tableData,
    /** 获取表格数据 */
    getTableData,
    /** 搜索，页码会重置为1 */
    search,
    /** 分页的传参 */
    pagination,
    /** 选择的行keys */
    selectedKeys,
    /** 选择行 */
    select,
    /** 全选行 */
    selectAll,
    /** 处理删除、批量删除 */
    handleDelete,
    /** 刷新表格数据，页码会缓存 */
    refresh,
    /** 操作列在小屏场景下不固定在右侧 */
    fixed
  }
}
