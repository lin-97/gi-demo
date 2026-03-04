<template>
  <a-modal v-model:visible="visible" :title="title" width="calc(100% - 20px)" :modal-style="{ maxWidth: '520px' }"
    :mask-closable="false" @before-ok="save" @close="close">
    <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns" :grid-item-props="{ span: 24 }"
      @update:model-value="Object.assign(form, $event)" />
  </a-modal>
</template>

<script setup lang="ts">
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/dept'
import { GiForm } from '@/components/index'
import { useResetReactive } from '@/hooks'
import { useDept } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { deptList, getDeptList } = useDept()
getDeptList()

const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')
const detailId = ref('')
const visible = ref(false)
const isEdit = computed(() => !!detailId.value)
const title = computed(() => (isEdit.value ? '编辑部门' : '新增部门'))

const [form, resetForm] = useResetReactive({
  id: '',
  parentId: '',
  name: '',
  sort: 0,
  status: '1' as Status,
  description: ''
})

const formColumns = computed<FormColumnItem[]>(() => [
  {
    type: 'tree-select',
    label: '上级部门',
    field: 'parentId',
    props: {
      data: deptList.value,
      fieldNames: { key: 'id', title: 'name', children: 'children' },
      allowClear: true
    }
  },
  {
    type: 'input',
    label: '部门名称',
    field: 'name',
    required: true,
    rules: [
      { min: 3, max: 10, message: '长度在 3 - 10个字符' }
    ],
    props: { maxLength: 10 }
  },
  {
    type: 'input-number',
    label: '排序',
    field: 'sort',
    props: { style: { width: '120px' } }
  },
  {
    type: 'textarea',
    label: '描述',
    field: 'description',
    props: {
      maxLength: 200,
      autoSize: { minRows: 3 },
      showWordLimit: true
    }
  },
  {
    type: 'switch',
    label: '状态',
    field: 'status',
    required: true,
    props: {
      type: 'round',
      checkedValue: 1,
      uncheckedValue: 0,
      checkedText: '正常',
      uncheckedText: '禁用'
    }
  }
])

const add = () => {
  detailId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  if (!deptList.value.length) {
    await getDeptList()
  }
  detailId.value = id
  visible.value = true
  const res = await baseAPI.getDetail({ id })
  Object.assign(form, res.data)
}

const close = () => {
  GiFormRef.value?.formRef?.resetFields()
  resetForm()
}

const save = async () => {
  try {
    const valid = await GiFormRef.value?.formRef?.validate()
    if (valid) return false
    const res = await new Promise((resolve) => setTimeout(() => resolve(true), 300))
    if (res) {
      Message.success('模拟保存成功')
      emit('save-success')
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}

defineExpose({ add, edit })
</script>
