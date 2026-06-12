---
name: crud-page
description: 在本模板项目中创建或修改 CRUD 列表页、表格列、搜索区、表单弹窗。使用 GiPageLayout、useTable、GiButton、a-table、GiForm、useDict 时加载本技能。
---

# CRUD 列表页开发

## 标准页面结构

```vue
<template>
  <GiPageLayout margin collapsed>
    <template #left><!-- 可选：树/分类 --></template>

    <a-row justify="space-between" class="g-row-tool">
      <a-space wrap>
        <GiButton type="add" @click="onAdd" />
        <GiButton type="delete" @click="onBatchDelete" />
      </a-space>
      <a-space wrap>
        <!-- 搜索表单项 -->
        <GiButton type="search" @click="search" />
        <GiButton type="reset" @click="reset" />
      </a-space>
    </a-row>

    <a-table
      class="g-table"
      row-key="id"
      :loading="loading"
      :data="tableData"
      :columns="tableColumns"
      :bordered="{ cell: true }"
      :scroll="{ x: '100%', y: '100%', minWidth: 1200 }"
      :pagination="pagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :selected-keys="selectedKeys"
      @select="select"
      @select-all="selectAll"
    />

    <XxxFormModal ref="XxxFormModalRef" @save-success="search" />
  </GiPageLayout>
</template>

<script setup lang="tsx">
defineOptions({ name: 'ModuleName' })
</script>
```

## useTable 用法

```ts
import type * as T from '@/apis/system/user'
import { baseAPI } from '@/apis/system/user'
import { useDict, useTable } from '@/hooks'

const { dictData } = useDict(['STATUS'] as const)

const queryParams = reactive({ status: '', username: '' })

const {
  loading,
  tableData,
  pagination,
  selectedKeys,
  search,
  select,
  selectAll,
  fixed, // 操作列 fixed: 'right'（小屏自动取消）
  onDelete,
  onBatchDelete,
  refresh
} = useTable({
  listAPI: (page) => baseAPI.getList({ ...page, ...queryParams }),
  deleteAPI: (ids) => baseAPI.delete({ ids }),
  immediate: true,
  rowKey: 'id', // 默认 id
  crossPageSelect: false // 跨页多选时设为 true
})
```

要点：

- `search()` 会重置到第 1 页并清空选中
- `refresh()` 保持当前页刷新
- `listAPI` 参数为 `{ page, size }`，需展开到接口
- 空字符串查询条件建议转 `undefined` 再传 API

## GiButton 预设类型

`add` | `edit` | `delete` | `search` | `reset` | `upload` | `import` | `export`

列表工具栏与操作列统一使用 `GiButton`，操作列常用 `size="mini"`。

## 表格列（TSX）

使用 `lang="tsx"`，从 `@arco-design/web-vue` 引入 `TableColumnData`：

```tsx
const tableColumns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    align: 'center',
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  { title: '名称', dataIndex: 'name', ellipsis: true, tooltip: true },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => (
      <GiCellStatus status={record.status} />
    )
  },
  {
    title: '操作',
    width: 160,
    align: 'center',
    fixed: 'right', // 或绑定 useTable 的 fixed
    render: ({ record }) => (
      <Space>
        <GiButton type="edit" size="mini" onClick={() => onEdit(record as T.ListItem)} />
        <Popconfirm content="确定删除?" onBeforeOk={() => onDelete(record as T.ListItem)}>
          <GiButton type="delete" size="mini" />
        </Popconfirm>
      </Space>
    )
  }
]
```

常用单元格组件：`GiCellAvatar`、`GiCellGender`、`GiCellStatus`（从 `@/components/GiCell` 引入或在 TSX 中直接使用）。

## GiPageLayout

| 属性/插槽 | 说明 |
|-----------|------|
| `#left` | 左侧栏（部门树、字典类型列表等） |
| `#header` | 顶栏（少用） |
| `margin` | 外边距模式 |
| `collapsed` | 显示折叠按钮 |
| `size` | 左侧宽度，如 `"280px"` |

左栏选中后通过事件同步右侧列表，参考 `dict/index.vue` 的 `onDictTypeRefresh`。

## 表单弹窗（Modal + GiForm）

```vue
<a-modal v-model:visible="visible" :title="title" :mask-closable="false"
  @before-ok="save" @close="close">
  <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns"
    @update:model-value="Object.assign(form, $event)" />
</a-modal>
```

```ts
import type { FormColumnItem } from '@/components/index'
import { useResetReactive } from '@/hooks'

const [form, resetForm] = useResetReactive({ id: '', name: '', status: '1' as Status })
const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')

const add = () => {
  detailId.value = ''
  visible.value = true
}
const edit = async (id: string) => {
  visible.value = true
  detailId.value = id
  Object.assign(form, (await baseAPI.getDetail({ id })).data)
}
const close = () => {
  GiFormRef.value?.formRef?.resetFields()
  resetForm()
}
const save = async () => {
  const valid = await GiFormRef.value?.formRef?.validate()
  if (valid) return false
  // await baseAPI.add(form) 或 baseAPI.update(form)
  emit('save-success')
  return true
}

defineExpose({ add, edit })
```

`formColumns` 常用 `type`：`input`、`select`、`tree-select`、`radio-group`、`switch`、`textarea`。校验可用 `required`、`rules`；正则见 `@/utils/regexp`。

## 字典下拉

```ts
const { dictData } = useDict(['STATUS'] as const)
// 模板：<a-select :options="dictData.STATUS" />
```

## 表格增强方案选型

| 需求 | 方案 |
|------|------|
| 内置斑马纹/全屏/列设置 | `GiTable` |
| 继续用 `a-table` + 工具栏/列设置 | `GiTableSetting` 包裹（见 `views/table/custom3`） |
| 简单列表 | `a-table` + `useTable`（系统模块主流） |

## 检查清单

- [ ] `defineOptions({ name })` 已设置
- [ ] `row-key="id"` 与 `useTable` 的 `rowKey` 一致
- [ ] 删除走 `onDelete` / `onBatchDelete` 或自定义 `Popconfirm` + API
- [ ] 弹窗 `defineExpose({ add, edit })`，父组件 `useTemplateRef` 调用
- [ ] 保存成功后 `emit('save-success')` 并触发 `search`
