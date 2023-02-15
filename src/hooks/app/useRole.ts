import { ref } from 'vue'
import { getSystemRoleList } from '@/apis'
import type { RoleItem } from '@/apis'

/** 角色模块 */
export function useRole() {
  const roleList = ref<RoleItem[]>([])
  const getRoleList = async () => {
    const res = await getSystemRoleList()
    if (res.success) {
      roleList.value = res.data.list
    }
  }
  return { roleList, getRoleList }
}