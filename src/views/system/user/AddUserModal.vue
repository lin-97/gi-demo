<template>
  <a-modal v-model:visible="visible" :width="600" :title="title" :mask-closable="false" @before-ok="save">
    <a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-row>
        <a-col :span="12">
          <a-form-item label="用户名" field="username" :validate-trigger="['change', 'input']">
            <a-input placeholder="请输入用户名" v-model="form.username"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="昵称" field="nickname" :validate-trigger="['change', 'input']">
            <a-input placeholder="请输入昵称" v-model="form.nickname"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-item label="手机号码" field="phone" :validate-trigger="['change', 'input']">
            <a-input placeholder="请输入手机号码" v-model="form.phone"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="邮箱" field="email" :validate-trigger="['change', 'input']">
            <a-input placeholder="请输入邮箱" v-model="form.email"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="性别" field="gender">
        <a-radio-group v-model="form.gender">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="所属部门" field="deptId">
        <a-tree-select
          v-model="form.deptId"
          :data="deptList"
          :fieldNames="{
            key: 'id',
            title: 'name'
          }"
          placeholder="请选择所属部门"
          allow-clear
          allow-search
          :disabled="form.disabled"
        />
      </a-form-item>

      <a-form-item label="角色" field="roleIds" :disabled="form.disabled">
        <a-select
          v-model="form.roleIds"
          :options="roleOptions"
          placeholder="请选择所属角色"
          multiple
          allow-clear
          :allow-search="{ retainInputValue: true }"
        />
      </a-form-item>

      <a-form-item label="描述" field="description">
        <a-textarea
          v-model="form.description"
          :max-length="200"
          placeholder="请输入描述"
          :auto-size="{ minRows: 3 }"
          show-word-limit
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
import { useDept, useRole } from '@/hooks/app'
import * as Regexp from '@/utils/regexp'
import { getSystemUserDetail, saveSystemUser } from '@/apis'
import { Message } from '@arco-design/web-vue'

const { roleList, getRoleList } = useRole()
getRoleList()
const roleOptions = computed(() => roleList.value.map((i) => ({ label: i.name, value: i.code })))

const userId = ref('')
const title = computed(() => (!!userId.value ? '编辑用户' : '新增用户'))
const visible = ref(false)

const form = reactive({
  username: '',
  nickname: '',
  email: '',
  phone: '',
  gender: 1,
  deptId: '',
  roleIds: [],
  address: '',
  disabled: false,
  description: '',
  status: 0
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 2, max: 4, message: '长度在 2 - 4个字符' }
  ],
  nickname: [
    { required: true, message: '请输入昵称' },
    { min: 2, max: 4, message: '长度在 2 - 4个字符' }
  ],
  email: [{ match: Regexp.Email, message: '邮箱格式不正确' }],
  phone: [{ match: Regexp.Phone, message: '手机号格式不正确' }],
  deptId: [{ required: true, message: '请选择所属部门' }],
  roleIds: [{ required: true, message: '请选择角色' }],
  status: [{ required: true, message: '请选择状态' }]
}

const { deptList, getDeptList } = useDept()
getDeptList()

const add = () => {
  userId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  userId.value = id
  const res = await getSystemUserDetail({ id })
  Object.assign(form, res.data)
  visible.value = true
}

defineExpose({ add, edit })

const save = async () => {
  try {
    const res = await saveSystemUser(form)
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
