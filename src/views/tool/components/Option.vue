<template>
  <div>
    <a-card title="复选框">
      <a-space :size="20" fill>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox></a-checkbox>
        <a-checkbox :default-checked="true" disabled>禁用</a-checkbox>
        <a-checkbox disabled>禁用</a-checkbox>
        <a-checkbox :indeterminate="flag">半选</a-checkbox>
        <a-switch v-model="flag"></a-switch>
      </a-space>
      <a-space direction="vertical" style="margin-top: 50px">
        <a-checkbox :model-value="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll"
          >全选
        </a-checkbox>
        <a-checkbox-group v-model="data" @change="handleChange">
          <a-checkbox value="1">足球</a-checkbox>
          <a-checkbox value="2">篮球</a-checkbox>
          <a-checkbox value="3">兵乓球</a-checkbox>
        </a-checkbox-group>
      </a-space>
    </a-card>
    <a-card title="单选框" style="margin-top: 20px">
      <a-radio-group>
        <a-radio value="A">A</a-radio>
        <a-radio value="B">B</a-radio>
        <a-radio value="C" disabled>C</a-radio>
        <a-radio value="D">D</a-radio>
      </a-radio-group>

      <a-space style="margin-top: 20px">
        <a-radio value="radio">Radio</a-radio>
        <a-radio value="disabled radio" :default-checked="true" disabled>Disabled Radio</a-radio>
        <a-radio value="disabled radio" disabled>Disabled Radio</a-radio>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const flag = ref(false)

const indeterminate = ref(false)
const checkedAll = ref(false)
const data = ref<string[]>([])

const handleChangeAll = (value: string[]) => {
  indeterminate.value = false
  if (value) {
    checkedAll.value = true
    data.value = ['1', '2', '3']
  } else {
    checkedAll.value = false
    data.value = []
  }
}

const handleChange = (values: string[]) => {
  if (values.length === 3) {
    checkedAll.value = true
    indeterminate.value = false
  } else if (values.length === 0) {
    checkedAll.value = false
    indeterminate.value = false
  } else {
    checkedAll.value = false
    indeterminate.value = true
  }
}
</script>
