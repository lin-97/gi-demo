<template>
  <a-modal v-model:visible="visible" :title="title" width="90%" :mask-closable="false"
    :modal-style="{ maxWidth: '520px' }" @before-ok="save" @close="close">
    <a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-form-item label="角色名称" field="name">
        <a-input v-model.trim="form.name" placeholder="请输入角色名称" allow-clear :max-length="10"> </a-input>
      </a-form-item>
      <a-form-item label="角色编码" field="code">
        <a-input v-model.trim="form.code" placeholder="请输入角色编码" allow-clear :disabled="isEdit" :max-length="10">
        </a-input>
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
import { getRoleDetail } from '@/apis/system'
import { useResetReactive } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const formRef = useTemplateRef('formRef')
const roleId = ref('')
const isEdit = computed(() => !!roleId.value)
const title = computed(() => (isEdit.value ? '编辑角色' : '新增角色'))
const visible = ref(false)

const [form, resetForm] = useResetReactive({
  name: '',
  code: '',
  status: 1,
  description: ''
})

const rules: FormInstance['rules'] = {
  name: [
    { required: true, message: '请输入角色名称' },
    { min: 3, max: 10, message: '长度在 3 - 10个字符' }
  ],
  code: [
    { required: true, message: '请输入角色编码' },
    { match: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '格式不对！只能英文开头，包含英文数字下划线' }
  ],
  status: [{ required: true }]
}

const add = () => {
  roleId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  visible.value = true
  roleId.value = id
  const res = await getRoleDetail({ id })
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
