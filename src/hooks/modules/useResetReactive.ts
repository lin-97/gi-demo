import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'

/**
 * 响应式状态重置 Hook
 * @description 创建一个可重置的响应式对象，支持将状态重置为初始值
 * @template T - 状态对象的类型
 * @param initialValue - 初始状态值
 * @returns [state, reset] - 返回响应式状态和重置函数的元组
 * @example
 * const initialForm = {
 *   name: '',
 *   age: 0
 * }
 *
 * const [form, resetForm] = useResetReactive(initialForm)
 *
 * // 修改表单
 * form.name = 'John'
 * form.age = 25
 *
 * // 重置表单到初始状态
 * resetForm()
 */
export function useResetReactive<T extends object>(initialValue: T) {
  /**
   * 获取初始值的深拷贝
   * @returns 初始值的深拷贝
   */
  const getInitialValue = () => cloneDeep(initialValue)

  // 创建响应式状态
  const state = reactive<T>(getInitialValue())

  /**
   * 重置状态到初始值
   * @description 先清空所有属性，然后用初始值重新赋值，确保引用不变
   */
  const reset = () => {
    // 清空当前状态的所有属性
    Object.keys(state).forEach((key) => delete (state as any)[key])
    // 使用初始值重新赋值
    Object.assign(state, getInitialValue())
  }

  return [state, reset] as const
}
