<template>
  <a-modal v-model:visible="visible" :title="title">
    <a-form :model="form" size="medium" auto-label-width>
      <a-form-item
        label="角色名称"
        name="name"
        field="name"
        :rules="[
          { required: true, message: '请输入角色名称' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符' }
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
import { ref, reactive, computed } from 'vue'

const roleId = ref('')
const title = computed(() => (!!roleId.value ? '编辑角色' : '新增角色'))
const visible = ref(false)

const form = reactive({
  name: '',
  roleCode: '',
  remarks: ''
})

const add = () => {
  roleId.value = ''
  visible.value = true
}

const edit = (id: string) => {
  roleId.value = id
  visible.value = true
}

defineExpose({ add, edit })
</script>
