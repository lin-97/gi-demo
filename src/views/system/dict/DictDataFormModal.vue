<template>
  <a-modal v-model:visible="visible" :title="title" width="calc(100% - 20px)" :mask-closable="false"
    :modal-style="{ maxWidth: '520px' }" @before-ok="save" @close="close">
    <a-spin :loading="loading" class="w-full">
      <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns" :grid-item-props="{ span: 24 }"
        @update:model-value="Object.assign(form, $event)" />
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import { getDictDataDetail } from '@/apis/system/dict'
import { GiForm } from '@/components/index'
import { useResetReactive } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')
const dictDataId = ref('')
const dictTypeCode = ref('')
const isEdit = computed(() => !!dictDataId.value)
const title = computed(() => {
  const t = isEdit.value ? '编辑-字典数据' : '新增-字典数据'
  return dictTypeCode.value ? `${t} (${dictTypeCode.value})` : t
})
const visible = ref(false)
const loading = ref(false)

const [form, resetForm] = useResetReactive({
  name: '',
  value: '',
  sort: 0,
  status: '1' as Status,
  remark: ''
})

const formColumns = computed<FormColumnItem[]>(() => [
  {
    type: 'input',
    label: '数据标签',
    field: 'name',
    required: true,
    rules: [{ required: true, message: '请输入数据标签' }],
    props: { maxLength: 10 }
  },
  {
    type: 'input',
    label: '数据键值',
    field: 'value',
    required: true,
    rules: [
      { match: /^\w*$/, message: '格式不对！只能包含英文数字下划线' }
    ],
    props: { maxLength: 10 }
  },
  {
    type: 'input-number',
    label: '排序',
    field: 'sort',
    props: { min: 0, style: { width: '120px' } },
    span: 12
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
    },
    span: 12
  },
  {
    type: 'input',
    label: '备注',
    field: 'remark',
    props: { maxLength: 100 }
  }
])

const add = (code: string) => {
  dictTypeCode.value = code
  dictDataId.value = ''
  visible.value = true
}

const edit = async (data: { id: string, code: string }) => {
  dictTypeCode.value = data.code
  visible.value = true
  dictDataId.value = data.id
  loading.value = true
  const res = await getDictDataDetail(data)
  Object.assign(form, res.data)
  form.value = res.data.value != null ? String(res.data.value) : ''
  loading.value = false
}

const close = () => {
  GiFormRef.value?.formRef?.resetFields()
  resetForm()
  dictTypeCode.value = ''
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
