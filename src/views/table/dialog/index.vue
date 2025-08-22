<template>
  <GiPageLayout margin :body-style="{ overflowY: 'auto' }">
    <a-row align="center" class="gi_mb">
      <a-alert style="margin-right: 8px; flex: 1">通过函数调用表格弹窗</a-alert>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </a-row>

    <GiForm v-model="form" :columns="columns">
    </GiForm>

    <a-alert type="normal" class="gi_mb">通过以下方式可以快速构建表格选择弹窗</a-alert>
    <GiCodeView :code-json="DialogCodeJson"></GiCodeView>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { selectTreeUserListDialog, selectUserListDialog } from '@/components/dialog'
import DialogCodeJson from '@/components/dialog/index.ts?raw'
import GiInputSearch from '@/components/GiInputSearch/index.vue'
import CodeJson from './index.vue?raw'

const form = reactive({
  radioId: '',
  radioName: '',
  checkboxId: '',
  checkboxName: '',
  asyncId: '',
  asyncName: '',
  demoId: '',
  demoName: ''
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
    field: 'checkboxId',
    fieldName: 'checkboxName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectUserListDialog({
          multiple: true,
          onOk: (data) => {
            form.checkboxId = data.map((i) => i.id).join(',')
            form.checkboxName = data.map((i) => i.name).join(',')
          }
        })
      },
      onClear: () => {
        form.checkboxId = ''
        form.checkboxName = ''
      }
    }
  },
  {
    type: GiInputSearch,
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
  },
  {
    type: GiInputSearch,
    label: '左树右表',
    field: 'demoId',
    fieldName: 'demoName',
    props: {
      allowClear: true,
      onSearch: () => {
        selectTreeUserListDialog({
          multiple: true,
          onOk: (data) => {
            form.demoId = data.map((i) => i.id).join(',')
            form.demoName = data.map((i) => i.name).join(',')
          }
        })
      },
      onClear: () => {
        form.demoId = ''
        form.demoName = ''
      }
    }
  }
] as ColumnItem[])
</script>

<style lang="scss" scoped></style>
