<template>
  <a-modal v-model:visible="visible" :title="title" width="90%" :mask-closable="false"
    :modal-style="{ maxWidth: '520px' }" @before-ok="save" @close="close">
    <a-spin :loading="loading" class="w-full">
      <a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
        <a-form-item label="字典名" field="name">
          <a-input v-model.trim="form.name" placeholder="请输入字典名" allow-clear :max-length="10"></a-input>
        </a-form-item>
        <a-form-item label="字典值" field="value">
          <a-input v-model.trim="form.value" placeholder="请输入字典值" allow-clear :max-length="10"></a-input>
        </a-form-item>
        <a-form-item label="状态" field="status">
          <a-switch v-model="form.status" type="round" :checked-value="1" :unchecked-value="0" checked-text="正常"
            unchecked-text="禁用" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { type FormInstance, Message } from '@arco-design/web-vue'
import { getDictDataDetail } from '@/apis/system'
import { useResetReactive } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const formRef = useTemplateRef('formRef')
const dictDataId = ref('')
const isEdit = computed(() => !!dictDataId.value)
const title = computed(() => (isEdit.value ? '编辑字典数据' : '新增字典数据'))
const visible = ref(false)
const loading = ref(false)

const [form, resetForm] = useResetReactive({
  name: '',
  value: '',
  status: 1
})

const rules: FormInstance['rules'] = {
  name: [{ required: true, message: '请输入字典名' }],
  value: [
    { required: true, message: '请输入字典值' },
    { match: /^[a-zA-Z0-9_]*$/, message: '格式不对！只能包含英文数字下划线' }
  ],
  status: [{ required: true }]
}

const add = () => {
  dictDataId.value = ''
  visible.value = true
}

const edit = async (data: { id: string, code: string }) => {
  visible.value = true
  dictDataId.value = data.id
  loading.value = true
  const res = await getDictDataDetail(data)
  Object.assign(form, res.data)
  loading.value = false
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
