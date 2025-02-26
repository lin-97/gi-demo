<template>
  <a-modal v-model:visible="visible" :title="title" width="90%" :modal-style="{ maxWidth: '520px' }"
    :mask-closable="false" @before-ok="save" @close="close">
    <a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-form-item label="上级部门" field="parentId">
        <a-tree-select v-model="form.parentId" allow-clear :data="deptList" placeholder="请选择上级部门" :field-names="{
          key: 'id',
          title: 'name',
          children: 'children',
        }"></a-tree-select>
      </a-form-item>
      <a-form-item label="部门名称" field="name">
        <a-input v-model.trim="form.name" placeholder="请输入部门名称" allow-clear :max-length="10"></a-input>
      </a-form-item>
      <a-form-item label="排序" field="sort">
        <a-input-number v-model="form.sort" style="width: 120px" />
      </a-form-item>
      <a-form-item label="描述" field="description">
        <a-textarea v-model.trim="form.description" :max-length="200" placeholder="请填写描述" :auto-size="{ minRows: 3 }"
          show-word-limit />
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
import { useResetReactive } from '@/hooks'
import { useDept } from '@/hooks/app'
import { getDeptDetail } from '@/apis/system'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const formRef = useTemplateRef('formRef')
const deptId = ref('')
const visible = ref(false)
const isEdit = computed(() => !!deptId.value)
const title = computed(() => (isEdit.value ? '编辑部门' : '新增部门'))

const { deptList, getDeptList } = useDept()
getDeptList()

const [form, resetForm] = useResetReactive({
  id: '',
  parentId: '',
  name: '',
  sort: 0,
  status: 1,
  description: ''
})

const rules: FormInstance['rules'] = {
  name: [
    { required: true, message: '请输入部门名称' },
    { min: 3, max: 10, message: '长度在 3 - 10个字符' }
  ]
}

const add = () => {
  deptId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  if (!deptList.value.length) {
    await getDeptList()
  }
  deptId.value = id
  visible.value = true
  const res = await getDeptDetail({ id })
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
