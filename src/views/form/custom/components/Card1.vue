<template>
  <a-card title="配置表单-查询">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看JSON配置</span>
      </a-button>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm class="gi_mb" :options="options" v-model="form" @search="search" @reset="reset"></GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { Drawer, Message } from '@arco-design/web-vue'
import type { Options } from '@/components/GiForm/type'
import GiCodeView from '@/components/GiCodeView/index.vue'

const form = reactive({
  name: '',
  phone: '',
  status: ''
})

const options: Options = {
  form: { layout: 'inline' },
  columns: [
    {
      type: 'input',
      label: '姓名',
      field: 'name',
      props: {
        maxLength: 4,
        placeholder: '请输入名称'
      }
    },
    {
      type: 'input',
      label: '手机',
      field: 'phone',
      props: {
        maxLength: 11,
        placeholder: '请输入手机号'
      }
    },
    {
      type: 'select',
      label: '状态',
      field: 'status',
      props: {
        placeholder: '状态',
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    }
  ]
}

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: JSON.stringify(options, null, '\t') }),
    width: 560
  })
}

const search = () => {
  Message.info('点击了搜索')
}

const reset = () => {
  Message.info('点击了重置')
}
</script>

<style lang="scss" scoped></style>
