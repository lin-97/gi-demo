export default `
<template>
  <a-card title="配置表单-查询">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看代码</span>
      </a-button>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm v-model="form" class="gi_mb" search :columns="columns" @search="search" @reset="reset">
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
import Card1Json from './code/card1-json'
import type { ColumnItem } from '@/components/GiForm'
import GiCodeView from '@/components/GiCodeView/index.vue'

const { width } = useWindowSize()

const form = reactive({
  name: '',
  phone: '',
  status: ''
})

const columns: ColumnItem[] = reactive([
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    props: {
      maxLength: 4
    }
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
    type: 'select',
    label: '状态',
    field: 'status',
    props: {
      placeholder: '自定义placeholder',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
])

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: Card1Json, type: 'vue' }),
    width: width.value < 500 ? '100%' : 560
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
`
