import { ref } from 'vue'
import { getSystemDeptList } from '@/apis'
import type { DeptItem } from '@/apis'

/** 部门模块 */
export function useDept() {
  const deptList = ref<DeptItem[]>([])
  const getDeptList = async () => {
    const res = await getSystemDeptList()
    if (res.success) {
      deptList.value = res.data.list
    }
  }
  return { deptList, getDeptList }
}