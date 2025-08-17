<template>
  <GiPageLayout margin :body-style="{ overflowY: 'auto' }">
    <a-row align="center" class="gi_mb">
      <a-alert style="margin-right: 8px; flex: 1">通过函数调用表格弹窗</a-alert>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </a-row>

    <GiForm v-model="form" :columns="columns">
    </GiForm>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { selectUserListDialog } from '@/components/dialog'
import CodeJson from './index.vue?raw'

const form = reactive({
  radioId: '',
  radioName: '',
  chekboxId: '',
  chekboxName: '',
  asyncId: '',
  asyncName: ''
})

const columns = reactive([
  {
    type: 'input-search',
    label: '单选',
    field: 'radioId',
    fieldName: 'radioName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserListDialog({
          onOk: (data) => {
            form.radioId = data[0].id
            form.radioName = data[0].name
          }
        })
      },
      onClear: () => {
        form.radioId = ''
        form.radioName = ''
      }
    }
  },
  {
    type: 'input-search',
    label: '多选',
    field: 'chekboxId',
    fieldName: 'chekboxName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserListDialog({
          multiple: true,
          onOk: (data) => {
            form.chekboxId = data.map((i) => i.id).join(',')
            form.chekboxName = data.map((i) => i.name).join(',')
          }
        })
      },
      onClear: () => {
        form.chekboxId = ''
        form.chekboxName = ''
      }
    }
  },
  {
    type: 'input-search',
    label: '异步',
    field: 'asyncId',
    fieldName: 'asyncName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserListDialog({
          multiple: true,
          onBeforeOk: async (data) => {
            await new Promise((reslove) => setTimeout(() => reslove(true), 1000))
            form.asyncId = data.map((i) => i.id).join(',')
            form.asyncName = data.map((i) => i.name).join(',')
            return true
          }
        })
      },
      onClear: () => {
        form.asyncId = ''
        form.asyncName = ''
      }
    }
  }
] as ColumnItem[])
</script>

<style lang="scss" scoped></style>
