<!--
  @file GiForm 组件
  @description 动态表单组件，支持多种表单项类型、栅格布局、搜索模式等功能
-->
<template>
  <a-form ref="formRef" v-bind="formProps" :model="modelValue">
    <a-grid class="w-full" :col-gap="8" v-bind="props.gridProps" :collapsed="collapsed">
      <!-- 表单项列表 -->
      <template v-for="item in columns" :key="item.field">
        <a-grid-item v-if="!isHide(item)" v-bind="item.gridItemProps || props.gridItemProps"
          :span="item.span || item.gridItemProps?.span || props.gridItemProps?.span">
          <a-form-item v-bind="item.formItemProps" :field="item.field" :rules="getFormItemRules(item)"
            :disabled="isDisabled(item)">
            <!-- 表单项标签 -->
            <template #label>
              <component :is="item.labelRender" v-if="item.labelRender"></component>
              <template v-else>{{ item.label }}</template>
            </template>

            <!-- 表单项内容 -->
            <slot v-if="getStringType(item.type) !== 'group-title'" :name="item.field"
              v-bind="{ disabled: isDisabled(item) }">
              <component :is="(COMP_MAP[getStringType(item.type)] || item.type)" v-bind="getComponentBindProps(item)"
                :model-value="modelValue[getModelField(item)]"
                @update:model-value="updateValue($event, getModelField(item))">
                <!-- 组件插槽 -->
                <template v-for="(slotValue, slotKey) in item?.slots" :key="slotKey" #[slotKey]="scope">
                  <template v-if="typeof slotValue === 'string'">{{ slotValue }}</template>
                  <template v-else-if="slotValue">
                    <component :is="slotValue(scope)"></component>
                  </template>
                </template>
              </component>
            </slot>

            <!-- 分组标题 -->
            <slot v-else :name="item.field">
              <a-alert>{{ item.label }}</a-alert>
            </slot>

            <!-- 表单项插槽 -->
            <template v-for="(slotValue, slotKey) in item?.formItemSlots" :key="slotKey" #[slotKey]>
              <template v-if="typeof slotValue === 'string'">{{ slotValue }}</template>
              <component :is="slotValue" v-else></component>
            </template>
          </a-form-item>
        </a-grid-item>
      </template>

      <!-- 搜索按钮组 -->
      <a-grid-item v-if="props.search" :key="!props.suffix ? String(collapsed) : undefined" v-bind="props.gridItemProps"
        :span="props.gridItemProps?.span" :suffix="props.search && (props.suffix || (!props.suffix && collapsed))">
        <a-space wrap style="margin-bottom: 8px">
          <slot name="suffix">
            <a-button type="primary" @click="emit('search')">
              <template #icon><icon-search /></template>
              <template #default>{{ props.searchBtnText }}</template>
            </a-button>
            <a-button @click="emit('reset')">重置</a-button>
            <a-button v-if="!props.hideFoldBtn" class="gi-form__fold-btn" type="text" size="mini"
              @click="collapsed = !collapsed">
              <template #icon>
                <icon-up v-if="!collapsed" />
                <icon-down v-else />
              </template>
              <template #default>{{ collapsed ? '展开' : '收起' }}</template>
            </a-button>
          </slot>
        </a-space>
      </a-grid-item>
    </a-grid>
  </a-form>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { Component } from 'vue'
import type { FormColumnItem, FormProps as Props } from './type'
import * as A from '@arco-design/web-vue'
import { omit } from 'lodash-es'

// FormProps 默认值
const props = withDefaults(defineProps<Props>(), {
  autoLabelWidth: true,
  scrollToFirstError: true,
  defaultCollapsed: false,
  search: false,
  gridItemProps: () => ({ span: { xs: 24, sm: 12 } }),
  searchBtnText: '搜索',
  hideFoldBtn: false,
  suffix: true,
  fc: () => ({})
})

/** Emits 类型定义 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const COMP_MAP: Record<string, Component> = {
  'input': A.Input,
  'input-number': A.InputNumber,
  'input-tag': A.InputTag,
  'input-search': A.InputSearch,
  'textarea': A.Textarea,
  'select': A.Select,
  'tree-select': A.TreeSelect,
  'radio-group': A.RadioGroup,
  'checkbox-group': A.CheckboxGroup,
  'date-picker': A.DatePicker,
  'year-picker': A.YearPicker,
  'quarter-picker': A.QuarterPicker,
  'month-picker': A.MonthPicker,
  'week-picker': A.WeekPicker,
  'time-picker': A.TimePicker,
  'range-picker': A.RangePicker,
  'color-picker': A.ColorPicker,
  'rate': A.Rate,
  'switch': A.Switch,
  'slider': A.Slider,
  'cascader': A.Cascader,
  'upload': A.Upload,
  'auto-complete': A.AutoComplete,
  'mention': A.Mention
}

/** 表单属性计算 */
const formProps = computed(() => {
  const baseProps = omit(props, [
    'columns',
    'gridProps',
    'gridItemProps',
    'search',
    'defaultCollapsed',
    'searchBtnText',
    'hideFoldBtn',
    'suffix',
    'layout',
    'fc'
  ])
  return {
    layout: ((props.search ? 'inline' : 'horizontal') as FormInstance['layout']),
    ...baseProps
  }
})

/** 组件状态 */
const formRef = useTemplateRef('formRef')
/** 是否折叠 */
const collapsed = ref(props.defaultCollapsed)
/** 数据字典（预留功能：用于动态加载选项数据，可通过 request 和 format 配置项加载） */
const dicData: Record<string, unknown> = reactive({})

/** 静态配置 */
const STATIC_PROPS = new Map<FormColumnItem['type'], Partial<FormColumnItem['props']>>([
  ['input', { allowClear: true, maxLength: 20 }],
  ['textarea', { allowClear: false, maxLength: 200 }],
  ['input-tag', { allowClear: true }],
  ['mention', { allowClear: true }],
  ['select', { allowClear: true }],
  ['tree-select', { allowClear: true }],
  ['cascader', { allowClear: true }],
  ['date-picker', { allowClear: true }],
  ['time-picker', { allowClear: true }]
])

/** 占位符映射表 */
const PLACEHOLDER_MAP: Record<string, (label?: string) => string | undefined> = {
  'input': (label) => `请输入${label}`,
  'input-tag': (label) => `请输入${label}`,
  'mention': (label) => `请输入${label}`,
  'textarea': (label) => `请填写${label}`,
  'select': (label) => `请选择${label}`,
  'input-search': (label) => `请选择${label}`,
  'tree-select': (label) => `请选择${label}`,
  'cascader': (label) => `请选择${label}`,
  'date-picker': () => '请选择日期',
  'time-picker': () => '请选择时间'
}

/** 获取字符串类型的表单项类型 */
const getStringType = (type: FormColumnItem['type']): string => {
  return typeof type === 'string' ? type : ''
}

/** 获取模型字段名 */
const getModelField = (item: FormColumnItem) => item?.fieldName || item.field

/** 获取组件默认占位 */
const getPlaceholder = (item: FormColumnItem) => {
  if (!item.type || typeof item.type !== 'string') return undefined
  const placeholderFn = PLACEHOLDER_MAP[item.type]
  return placeholderFn ? placeholderFn(item.label) : undefined
}

/** 获取选项数据 */
const getOptions = (item: FormColumnItem) => {
  if (!item.type) return undefined
  /** 需要选项数据的组件类型 */
  const arr = ['select', 'tree-select', 'cascader', 'radio-group', 'checkbox-group']
  if (typeof item.type === 'string' && arr.includes(item.type)) {
    return dicData[item.field] || []
  }
  return undefined
}

/** 获取组件绑定属性 */
const getComponentBindProps = (item: FormColumnItem) => {
  return {
    ...STATIC_PROPS.get(item.type) || {},
    placeholder: getPlaceholder(item),
    options: getOptions(item),
    ...item.props
  }
}

/** 表单数据更新处理 */
const updateValue = (value: unknown, field: string) => {
  const newValue = { ...props.modelValue, [field]: value }
  emit('update:modelValue', newValue)
}

/** 获取表单项校验规则 */
const getFormItemRules = (item: FormColumnItem) => {
  if (item.required) {
    return [
      { required: true, message: `${item.label}为必填项` },
      ...(Array.isArray(item.rules) ? item.rules : [])
    ]
  }
  if (props.fc?.[item.field]?.required) {
    return [
      {
        required: props.fc?.[item.field]?.required,
        message: `${item.label}为必填项`
      },
      ...(Array.isArray(item.rules) ? item.rules : [])
    ]
  }
  return item.rules
}

/** 判断表单项是否隐藏 */
const isHide = (item: FormColumnItem) => {
  if (typeof item.hide === 'boolean') return item.hide
  if (typeof item.hide === 'function') {
    return item.hide(props.modelValue)
  }
  if (props.fc?.[item.field]?.hidden) return true
  return false
}

/** 判断表单项是否禁用 */
const isDisabled = (item: FormColumnItem) => {
  if (typeof item.disabled === 'boolean') return item.disabled
  if (typeof item.disabled === 'function') {
    return item.disabled(props.modelValue)
  }
  if (props.fc?.[item.field]?.disabled === true) return true
  if (item.disabled === undefined) return (item?.props?.disabled as boolean) ?? false
}

defineExpose({ formRef })
</script>

<style lang="scss" scoped>
.gi-form__fold-btn {
  padding: 0 5px;
}
</style>
