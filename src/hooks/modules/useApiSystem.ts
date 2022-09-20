import { ref } from 'vue'
import { getSystemDeptList, getSystemRoleList } from '@/apis'
import type { DeptItem, RoleItem } from '@/apis'

/** 部门模块 */
export function useApiDept() {
  const deptList = ref<DeptItem[]>([])

  const getDeptList = async () => {
    const res = await getSystemDeptList()
    if (res.success) {
      deptList.value = res.data.list
    }
  }

  getDeptList()

  return {
    deptList,
    getDeptList
  }
}

/** 角色模块 */
export function useApiRole() {
  const roleList = ref<RoleItem[]>([])

  const getRoleList = async () => {
    const res = await getSystemRoleList()
    if (res.success) {
      roleList.value = res.data.list
    }
  }

  getRoleList()

  return {
    roleList,
    getRoleList
  }
}

/** 其他模块 */
// export function xxx() {}
