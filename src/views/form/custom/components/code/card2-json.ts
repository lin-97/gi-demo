export default `
<template>
  <a-card title="配置表单-新增">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="isNameRequired = !isNameRequired">姓名必填动态设置</a-button>
        <a-button type="primary" status="warning" @click="onViewCode">
          <template #icon><icon-code /></template>
          <span>查看JSON配置</span>
        </a-button>
      </a-space>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" v-model="form" :options="options" :columns="columns">
          <template #test="{ disabled }"> 自定义插槽-禁用状态：{{ disabled }} </template>
          <template #btns>
            <a-row justify="end" class="w-full">
              <a-space>
                <a-button type="primary" @click="save">保存</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-row>
          </template>
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { cityOptions, deptData } from './data'
import Card2Json from './code/card2-json'
import GiCodeView from '@/components/GiCodeView/index.vue'
import GiForm from '@/components/GiForm'
import type { Columns, Options } from '@/components/GiForm'
import * as Regexp from '@/utils/regexp'
import { useDict } from '@/hooks/app'

const { width } = useWindowSize()
const { data: status_options } = useDict({ code: 'status' })
const isNameRequired = ref(true)

const form = reactive({
  name: '',
  phone: '',
  sort: 0,
  sex: '',
  birthday: '',
  hobbys: [],
  status: 1,
  mark: 0,
  hide: false,
  grade: 0,
  test: '',
  remark: ''
})

const formRef = useTemplateRef('formRef')

const options: Options = reactive({
  btns: { hide: true }
})

const columns = computed<Columns<typeof form>>(() => [
  {
    type: 'group-title',
    label: '基本信息',
    field: 'base-title',
    span: 2,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    props: {
      maxLength: 4
    },
    rules: [
      // 动态rules示例
      ...(() => {
        return [
          { required: isNameRequired.value, message: '请输入姓名' },
          { maxLength: 4, message: '姓名不超过4个字符' },
          { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
        ]
      })()
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
      { required: !!form.name, message: '请输入手机号' }, // 如果有name的时候，手机号必填（动态rules示例）
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
    span: 2,
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
    options: status_options.value // 这里使用了字典
  },
  {
    label: '测试',
    field: 'test',
    disabled: (i) => i.status === 0,
    formItemProps: { extra: '查看这里效果请切换状态' }
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
    formItemProps: { extra: '隐藏成绩项' }
  },
  {
    type: 'slider',
    label: '成绩',
    field: 'grade',
    span: 2,
    hide: (i) => {
      i.hide && (i.grade = 0)
      return i.hide === true
    }
  },
  {
    type: 'group-title',
    label: '分组标题1',
    field: 'group-title1',
    span: 2,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'cascader',
    label: '城市',
    field: 'city',
    options: cityOptions,
    disabled: (i) => i.status === 0
  },
  {
    type: 'tree-select',
    label: '部门',
    field: 'dept',
    data: deptData,
    disabled: (i) => i.status === 0
  },
  {
    type: 'group-title',
    label: '分组标题2',
    field: 'group-title2',
    span: 2,
    formItemProps: {
      labelColStyle: { display: 'none' }
    }
  },
  {
    type: 'textarea',
    label: '备注',
    field: 'remark',
    span: 2,
    formItemProps: { extra: '这里是额外信息' }
  },
  {
    type: 'upload',
    label: '附件',
    field: 'file',
    span: 2,
    props: {
      listType: 'picture-card',
      action: '/'
    },
    formItemProps: {
      extra: '上传文件只支持zip、rar、doc、docx、pdf、jpg、png格式'
    }
  },
  {
    field: 'btns',
    span: 2
  }
])

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: Card2Json, type: 'vue' }),
    width: width.value < 560 ? '100%' : 560
  })
}

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}
</script>

<style lang="scss" scoped></style>
`