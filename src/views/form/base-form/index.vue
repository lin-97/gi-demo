<template>
  <div class="form-manage">
    <a-page-header title="基础表单" subtitle="Base Form" :show-back="false"> </a-page-header>

    <section class="content">
      <a-space :size="50">
        <a-form :model="form" size="small" class="form">
          <a-form-item field="name" label="姓名" :rules="rules.name" :validate-trigger="['change', 'input']">
            <a-input v-model="form.name" placeholder="请输入姓名" />
            <template #extra>
              <div>请输入中文姓名</div>
            </template>
          </a-form-item>
          <a-form-item field="age" label="年龄">
            <a-input v-model="form.age" placeholder="请输入年龄" />
          </a-form-item>
          <a-form-item field="sex" label="性别">
            <a-radio-group v-model="form.sex">
              <a-radio value="1">男</a-radio>
              <a-radio value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item field="birthday" label="生日">
            <a-date-picker v-model="form.birthday" placeholder="请选择出生日期" />
          </a-form-item>
          <a-form-item field="dept" label="部门">
            <a-tree-select :data="treeData" v-model="form.dept" multiple placeholder="请选择部门" />
          </a-form-item>
          <a-form-item field="grade" label="学历">
            <a-select v-model="form.grade" placeholder="请选择学历" style="width: 120px">
              <a-option value="1">本科</a-option>
              <a-option value="2">大专</a-option>
              <a-option value="3">硕士</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="rangDate" label="在校日期范围">
            <a-range-picker v-model="form.rangDate" />
          </a-form-item>
          <a-form-item field="isRead">
            <a-checkbox v-model="form.isRead">我已阅读</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button>重置</a-button>
              <a-button type="primary">提交</a-button>
            </a-space>
          </a-form-item>
        </a-form>
        <div>
          <pre>{{ form }}</pre>
        </div>
      </a-space>
    </section>
  </div>
</template>

<script setup lang="ts" name="BaseForm">
import { reactive, ref } from 'vue'

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
const form = reactive({
  name: '',
  age: '',
  sex: '1',
  birthday: '',
  grade: '1',
  rangDate: [],
  dept: [],
  startTime: '',
  endTime: '',
  isRead: false
})

const rules = {
  name: [
    { required: true, message: '请输入姓名' },
    { maxLength: 4, message: '姓名不超过4个字符' }
  ]
}
</script>

<style lang="scss" scoped>
.form-manage {
  flex: 1;
  background: var(--color-bg-1);
  .content {
    flex: 1;
  }
}

.form {
  width: 500px;
  margin-left: 40px;
  margin-top: 40px;
}
</style>
