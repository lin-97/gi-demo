<template>
  <a-modal v-model:visible="visible" title="新增角色">
    <a-form>
      <a-form-item
        label="角色名称"
        name="name"
        field="name"
        :rules="[
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符', trigger: 'blur' }
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input placeholder="请输入角色名称" v-model="form.name"> </a-input>
      </a-form-item>
      <a-form-item label="角色编号" name="roleCode">
        <a-input placeholder="请输入角色编号" v-model="form.roleCode">
          <template #prepend>role_</template>
        </a-input>
      </a-form-item>
      <a-form-item label="描述" name="remarks">
        <a-textarea v-model="form.remarks" placeholder="角色描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
      </a-form-item> </a-form
  ></a-modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const visible = useVModel(props, 'modelValue', emit)

const form = reactive({
  name: '',
  roleCode: '',
  remarks: ''
})
</script>
