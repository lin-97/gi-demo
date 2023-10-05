<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :width="isPhone() ? '100%' : 'auto'"
    :mask-closable="false"
    @before-ok="save"
    @close="close"
  >
    <a-form ref="FormRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-form-item label="角色名称" field="name">
        <a-input placeholder="请输入角色名称" v-model="form.name"> </a-input>
      </a-form-item>
      <a-form-item label="角色编号" field="code">
        <a-input placeholder="请输入角色编号" v-model="form.code" :disabled="isEdit"> </a-input>
      </a-form-item>
      <a-form-item label="描述" field="description">
        <a-textarea
          v-model="form.description"
          placeholder="请填写描述"
          :max-length="200"
          show-word-limit
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <a-switch
          type="round"
          v-model="form.status"
          :checked-value="1"
          :unchecked-value="0"
          checked-text="正常"
          unchecked-text="禁用"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { getSystemRoleDetail, saveSystemRole } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { isPhone } from '@/utils/common'

const FormRef = ref<FormInstance>()
const roleId = ref('')
const isEdit = computed(() => !!roleId.value)
const title = computed(() => (isEdit.value ? '编辑角色' : '新增角色'))
const visible = ref(false)

const form = reactive({
  name: '',
  code: '',
  status: 1,
  description: ''
})

const rules = {
  name: [
    { required: true, message: '请输入角色名称' },
    { min: 3, max: 10, message: '长度在 3 - 10个字符' }
  ],
  code: [{ required: true, message: '请输入角色编号' }],
  status: [{ required: true }]
}

const add = () => {
  roleId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  roleId.value = id
  const res = await getSystemRoleDetail({ id })
  Object.assign(form, res.data)
  visible.value = true
}

const close = () => {
  FormRef.value?.resetFields()
}

defineExpose({ add, edit })

const save = async () => {
  try {
    const res = await saveSystemRole(form)
    if (res.data) {
      Message.success('模拟保存成功')
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
</script>
