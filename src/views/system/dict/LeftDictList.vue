<template>
  <GiFlex column flex="1" gap="10px" class="g-w-full">
    <a-input v-model="typeSearch" allow-clear placeholder="输入字典名称搜索" />
    <a-space wrap>
      <GiButton type="add" size="mini" @click="onTypeAdd" />
      <GiButton type="edit" size="mini" @click="onTypeEdit" />
      <Popconfirm type="warning" content="确定删除该字典类型吗?" @before-ok="onTypeDelete">
        <GiButton type="delete" size="mini" :disabled="!selectedType" />
      </Popconfirm>
    </a-space>
    <a-spin :loading="typeLoading" class="left-dict-list__spin">
      <div class="left-dict-list__scroll">
        <div v-for="item in filteredTypeList" :key="item.id" class="left-dict-list__item"
          :class="{ 'left-dict-list__item--active': selectedType?.id === item.id }" @click="selectType(item)">
          <icon-folder class="left-dict-list__item-icon" />
          <span class="left-dict-list__item-text">{{ item.name }} ({{ item.code }})</span>
        </div>
        <a-empty v-if="!filteredTypeList.length" description="暂无字典类型" />
      </div>
    </a-spin>

    <DictFormModal ref="DictFormModalRef" @save-success="onDictFormSaved" />
  </GiFlex>
</template>

<script setup lang="ts">
import type * as T from '@/apis/system/dict'
import { Message, Popconfirm } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/dict'
import DictFormModal from './DictFormModal.vue'

defineOptions({ name: 'LeftDictList' })

const emit = defineEmits<{
  /** 左侧选中字典类型变化或列表刷新后，通知父级刷新右侧字典数据表格 */
  refresh: [payload: { code: string | null }]
}>()

const DictFormModalRef = useTemplateRef('DictFormModalRef')

const typeLoading = ref(false)
const typeList = ref<T.ListItem[]>([])
const typeSearch = ref('')
const selectedType = ref<T.ListItem | null>(null)

const filteredTypeList = computed(() => {
  const q = typeSearch.value.trim().toLowerCase()
  if (!q)
    return typeList.value
  return typeList.value.filter(
    (i) => i.name.toLowerCase().includes(q) || i.code.toLowerCase().includes(q)
  )
})

const emitRefresh = () => {
  emit('refresh', { code: selectedType.value?.code ?? null })
}

const syncSelectionAfterLoad = () => {
  if (!typeList.value.length) {
    selectedType.value = null
    return
  }
  const cur = selectedType.value
  const next = cur ? typeList.value.find((i) => i.id === cur.id) : undefined
  if (next) {
    selectedType.value = next
    return
  }
  selectedType.value = typeList.value[0] ?? null
}

const loadTypes = async () => {
  typeLoading.value = true
  try {
    const res = await baseAPI.getList({ page: 1, size: 500, name: '', status: '' })
    typeList.value = res.data.records
    syncSelectionAfterLoad()
  } finally {
    typeLoading.value = false
  }
  emitRefresh()
}

onMounted(() => {
  loadTypes()
})

const selectType = (item: T.ListItem) => {
  selectedType.value = item
  emitRefresh()
}

const onTypeAdd = () => {
  DictFormModalRef.value?.add()
}

const onTypeEdit = () => {
  if (!selectedType.value) {
    Message.warning('请先选择字典类型')
    return
  }
  DictFormModalRef.value?.edit(selectedType.value.id)
}

const onTypeDelete = async () => {
  if (!selectedType.value) {
    Message.warning('请先选择字典类型')
    return false
  }
  const res = await baseAPI.delete({ ids: [selectedType.value.id] })
  if (res.success) {
    Message.success('删除成功')
    await loadTypes()
  }
  return res.success
}

const onDictFormSaved = async () => {
  await loadTypes()
}
</script>

<style lang="scss" scoped>
.left-dict-list__spin {
  flex: 1;
  width: 100%;
  min-height: 0;
}

.left-dict-list__scroll {
  max-height: 100%;
  overflow-y: auto;
}

.left-dict-list__item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  margin-bottom: 4px;
  cursor: pointer;
  border-radius: var(--border-radius-small);
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-fill-2);
  }

  &--active {
    color: rgb(var(--primary-6));
    background-color: var(--color-primary-light-1);
  }
}

.left-dict-list__item-icon {
  flex-shrink: 0;
  margin-right: 8px;
  font-size: 16px;
}

.left-dict-list__item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
