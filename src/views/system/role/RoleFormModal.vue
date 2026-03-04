<template>
  <a-modal v-model:visible="visible" :title="title" width="calc(100% - 20px)" :mask-closable="false"
    :modal-style="{ maxWidth: '520px' }" @before-ok="save" @close="close">
    <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns" :grid-item-props="{ span: 24 }"
      @update:model-value="Object.assign(form, $event)" />
  </a-modal>
</template>

<script setup lang="ts">
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/role'
import { GiForm } from '@/components/index'
import { useResetReactive } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')
const detailId = ref('')
const isEdit = computed(() => !!detailId.value)
const title = computed(() => (isEdit.value ? '编辑角色' : '新增角色'))
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
    label: '角色名称',
    field: 'name',
    required: true,
    rules: [
      { min: 3, max: 10, message: '长度在 3 - 10个字符' }
    ],
    props: { maxLength: 10 }
  },
  {
    type: 'input',
    label: '角色编码',
    field: 'code',
    required: true,
    rules: [
      { match: /^[a-z]\w*$/i, message: '格式不对！只能英文开头，包含英文数字下划线' }
    ],
    props: { maxLength: 10, disabled: isEdit.value }
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
  detailId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  visible.value = true
  detailId.value = id
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
