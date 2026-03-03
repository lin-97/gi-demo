<template>
  <a-modal v-model:visible="visible" :title="title" width="calc(100% - 20px)" :mask-closable="false"
    :modal-style="{ maxWidth: '600px' }" :body-style="{ maxHeight: '70vh' }" @before-ok="save" @close="close">
    <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns"
      :grid-item-props="{ span: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 } }"
      @update:model-value="Object.assign(form, $event)" />
  </a-modal>
</template>

<script setup lang="ts">
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/user'
import { GiForm } from '@/components/index'
import { useResetReactive } from '@/hooks'
import { useDept, useRole } from '@/hooks/app'
import * as Regexp from '@/utils/regexp'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { roleList, getRoleList } = useRole()
getRoleList()
const roleOptions = computed(() => roleList.value.map((i) => ({ label: i.name, value: i.code })))

const { deptList, getDeptList } = useDept()
getDeptList()

const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')
const detailId = ref('')
const isEdit = computed(() => !!detailId.value)
const title = computed(() => (isEdit.value ? '编辑用户' : '新增用户'))
const visible = ref(false)

const [form, resetForm] = useResetReactive({
  id: '',
  username: '', // 用户名
  nickname: '', // 昵称
  gender: 1 as Gender, // 性别 1男 2女
  phone: '', // 手机号
  email: '', // 邮箱
  deptId: '', // 部门
  roleIds: [] as string[], // 角色(可能多个)
  description: '', // 描述
  status: 1 as Status, // 状态 0禁用 1启用(正常)
  type: 2 as 1 | 2, // 类型 1系统内置(admin是系统内置) 2自定义
  disabled: false // 如果 type===1 这为 true, 主要作用是列表复选框禁用状态
})

const formColumns = computed<FormColumnItem[]>(() => [
  {
    type: 'input',
    label: '用户名',
    field: 'username',
    required: true,
    rules: [
      { min: 2, max: 4, message: '长度在 2 - 4个字符' }
    ],
    props: { maxLength: 10, disabled: form.disabled }
  },
  {
    type: 'input',
    label: '昵称',
    field: 'nickname',
    required: true,
    rules: [
      { min: 2, max: 4, message: '长度在 2 - 4个字符' }
    ],
    props: { maxLength: 10 }
  },
  {
    type: 'input',
    label: '手机号码',
    field: 'phone',
    rules: [{ match: Regexp.Phone, message: '手机号格式不正确' }],
    props: { maxLength: 11 }
  },
  {
    type: 'input',
    label: '邮箱',
    field: 'email',
    rules: [{ match: Regexp.Email, message: '邮箱格式不正确' }],
    props: { maxLength: 30 }
  },
  {
    type: 'radio-group',
    label: '性别',
    field: 'gender',
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ]
    }
  },
  {
    type: 'tree-select',
    label: '所属部门',
    field: 'deptId',
    required: true,
    props: {
      data: deptList.value,
      fieldNames: { key: 'id', title: 'name' },
      allowSearch: true,
      disabled: form.disabled
    },
    span: 24
  },
  {
    type: 'select',
    label: '角色',
    field: 'roleIds',
    required: true,
    props: {
      options: roleOptions.value,
      multiple: true,
      allowSearch: { retainInputValue: true },
      disabled: form.disabled
    },
    span: 24
  },
  {
    type: 'textarea',
    label: '描述',
    field: 'description',
    props: {
      maxLength: 200,
      autoSize: { minRows: 3 },
      showWordLimit: true
    },
    span: 24
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
    const res = await await new Promise((resolve) => setTimeout(() => resolve(true), 300))
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
