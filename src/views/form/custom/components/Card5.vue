<template>
  <a-card title="配置表单-查询">
    <template #extra>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>
    <a-row :gutter="30" class="gi_mb">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" v-model="form" :columns="columns" :fc="fc">
        </GiForm>
        <a-row justify="end" class="w-full">
          <a-space>
            <a-button type="primary" @click="save">提交</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-row>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '\t')"></GiCodeView>
      </a-col>
    </a-row>

    <a-row :gutter="30" class="gi_mb">
      <a-col :xs="24" :sm="24" :md="12">
        <gi-edit-table :columns="tableColumns" :data="data" size="small" class="gi-mb"></gi-edit-table>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(fc, null, '\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import CodeJson from './Card5.vue?raw'

const form = reactive({
  name: '',
  phone: '',
  status: 1
})

const formRef = useTemplateRef('formRef')

const columns = reactive([
  {
    type: 'input',
    label: '姓名',
    field: 'name'
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    }
  },
  {
    type: 'radio-group',
    label: '状态',
    field: 'status',
    props: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
] as FormColumnItem[])

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}

const tableColumns: any[] = [
  { title: '字段', dataIndex: 'field' },
  { type: 'checkbox', title: '必填', dataIndex: 'required' },
  { type: 'checkbox', title: '禁用', dataIndex: 'disabled' },
  { type: 'checkbox', title: '隐藏', dataIndex: 'hidden' }
]

const data = ref([
  {
    field: 'name',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    field: 'phone',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    field: 'status',
    required: false,
    disabled: false,
    hidden: false
  }
])

const fc = computed(() => {
  const obj: Record<string, { required: boolean, disabled: boolean, hidden: boolean }> = {}
  data.value.forEach((item) => {
    obj[item.field] = {
      required: item.required,
      disabled: item.disabled,
      hidden: item.hidden
    }
  })
  return obj
})
</script>

<style lang="scss" scoped></style>
