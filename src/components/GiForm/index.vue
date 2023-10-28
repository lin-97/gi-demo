<template>
  <a-form :auto-label-width="true" v-bind="options.form" ref="formRef" :model="modelValue">
    <a-row :gutter="14" v-bind="options.row" class="w-full">
      <template v-for="(item, index) in options.columns" :key="item.field">
        <a-col
          v-if="!item.hide"
          :span="item.span || 12"
          v-bind="item.col"
          v-show="index <= (options.fold?.index || 0) || (index >= (options.fold?.index || 0) && !collapsed)"
        >
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

              <template v-if="item.type === 'select'">
                <a-select
                  :allow-clear="true"
                  :placeholder="`请选择${item.label}`"
                  v-bind="(item.props as A.SelectInstance['$props'])"
                  :options="(item.options as A.SelectInstance['$props']['options'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                ></a-select>
              </template>

              <template v-if="item.type === 'cascader'">
                <a-cascader
                  :allow-clear="true"
                  :placeholder="`请选择${item.label}`"
                  v-bind="(item.props as A.CascaderInstance['$props'])"
                  :options="(item.options as A.CascaderInstance['$props']['options'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                />
              </template>

              <template v-if="item.type === 'tree-select'">
                <a-tree-select
                  :allow-clear="true"
                  :placeholder="`请选择${item.label}`"
                  v-bind="(item.props as A.TreeSelectInstance['$props'])"
                  :data="(item.data as A.TreeSelectInstance['$props']['data'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                >
                </a-tree-select>
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

              <template v-if="item.type === 'date-picker'">
                <a-date-picker
                  :allow-clear="true"
                  :placeholder="`请选择日期`"
                  v-bind="(item.props as A.DatePickerInstance['$props'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                ></a-date-picker>
              </template>

              <template v-if="item.type === 'time-picker'">
                <a-time-picker
                  :allow-clear="true"
                  :placeholder="`请选择时间`"
                  v-bind="(item.props as A.TimePickerInstance['$props'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                >
                </a-time-picker>
              </template>

              <template v-if="item.type === 'rate'">
                <a-rate
                  :allow-clear="true"
                  v-bind="(item.props as A.RateInstance['$props'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                />
              </template>

              <template v-if="item.type === 'switch'">
                <a-switch
                  v-bind="(item.props as A.SwitchInstance['$props'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                />
              </template>

              <template v-if="item.type === 'slider'">
                <a-slider
                  v-bind="(item.props as A.SliderInstance['$props'])"
                  :model-value="modelValue[item.field as keyof typeof modelValue]"
                  @update:model-value="valueChange($event, item.field)"
                />
              </template>
            </slot>
          </a-form-item>
        </a-col>
      </template>
      <a-col :span="options.btns?.span || 12" v-bind="options.btns?.col" v-if="!options.btns?.hide">
        <a-space wrap>
          <slot name="footer">
            <a-button type="primary" @click="emit('search')">
              <template #icon><icon-search /></template>
              <template #default>{{ options.btns?.searchBtnText || '搜索' }}</template>
            </a-button>
            <a-button @click="emit('reset')">重置</a-button>
            <a-button v-if="options.fold?.enable" type="text" size="mini" @click="collapsed = !collapsed">
              <template #icon>
                <icon-up v-if="!collapsed" />
                <icon-down v-else />
              </template>
              <template #default>{{ collapsed ? '展开' : '收起' }}</template>
            </a-button>
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

const collapsed = ref(false)
const formRef = ref<A.FormInstance>()

defineExpose({ formRef })
</script>

<style lang="scss" scoped></style>
