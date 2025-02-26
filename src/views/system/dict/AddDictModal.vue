<template>
  <a-modal v-model:visible="visible" :title="title" width="90%" :mask-closable="false"
    :modal-style="{ maxWidth: '520px' }" @before-ok="save" @close="close">
    <a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-form-item label="字典名称" field="name">
        <a-input v-model.trim="form.name" placeholder="请输入字典名称" allow-clear :max-length="10"> </a-input>
      </a-form-item>
      <a-form-item label="字典编码" field="code">
        <a-input v-model.trim="form.code" placeholder="请输入字典编码" allow-clear :max-length="10"> </a-input>
      </a-form-item>
      <a-form-item label="描述" field="description">
        <a-textarea v-model.trim="form.description" placeholder="请填写描述" :max-length="200" show-word-limit
          :auto-size="{ minRows: 3, maxRows: 5 }" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <a-switch v-model="form.status" type="round" :checked-value="1" :unchecked-value="0" checked-text="正常"
          unchecked-text="禁用" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { type FormInstance, Message } from '@arco-design/web-vue'
import * as Regexp from '@/utils/regexp'
import { useResetReactive } from '@/hooks'
import { getDictDetail } from '@/apis/system'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const formRef = useTemplateRef('formRef')
const roleId = ref('')
const isEdit = computed(() => !!roleId.value)
const title = computed(() => (isEdit.value ? '编辑字典' : '新增字典'))
const visible = ref(false)

const [form, resetForm] = useResetReactive({
  name: '',
  code: '',
  status: 1,
  description: ''
})

const rules: FormInstance['rules'] = {
  name: [{ required: true, message: '请输入字典名称' }],
  code: [
    { required: true, message: '请输入字典编码' },
    { match: Regexp.OnlyEn, message: '格式不对！只能是英文' }
  ],
  status: [{ required: true }]
}

const add = () => {
  roleId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  roleId.value = id
  visible.value = true
  const res = await getDictDetail({ id })
  Object.assign(form, res.data)
}

const close = () => {
  formRef.value?.resetFields()
  resetForm()
}

const save = async () => {
  try {
    const valid = await formRef.value?.validate()
    if (valid) return false
    const res = await new Promise((resolve) => setTimeout(() => resolve(true), 300))
    if (res) {
      Message.success('模拟保存成功')
      emit('save-success')
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

defineExpose({ add, edit })
</script>
