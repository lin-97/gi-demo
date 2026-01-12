<template>
  <a-card title="配置表单-动态级联" :bordered="true" class="gi_margin">
    <template #extra>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" :model-value="form" :columns="columns"
          :grid-item-props="{ span: { xs: 24, sm: 12, md: 12, lg: 8 } }"
          @update:model-value="Object.assign(form, $event)">
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
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import { getProvinceCityArea } from '@/apis/area'
import * as Regexp from '@/utils/regexp'
import CodeJson from './Card3.vue?raw'

const form = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  area: ''
})

const formRef = useTemplateRef('formRef')

const dataMap: Record<string, { label: string, value: string }[]> = reactive({
  province: [],
  city: [],
  area: []
})

// 获取省份列表
const getProvinceList = async () => {
  const res = await getProvinceCityArea({ type: 'province' })
  dataMap.province = res.data.map((i) => ({ label: i.label, value: i.code }))
}
getProvinceList()

// 获取城市列表
const getCityList = async (provinceCode: string) => {
  const res = await getProvinceCityArea({ type: 'city', code: provinceCode })
  dataMap.city = res.data.map((i) => ({ label: i.label, value: i.code }))
}

// 获取区县列表
const getAreaList = async (cityCode: string) => {
  const res = await getProvinceCityArea({ type: 'area', code: cityCode })
  dataMap.area = res.data.map((i) => ({ label: i.label, value: i.code }))
}

const columns = computed<FormColumnItem<typeof form>[]>(() => {
  return [
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
      props: {
        options: dataMap.province,
        onChange: (value: string) => {
          form.city = ''
          form.area = ''
          getCityList(value)
        }
      }
    },
    {
      type: 'select',
      label: '市',
      field: 'city',
      props: {
        options: dataMap.city,
        onChange: (value: string) => {
          form.area = ''
          getAreaList(value)
        }
      }
    },
    {
      type: 'select',
      label: '区',
      field: 'area',
      props: {
        options: dataMap.area
      }
    },
    {
      type: 'input',
      label: '',
      field: 'btns',
      span: 24
    }
  ]
})

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}

onMounted(() => {
  form.province = '440000'
  form.city = '440300'
  form.area = '440307'
  if (form.province) {
    getCityList(form.province)
  }
  if (form.city) {
    getAreaList(form.city)
  }
})
</script>

<style lang="scss" scoped></style>
