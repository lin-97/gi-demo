<template>
  <div class="form-manage">
    <a-page-header title="基础表单" subtitle="Base Form" :show-back="false" class="head">
      <template #extra>
        <a-button>返回</a-button>
      </template>
    </a-page-header>

    <section class="content">
      <a-card title="新增" :bordered="false" size="medium">
        <a-space :size="50">
          <a-form ref="formRef" :model="form" size="medium" auto-label-width class="form">
            <a-form-item field="name" label="姓名" :rules="rules.name" :validate-trigger="['change', 'input']">
              <a-input v-model="form.name" placeholder="请输入姓名" allow-clear />
              <template #extra>
                <a-typography-text type="secondary">请输入中文姓名</a-typography-text>
              </template>
            </a-form-item>
            <a-form-item field="phone" label="手机号" :rules="rules.phone">
              <a-input v-model="form.phone" placeholder="请输入手机号" allow-clear />
            </a-form-item>
            <a-form-item field="age" label="年龄">
              <a-input v-model="form.age" placeholder="请输入年龄" allow-clear />
            </a-form-item>
            <a-form-item field="sex" label="性别" :rules="rules.sex">
              <a-radio-group v-model="form.sex" allow-clear>
                <a-radio value="1">男</a-radio>
                <a-radio value="2">女</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item field="birthday" label="生日">
              <a-date-picker v-model="form.birthday" placeholder="请选择出生日期" allow-clear />
            </a-form-item>
            <a-form-item field="dept" label="部门">
              <a-tree-select
                :data="treeData"
                v-model="form.dept"
                multiple
                placeholder="请选择部门"
                allow-clear
              ></a-tree-select>
            </a-form-item>
            <a-form-item field="grade" label="学历">
              <a-select v-model="form.grade" placeholder="请选择学历" allow-clear style="width: 120px">
                <a-option value="1">本科</a-option>
                <a-option value="2">大专</a-option>
                <a-option value="3">硕士</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="rangDate" label="在校日期范围">
              <a-range-picker v-model="form.rangDate" allow-clear @ok="onRangerPickerOk" />
            </a-form-item>
            <a-form-item field="hobbys" label="爱好">
              <a-select
                :options="hobbySelectList"
                v-model="form.hobbys"
                placeholder="请选择爱好"
                multiple
                allow-clear
              ></a-select>
            </a-form-item>
            <a-form-item field="isRead">
              <a-checkbox v-model="form.isRead">我已阅读</a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button @click="reset">重置</a-button>
                <a-button type="primary" @click="submit">提交</a-button>
              </a-space>
            </a-form-item>
          </a-form>
          <section>
            <pre>{{ form }}</pre>
          </section>
        </a-space>
      </a-card>
    </section>
  </div>
</template>

<script setup lang="ts" name="BaseForm">
import { reactive, ref } from 'vue'
import type { Form, RangePickerInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { Phone, OnlyCh } from '@/utils/regexp'

const treeData = ref([
  {
    key: '01',
    title: '学生会',
    children: [
      {
        key: '011',
        title: '组织部'
      },
      {
        key: '012',
        title: '宣传部'
      }
    ]
  },
  {
    key: '02',
    title: '体育部',
    children: [
      {
        key: '021',
        title: '宣传部'
      },
      {
        key: '022',
        title: '策划部'
      },
      {
        key: '023',
        title: '组织部'
      }
    ]
  }
])

const hobbySelectList = [
  { label: '运动', value: '运动', tagProps: { color: 'red' } },
  { label: '音乐', value: '音乐', tagProps: { color: 'green' } },
  { label: '电影', value: '电影', tagProps: { color: 'cyan' } },
  { label: '旅行', value: '旅行', tagProps: { color: 'arcoblue' } },
  { label: '美食', value: '美食', tagProps: { color: 'purple' } }
]

const form = reactive({
  name: '',
  phone: '',
  age: '',
  sex: '1',
  birthday: '',
  grade: '1',
  rangDate: [],
  dept: [],
  startTime: '',
  endTime: '',
  hobbys: [],
  isRead: false
})

const rules = {
  name: [
    { required: true, message: '请输入姓名' },
    { maxLength: 4, message: '姓名不超过4个字符' },
    { match: OnlyCh, message: '仅支持中文姓名' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { match: Phone, message: '手机号格式不正确' }
  ],
  sex: [{ required: true, message: '请选择性别' }]
}

const formRef = ref<InstanceType<typeof Form>>()

const onRangerPickerOk: RangePickerInstance['onOk'] = (value) => {}

const reset = () => {
  formRef.value?.resetFields()
}

const submit = async () => {
  const info = await formRef.value?.validate()
  if (info) return
  Message.success('提交通过')
}
</script>

<style lang="scss" scoped>
.form-manage {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    background: var(--color-bg-1);
  }
  .content {
    flex: 1;
    overflow-y: auto;
    padding: $margin;
    box-sizing: border-box;
  }
}

.form {
  margin-left: 40px;
  margin-top: 40px;
}
</style>
