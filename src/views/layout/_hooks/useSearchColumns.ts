import type { ColumnItem } from '@/components/GiForm'

export function useSearchColumns() {
  const columns = computed(() => [
    {
      type: 'input',
      label: '姓名',
      field: 'name'
    },
    {
      type: 'input',
      label: '手机',
      field: 'phone',
      props: {
        maxLength: 11
      }
    },
    {
      type: 'select',
      label: '性别',
      field: 'gender',
      props: {
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 0 }
        ]
      }
    },
    {
      type: 'date-picker',
      label: '创建日期',
      field: 'createTime'
    },
    {
      type: 'input',
      label: '地址',
      field: 'address'
    }
  ] as ColumnItem[])

  return { columns }
}
