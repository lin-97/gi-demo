import { ref } from 'vue'
import { mapTree } from 'xe-utils'
import { type SystemDeptItem, getSystemDeptList } from '@/apis/system'

/** 部门模块 */
export function useDept(options?: { onSuccess?: () => void }) {
  const loading = ref(false)
  const deptList = ref<SystemDeptItem[]>([])

  const getDeptList = async () => {
    try {
      loading.value = true
      const res = await getSystemDeptList()
      deptList.value = mapTree(res.data, (i) => {
        if (i.children?.length) {
          i.children = i.children.filter((i) => i.status === 1)
        }
        return i
      })
      options?.onSuccess && options.onSuccess()
    } finally {
      loading.value = false
    }
  }
  return { deptList, getDeptList, loading }
}
