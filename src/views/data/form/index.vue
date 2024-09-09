<template>
  <div class="gi_page form-base">
    <section class="gi_box">
      <a-card :title="title" :bordered="false">
        <template #extra>
          <a-button @click="back">返回</a-button>
        </template>
        <a-spin :loading="loading">
          <a-form ref="formRef" :model="form" :rules="rules" auto-label-width class="form-base__form">
            <a-form-item label="ID" field="id">{{ form.id || '暂无' }}</a-form-item>
            <a-form-item label="姓名" field="name">
              <a-input v-model="form.name" placeholder="请输入姓名" allow-clear />
              <template #extra>
                <a-typography-text type="secondary">请输入中文姓名</a-typography-text>
              </template>
            </a-form-item>
            <a-form-item label="手机号" field="phone">
              <a-input v-model="form.phone" placeholder="请输入手机号" allow-clear />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button @click="reset">重置</a-button>
                <a-button type="primary" :loading="saveLoading" @click="save">提交</a-button>
              </a-space>
            </a-form-item>
          </a-form>
          <GiCodeView :code-json="codeJson"></GiCodeView>
        </a-spin>
      </a-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import * as Regexp from '@/utils/regexp'
import { useFormCurd } from '@/hooks/app'
import { addPerson, getPersonById, initPerson, updatePerson } from '@/apis/person'

defineOptions({ name: 'DataForm' })

const route = useRoute()
const formRef = ref<FormInstance>()

const rules: FormInstance['rules'] = {
  name: [
    { required: true, message: '请输入姓名' },
    { maxLength: 4, message: '姓名不超过4个字符' },
    { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { match: Regexp.Phone, message: '手机号格式不正确' }
  ]
}

/**
 * @description useFormCurd 的特性
 * 1. 能够快速实现表单的新增编辑
 * 2. 能够监视表单的更改，在你点击返回按钮的时候提示：'您确定丢弃更改的内容吗？'
 * 3. 封装思路可作为参考
 */
type Form = { id: string, name: string, phone: string }
const { form, title, loading, save, saveLoading, back, reset } = useFormCurd<Form>({
  key: 'id', // 主键
  formRef: formRef as Ref<FormInstance>, // 表单的实例对象
  initApi: initPerson, // 初始化表单字段接口
  detailApi: () => getPersonById({ id: route.query.id as string }), // 编辑模式下查询详情接口
  addApi: (form) => addPerson({ ...form, extra: '额外参数-新增' }), // 新增接口
  editApi: (form) => updatePerson({ ...form, extra: '额外参数-编辑' }), // 编辑接口
  addToEdit: true, // 新增成功跳到编辑模式
  onSuccess: () => {
    // console.log('保存成功后的回调函数', form.id)
  }
})

const codeJson = `
const route = useRoute()
const formRef = ref<FormInstance>()

const rules: FormInstance['rules'] = {
  name: [
    { required: true, message: '请输入姓名' },
    { maxLength: 4, message: '姓名不超过4个字符' },
    { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { match: Regexp.Phone, message: '手机号格式不正确' }
  ]
}

/**
 * @description useFormCurd 的特性
 * 1. 能够快速实现表单的新增编辑
 * 2. 能够监视表单的更改，在你点击返回按钮的时候提示：'您确定丢弃更改的内容吗？'
 * 3. 封装思路可作为参考
 */
type Form = { id: string; name: string; phone: string }
const { form, title, loading, save, saveLoading, back, reset } = useFormCurd<Form>({
  key: 'id', // 主键
  formRef: formRef, // 表单的实例对象
  initApi: initPerson, // 初始化表单字段接口
  detailApi: () => getPersonById({ id: route.query.id as string }), // 编辑模式下查询详情接口
  addApi: (form) => addPerson({ ...form, extra: '额外参数-新增' }), // 新增接口
  editApi: (form) => updatePerson({ ...form, extra: '额外参数-编辑' }), // 编辑接口
  addToEdit: true, // 新增成功跳到编辑模式
  onSuccess: (form)=> {
    console.log('保存成功后的回调函数', form.id)
  }
})
`
</script>

<style lang="scss" scoped>
.form-base {
  &__form {
    width: 450px;
    max-width: 100%;
  }

  :deep(.arco-spin) {
    display: block;
  }
}
</style>
