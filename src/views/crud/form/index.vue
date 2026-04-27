<template>
  <a-card :title="isEdit ? '编辑' : '新增'" class="g-page-card">
    <template #extra>
      <a-space>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
        <a-button type="primary" :loading="submitLoading" @click="submit">
          {{ isEdit ? '保存' : '新增' }}
        </a-button>
        <a-button @click="router.back()">返回</a-button>
      </a-space>
    </template>

    <a-spin :loading="loading" class="w-full">
      <GiForm ref="GiFormRef" :model-value="form" :columns="formColumns" :grid-item-props="{ span: { xs: 24, sm: 12 } }"
        @update:model-value="Object.assign(form, $event)" />
    </a-spin>
  </a-card>
</template>

<script setup lang="ts">
import type { FormColumnItem } from '@/components/index'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import { useDict } from '@/hooks'
import { useTabsStore } from '@/stores'
import * as Regexp from '@/utils/regexp'
import CodeJson from './index.vue?raw'

defineOptions({ name: 'CrudForm' })

const route = useRoute()
const router = useRouter()
const { setTabTitle } = useTabsStore()

const { dictData } = useDict(['STATUS', 'GENDER', 'HOBBY'])

const GiFormRef = useTemplateRef<InstanceType<typeof GiForm>>('GiFormRef')

const isEdit = computed(() => Boolean(route.query.id))

const loading = ref(false)
const submitLoading = ref(false)

const form = reactive({
  id: '',
  name: '',
  account: '',
  avatar: '',
  gender: '1' as Gender,
  phone: '',
  email: '',
  createTime: '',
  address: '',
  age: 0,
  status: '0' as Status,
  hobby: [] as string[],
  remark: ''
})

const formColumns = computed<FormColumnItem[]>(() => [
  {
    type: 'input',
    label: '姓名',
    field: 'name',
    required: true,
    rules: [
      { maxLength: 20, message: '姓名不超过20个字符' },
      { match: Regexp.OnlyCh, message: '仅支持中文' }
    ]
  },
  {
    type: 'input',
    label: '账户',
    field: 'account'
  },
  {
    type: 'input',
    label: '手机号',
    field: 'phone',
    rules: [{ match: Regexp.Phone, message: '手机号格式不正确' }]
  },
  {
    type: 'radio-group',
    label: '性别',
    field: 'gender',
    props: { options: dictData.value.GENDER }
  },
  {
    type: 'input',
    label: '邮箱',
    field: 'email',
    rules: [{ match: Regexp.Email, message: '邮箱格式不正确' }]
  },
  {
    type: 'input-number',
    label: '年龄',
    field: 'age',
    props: { min: 1, max: 150 },
    rules: [{ type: 'number', min: 1, max: 150, message: '年龄范围为 1-150' }]
  },
  {
    type: 'switch',
    label: '状态',
    field: 'status',
    props: { checkedValue: '1', uncheckedValue: '0', checkedText: '正常', uncheckedText: '禁用', uncheckedColor: 'rgb(var(--danger-6))' }
  },
  {
    type: 'select',
    label: '爱好',
    field: 'hobby',
    props: { options: dictData.value.HOBBY, multiple: true }
  },
  {
    type: 'input',
    label: '地址',
    field: 'address',
    span: 24
  },
  {
    type: 'textarea',
    label: '备注',
    field: 'remark',
    span: 24
  }
])

/** 编辑时根据 id 拉取详情 */
async function fetchDetail() {
  const id = route.query.id as string
  if (!id) return
  try {
    loading.value = true
    const res = await baseAPI.getDetail({ id })
    if (res.data) {
      Object.assign(form, res.data)
    }
  } finally {
    loading.value = false
  }
}

async function submit() {
  const valid = await GiFormRef.value?.formRef?.validate()
  if (valid) return
  try {
    submitLoading.value = true
    if (isEdit.value) {
      await baseAPI.update(form)
      Message.success('保存成功')
    } else {
      await baseAPI.add(form)
      Message.success('新增成功')
    }
    router.back()
  } catch {
    Message.error(isEdit.value ? '保存失败' : '新增失败')
  } finally {
    submitLoading.value = false
  }
}

watch(
  () => route.query.id,
  (id) => {
    if (id) fetchDetail()
  },
  { immediate: true }
)

if (isEdit.value) setTabTitle('编辑')
</script>

<style lang="scss" scoped></style>
