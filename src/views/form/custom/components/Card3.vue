<template>
  <a-card title="配置表单-动态级联" :bordered="true" class="gi_margin">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看代码</span>
      </a-button>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" v-model="form" :columns="columns"
          :grid-item-props="{ span: { xs: 24, sm: 12, md: 12, lg: 8 } }">
          <template #btns>
            <a-row justify="end" class="w-full">
              <a-space>
                <a-button type="primary" @click="save">提交</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-row>
          </template>
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <a-alert type="warning" class="gi_mb">具体配置看源码</a-alert>
        <GiCodeView :code-json="JSON.stringify(form, null, '\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import Card3Json from './code/card3-json'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import * as Regexp from '@/utils/regexp'
import { getAreaList } from '@/apis/area'

const { width } = useWindowSize()

const form = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  area: ''
})

onMounted(() => {
  form.province = '440000'
  form.city = '440300'
  form.area = '440307'
})

const formRef = useTemplateRef('formRef')

const columns: ColumnItem<typeof form>[] = reactive([
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    span: { xs: 24, sm: 12 },
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
    span: { xs: 24, sm: 12 },
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
    label: '省',
    field: 'province',
    request: () => getAreaList({ type: 'province' }),
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),
    cascader: ['city'],
    init: true
  },
  {
    type: 'select',
    label: '市',
    field: 'city',
    request: (form) => getAreaList({ type: 'city', code: form.province }),
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),
    cascader: ['area']
  },
  {
    type: 'select',
    label: '区',
    field: 'area',
    request: (form) => getAreaList({ type: 'area', code: form.city }),
    resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code }))
  },
  {
    type: 'input',
    label: '',
    field: 'btns',
    span: 24
  }
])

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: Card3Json, type: 'vue' }),
    width: width.value < 500 ? '100%' : 560
  })
}
</script>

<style lang="scss" scoped></style>
