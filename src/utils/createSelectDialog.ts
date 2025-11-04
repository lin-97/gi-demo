import type { Component } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import { h, ref } from 'vue'

interface CreateSelectDialogParams {
  title: string
  component: Component
  componentProps?: Record<string, any>
  tip?: string
}

/**
 * 选择弹窗配置选项接口
 * @template T 选中数据的类型
 */
interface SelectDialogOptions<T> {
  /** 弹窗标题（会覆盖创建参数中的title） */
  title?: string
  /** 是否允许多选 */
  multiple?: boolean
  /** 查询参数，通常用于初始化数据 */
  queryParams?: Record<string, any>
  /** 传递给组件的额外属性 */
  componentProps?: Record<string, any>
  /** 点击确定按钮后的回调函数 */
  onOk?: (data: T) => void
  /** 点击确定前的校验函数，返回Promise<boolean>决定是否允许确定 */
  onBeforeOk?: (data: T) => Promise<boolean>
}

/**
 * 创建一个选择类型的弹窗工厂函数
 *
 * 该函数返回一个创建特定类型选择弹窗的方法，适用于需要从列表中选择数据的场景。
 * 内部使用Vue的createVNode动态渲染组件，并通过ref获取组件实例的方法。
 *
 * @template T 选中数据的类型
 * @param {CreateSelectDialogParams} params 创建弹窗所需的基本参数
 * @returns {(options: SelectDialogOptions<T>) => void} 可配置的弹窗创建函数
 *
 * @example
 * // 创建一个用户选择弹窗
 * const selectUserDialog = createSelectDialog({
 *   title: '选择用户',
 *   component: UserSelectComponent,
 *   tip: '请至少选择一个用户'
 * })
 *
 * // 打开弹窗并处理选择结果
 * selectUserDialog({
 *   multiple: true,
 *   queryParams: { status: 'active' },
 *   onOk: (selectedUsers) => {
 *     console.log('已选择用户:', selectedUsers)
 *   }
 * })
 */
export const createSelectDialog = <T = any>(params: CreateSelectDialogParams) => {
  return (options: SelectDialogOptions<T>) => {
    const TableRef = ref<any>()
    Modal.open({
      // 优先使用options中的title，否则使用params中的title
      title: options.title || params.title,
      // 动态渲染传入的组件，设置ref引用并合并属性
      content: () => h(params.component, {
        ref: (e: any) => (TableRef.value = e),
        multiple: options.multiple,
        queryParams: options.queryParams,
        ...params.componentProps,
        ...options.componentProps
      }),
      // 设置弹窗宽度自适应
      width: 'calc(100% - 20px)',
      modalStyle: { maxWidth: '1000px' },
      bodyStyle: { overflow: 'hidden', height: '500px', padding: 0 },
      onBeforeOk: async () => {
        // 检查组件是否暴露了必要的getSelectedData方法
        if (!TableRef.value?.getSelectedData) {
          Message.warning('组件必须暴露getSelectedData方法')
          return false
        }

        // 获取选中的数据
        const data = TableRef.value?.getSelectedData?.() || []

        // 验证是否选择了数据
        if (!data.length) {
          Message.warning(params.tip || '请选择数据')
          return false
        }

        // 如果提供了前置校验函数，则调用并根据结果决定是否继续
        if (options?.onBeforeOk) {
          return await options.onBeforeOk(data)
        }

        // 调用确定回调函数，传递选中的数据
        options.onOk?.(data)
        return true
      }
    })
  }
}
