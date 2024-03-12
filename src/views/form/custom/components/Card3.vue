<template>
  <a-card title="配置表单-弹窗">
    <a-alert>此示例编辑模式会禁用状态、是否隐藏</a-alert>
    <a-card title="表单-模态框" :bordered="true" class="gi_mt">
      <a-space>
        <a-button type="primary" @click="onAdd">新增</a-button>
        <a-button type="primary" status="success" @click="onEdit">编辑</a-button>
      </a-space>
    </a-card>

    <a-card title="表单-抽屉" :bordered="true" class="gi_mt">
      <a-space>
        <a-button type="primary" @click="onAddDrawer">新增</a-button>
        <a-button type="primary" status="success" @click="onEditDrawer">编辑</a-button>
      </a-space>
    </a-card>

    <a-drawer :title="isEdit ? '编辑' : '新增'" :width="width >= 600 ? 600 : '100%'" v-model:visible="visible">
      <GiForm :options="options" :columns="columns" v-model="form"></GiForm>
    </a-drawer>
  </a-card>
</template>

<script setup lang="ts">
import { Modal } from '@arco-design/web-vue'
import * as Regexp from '@/utils/regexp'
import { cityOptions, deptData } from './data'
import { GiForm, useGiForm, type Options, type Columns } from '@/components/GiForm'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 12 },
  btns: { hide: true }
}

const initColumns: Columns = [
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    props: {
      maxLength: 4
    },
    rules: [
      { required: true, message: '请输入姓名' },
      { maxLength: 4, message: '姓名不超过4个字符' },
      { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
    ]
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    },
    rules: [
      { required: true, message: '请输入手机号' },
      { match: Regexp.Phone, message: '手机号格式不正确' }
    ]
  },
  {
    type: 'select',
    label: '性别',
    field: 'sex',
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 0 }
    ]
  },
  {
    type: 'date-picker',
    label: '生日',
    field: 'birthday'
  },
  {
    type: 'checkbox-group',
    label: '爱好',
    field: 'hobbys',
    col: { xs: 24 },
    options: [
      { label: '电影', value: '01' },
      { label: '音乐', value: '02' },
      { label: '旅行', value: '03' },
      { label: '游戏', value: '04' }
    ]
  },
  {
    type: 'input-number',
    label: '排序',
    field: 'sort',
    props: {
      min: 0
    }
  },
  {
    type: 'radio-group',
    label: '状态',
    field: 'status',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    type: 'rate',
    label: '评分',
    field: 'mark'
  },
  {
    type: 'switch',
    label: '是否隐藏',
    field: 'hide',
    item: { extra: '隐藏成绩项' }
  },
  {
    type: 'slider',
    label: '成绩',
    field: 'grade'
  },
  {
    type: 'cascader',
    label: '城市',
    field: 'city',
    options: cityOptions
  },
  {
    type: 'tree-select',
    label: '部门',
    field: 'dept',
    data: deptData
  },
  {
    type: 'textarea',
    label: '备注',
    field: 'remark',
    span: 24,
    item: { extra: '这里是额外信息' }
  }
]

const { columns, resetColumns, setPropsValue } = useGiForm(initColumns)

const form = reactive({
  remark: '这是备注这是备注',
  status: 1
})

const onAdd = () => {
  resetColumns()
  Modal.open({
    title: '新增',
    width: '90%',
    modalStyle: { maxWidth: '600px' },
    content: () =>
      h(GiForm, {
        options: options,
        columns: columns,
        modelValue: form,
        'onUpdate:modelValue': (e) => Object.assign(form, e)
      })
  })
}

const onEdit = () => {
  setPropsValue('status', 'disabled', true) // 禁用 状态
  setPropsValue('hide', 'disabled', true) // 禁用 是否隐藏
  Modal.open({
    title: '编辑',
    width: '90%',
    modalStyle: { maxWidth: '600px' },
    content: () =>
      h(GiForm, {
        options: options,
        columns: columns,
        modelValue: form,
        'onUpdate:modelValue': (e) => Object.assign(form, e)
      })
  })
}

const visible = ref(false)
const isEdit = ref(false)
const onAddDrawer = () => {
  resetColumns()
  isEdit.value = false
  visible.value = true
}

const onEditDrawer = () => {
  setPropsValue('status', 'disabled', true) // 禁用 状态
  setPropsValue('hide', 'disabled', true) // 禁用 是否隐藏
  isEdit.value = true
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
