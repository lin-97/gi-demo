<template>
  <a-form
    v-bind="options.form"
    ref="formRef"
    :auto-label-width="options.form.autoLabelWidth || true"
    :model="modelValue"
  >
    <a-row v-bind="options.row">
      <a-col v-for="item in options.columns" :key="item.field" :span="item.span || 12" v-bind="item.col">
        <a-form-item v-bind="item.item" :label="item.label" :field="item.field" :rules="item.rules">
          <slot :name="item.field">
            <template v-if="item.type === 'input'">
              <a-input
                :allow-clear="true"
                :placeholder="`请输入${item.label}`"
                :max-length="20"
                v-bind="(item.props as A.InputInstance['$props'])"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"
              ></a-input>
            </template>

            <template v-if="item.type === 'select'">
              <a-select
                :allow-clear="true"
                :placeholder="`请输入${item.label}`"
                v-bind="(item.props as A.SelectInstance['$props'])"
                :options="(item.options as A.SelectInstance['$props']['options'])"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"
              ></a-select>
            </template>

            <template v-if="item.type === 'radio-group'">
              <a-radio-group
                v-bind="(item.props as A.RadioGroupInstance['$props'])"
                :options="(item.options as A.RadioGroupInstance['$props']['options'])"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"
              ></a-radio-group>
            </template>

            <template v-if="item.type === 'checkbox-group'">
              <a-checkbox-group
                v-bind="(item.props as A.CheckboxGroupInstance['$props'])"
                :options="(item.options as A.CheckboxGroupInstance['$props']['options'])"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"
              ></a-checkbox-group>
            </template>

            <template v-if="item.type === 'input-number'">
              <a-input-number
                :placeholder="`请输入${item.label}`"
                v-bind="(item.props as A.InputNumberInstance['$props'])"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"
              ></a-input-number>
            </template>

            <template v-if="item.type === 'textarea'">
              <a-textarea
                :allow-clear="true"
                :placeholder="`请填写${item.label}`"
                :max-length="200"
                :show-word-limit="true"
                v-bind="(item.props as A.TextareaInstance['$props'])"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"
              ></a-textarea>
            </template>

            <template v-if="item.type === 'date-picker'">
              <a-date-picker
                class="w-full"
                :allow-clear="true"
                :placeholder="`请选择日期`"
                v-bind="(item.props as A.DatePickerInstance['$props'])"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"
              ></a-date-picker>
            </template>
          </slot>
        </a-form-item>
      </a-col>
      <a-col :span="8" v-if="!options.btns?.hide">
        <a-space>
          <slot name="footer">
            <a-button type="primary" @click="emit('search')">
              <template #icon><icon-search /></template>
              <span>搜索</span>
            </a-button>
            <a-button @click="emit('reset')">重置</a-button>
          </slot>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import type { Options } from './type'
import type * as A from '@arco-design/web-vue'

interface Props {
  modelValue: object
  options: Options
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const valueChange = (value: any, field: string) => {
  emit('update:modelValue', Object.assign(props.modelValue, { [field]: value }))
}

const formRef = ref<A.FormInstance>()

defineExpose({ formRef })
</script>

<style lang="scss" scoped></style>
