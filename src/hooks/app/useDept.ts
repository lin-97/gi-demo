import { ref } from 'vue'
import { getSystemDeptList } from '@/apis'
import type { DeptItem } from '@/apis'

/** 部门模块 */
export function useDept(options?: { callback?: () => void }) {
  const loading = ref(false)
  const deptList = ref<DeptItem[]>([])

  const getDeptList = async () => {
    try {
      loading.value = true
      const res = await getSystemDeptList()
      deptList.value = res.data
      options?.callback && options.callback()
    } catch (error) {
    } finally {
      loading.value = false
    }
  }
  return { deptList, getDeptList, loading }
}
