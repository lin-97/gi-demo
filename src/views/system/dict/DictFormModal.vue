<template>
  <a-modal v-model:visible="visible" :title="title" width="calc(100% - 20px)" :mask-closable="false"
    :modal-style="{ maxWidth: '520px' }" @before-ok="save" @close="close">
    <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns"
      :grid-item-props="{ span: 24 }"
      @update:model-value="Object.assign(form, $event)" />
  </a-modal>
</template>

<script setup lang="ts">
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/dict'
import { GiForm } from '@/components/index'
import { useResetReactive } from '@/hooks'
import * as Regexp from '@/utils/regexp'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')
const dictId = ref('')
const isEdit = computed(() => !!dictId.value)
const title = computed(() => (isEdit.value ? '编辑字典' : '新增字典'))
const visible = ref(false)

const [form, resetForm] = useResetReactive({
  name: '',
  code: '',
  status: '1' as Status,
  description: ''
})

const formColumns = computed<FormColumnItem[]>(() => [
  {
    type: 'input',
    label: '字典名称',
    field: 'name',
    required: true,
    rules: [{ required: true, message: '请输入字典名称' }],
    props: { maxLength: 10 }
  },
  {
    type: 'input',
    label: '字典编码',
    field: 'code',
    required: true,
    rules: [
      { match: Regexp.OnlyEn, message: '格式不对！只能是英文' }
    ],
    props: { maxLength: 10 }
  },
  {
    type: 'textarea',
    label: '描述',
    field: 'description',
    props: {
      maxLength: 200,
      autoSize: { minRows: 3, maxRows: 5 },
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
  dictId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  dictId.value = id
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
