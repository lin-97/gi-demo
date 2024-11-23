<template>
  <a-form ref="formRef" :auto-label-width="true" v-bind="options.form" :model="modelValue">
    <a-grid class="w-full" :col-gap="8" v-bind="options.grid" :collapsed="collapsed">
      <template v-for="item in columns" :key="item.field">
        <a-grid-item v-if="!isHide(item.hide)" v-bind="item.gridItemProps || props.options.gridItem"
          :span="item.span || item.gridItemProps?.span || options.gridItem?.span">
          <a-form-item v-bind="item.formItemProps" :label="item.label" :field="item.field" :rules="item.rules"
            :disabled="isDisabled(item.disabled)">
            <slot v-if="!['group-title'].includes(item.type || '')" :name="item.field"
              v-bind="{ disabled: isDisabled(item.disabled) }">
              <component :is="`a-${item.type}`" v-bind="getComponentBindProps(item)"
                :model-value="modelValue[item.field as keyof typeof modelValue]"
                @update:model-value="valueChange($event, item.field)"></component>
            </slot>
            <slot v-else name="group-title">
              <a-alert v-bind="item.props">{{ item.label }}</a-alert>
            </slot>
          </a-form-item>
        </a-grid-item>
      </template>
      <a-grid-item v-if="!options.btns?.hide" :suffix="options.fold?.enable">
        <a-space wrap>
          <slot name="suffix">
            <a-button type="primary" @click="emit('search')">
              <template #icon><icon-search /></template>
              <template #default>{{ options.btns?.searchBtnText || '搜索' }}</template>
            </a-button>
            <a-button @click="emit('reset')">重置</a-button>
            <a-button v-if="options.fold?.enable" class="gi-form__fold-btn" type="text" size="mini"
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
import { cloneDeep } from 'lodash-es'
import type { ColumnsItem, ColumnsItemDisabled, ColumnsItemHide, Options } from './type'

interface Props {
  modelValue: any
  options?: Options
  columns: ColumnsItem[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({})
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const options = computed(() => ({
  grid: { cols: 2 },
  gridItem: { span: { xs: 2, sm: 1 } },
  ...props.options
}
))

const formRef = useTemplateRef('formRef')
const collapsed = ref(props.options.fold?.defaultCollapsed ?? false)
const dicData: Record<string, any> = reactive({})

// 组件的默认props配置
const getComponentBindProps = (item: ColumnsItem) => {
  const obj: Partial<ColumnsItem['props'] & { placeholder: string }> = {}
  if (item.type === 'input') {
    obj.allowClear = true
    obj.placeholder = `请输入${item.label}`
    obj.maxLength = 20
  }
  if (item.type === 'input-number') {
    obj.placeholder = `请输入${item.label}`
  }
  if (item.type === 'textarea') {
    obj.allowClear = true
    obj.placeholder = `请填写${item.label}`
    obj.maxLength = 200
  }
  if (item.type === 'select') {
    obj.allowClear = true
    obj.placeholder = `请选择${item.label}`
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'cascader') {
    obj.allowClear = true
    obj.placeholder = `请选择${item.label}`
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'tree-select') {
    obj.allowClear = true
    obj.placeholder = `请选择${item.label}`
    obj.data = dicData[item.field] || item.data
  }
  if (item.type === 'radio-group') {
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'checkbox-group') {
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'date-picker') {
    obj.placeholder = '请选择日期'
  }
  if (item.type === 'time-picker') {
    obj.allowClear = true
    obj.placeholder = `请选择时间`
  }
  return { ...obj, ...item.props }
}

const valueChange = (value: any, field: string) => {
  emit('update:modelValue', Object.assign(props.modelValue, { [field]: value }))
}

const isHide = (hide?: ColumnsItemHide<boolean | object>) => {
  if (hide === undefined) return false
  if (typeof hide === 'boolean') return hide
  if (typeof hide === 'function') {
    return hide(props.modelValue)
  }
}

const isDisabled = (disabled?: ColumnsItemDisabled<boolean | object>) => {
  if (disabled === undefined) return false
  if (typeof disabled === 'boolean') return disabled
  if (typeof disabled === 'function') {
    return disabled(props.modelValue)
  }
}

props.columns.forEach((item) => {
  if (item.request && typeof item.request === 'function' && item?.init) {
    item.request(props.modelValue).then((res) => {
      dicData[item.field] = item.resultFormat ? item.resultFormat(res) : res.data
      // console.log('dicData', dicData)
    })
  }
})

// 先找出有级联的项
// 如果这个字段改变了值，那么就找出它的cascader属性对应的字段项，去请求里面的request
const hasCascaderColumns: ColumnsItem[] = []
props.columns.forEach((item) => {
  const arr = hasCascaderColumns.map((i) => i.field)
  if (item.cascader?.length && !arr.includes(item.field)) {
    hasCascaderColumns.push(item)
  }
})

// 要深克隆，否则无法监听新旧值变化
const cloneForm = computed(() => cloneDeep(props.modelValue))

watch(cloneForm as any, (newVal, oldVal) => {
  hasCascaderColumns.forEach((item) => {
    if (newVal[item.field] !== oldVal[item.field]) {
      const arr = props.columns.filter((a) => {
        return item?.cascader?.includes(a.field)
      })
      arr.forEach((i) => {
        if (i.request && Boolean(newVal[item.field])) {
          i.request(props.modelValue).then((res) => {
            dicData[i.field] = i.resultFormat ? i.resultFormat(res) : res.data
            if (!dicData[i.field].map((i: any) => i.value).includes(props.modelValue[i.field])) {
              emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
            }
          })
        } else if (i.request && !newVal[item.field]) {
          dicData[i.field] = []
          emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
        }
      })
    }
  })
})

defineExpose({ formRef })
</script>

<style lang="scss" scoped>
.gi-form__fold-btn {
  padding: 0 5px;
}
</style>
