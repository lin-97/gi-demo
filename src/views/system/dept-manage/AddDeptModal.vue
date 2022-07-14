<template>
  <a-modal v-model:visible="visible" :title="title">
    <a-form ref="formRef" :model="form" :labelCol="{ span: 4 }">
      <a-form-item label="上级部门" name="parentId">
        <a-tree-select
          v-model="form.parentId"
          allow-clear
          :data="treeData"
          placeholder="请选择"
          :fieldNames="{
            key: 'id',
            title: 'name',
            children: 'children'
          }"
        ></a-tree-select>
      </a-form-item>
      <a-form-item
        label="部门名称"
        field="name"
        :rules="[
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.name" placeholder="请输入部门名称" allow-clear></a-input>
      </a-form-item>
      <!-- <a-form-item
        label="部门编号"
        field="deptCode"
        :rules="[
          { required: true, message: '请输入部门编号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 30个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入部门编号" v-model="form.deptCode">
          <template #prepend>dept_code_</template>
        </a-input>
      </a-form-item> -->
      <a-form-item label="排序" name="sort" :rules="[{ required: true, message: '请输入排序序号', trigger: 'blur' }]">
        <a-input-number v-model="form.sort" style="width: 120px" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-radio-group v-model="form.status">
          <a-radio :value="1">正常</a-radio>
          <a-radio :value="0">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, watch, computed, type PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import type { ApiDeptItem } from '@/apis'

const props = defineProps({
  // 绑定的值
  modelValue: {
    type: Boolean,
    default: false
  },
  // 部门树
  treeData: {
    type: Array,
    default: () => []
  },
  // 当前部门
  currentData: {
    type: Object as PropType<ApiDeptItem>,
    default: () => {}
  }
})

const emit = defineEmits(['update:modelValue'])
const visible = useVModel(props, 'modelValue', emit)

const form = reactive({
  id: '',
  parentId: '',
  name: '',
  sort: 0,
  status: 1
})

const title = computed(() => (props.currentData.id ? '编辑部门' : '新增部门'))

watch(
  () => props.currentData,
  (newVal) => {
    form.id = newVal.id
    form.parentId = newVal.parentId
    form.name = newVal.name
    form.sort = newVal.sort
    form.status = newVal.status
  }
)
</script>
