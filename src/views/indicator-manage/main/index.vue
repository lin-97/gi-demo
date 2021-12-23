<template>
  <div class="manage">
    <section class="tab">
      <a-tabs v-model="activeName">
        <a-tab-pane key="1" title="原子指标管理"> </a-tab-pane>
        <a-tab-pane key="2" title="时间周期管理"> </a-tab-pane>
        <a-tab-pane key="3" title="维度管理"> </a-tab-pane>
        <a-tab-pane key="4" title="计量单位管理"> </a-tab-pane>
        <a-tab-pane key="5" title="派生指标管理"> </a-tab-pane>
      </a-tabs>
    </section>

    <section class="gi_lr_page wrap">
      <div class="left">
        <GiCateTree></GiCateTree>
      </div>
      <div class="right">
        <a-row justify="space-between" style="margin-bottom: 10px">
          <a-space>
            <a-button type="primary" @click="onAdd">
              <template #icon>
                <icon-plus />
              </template>
            </a-button>
            <a-button type="primary" @click="onMulDelete">
              <template #icon>
                <icon-delete />
              </template>
              <template #default>删除</template>
            </a-button>
            <a-button type="primary" status="success">
              <template #icon>
                <icon-upload />
              </template>
            </a-button>
          </a-space>

          <a-space>
            <a-select class="gi_select_input" placeholder="请选择">
              <a-option>北京</a-option>
              <a-option>上海</a-option>
              <a-option>广州</a-option>
            </a-select>
            <a-input-search class="gi_search_input" placeholder="请输入" />
            <a-button type="primary" @click="getTableData">
              <template #icon>
                <icon-refresh />
              </template>
            </a-button>
          </a-space>
        </a-row>

        <a-table
          :data="tableData"
          :loading="showLoading"
          :scroll="{ x: 1000, y: 600 }"
          :pagination="{ 'show-page-size': true }"
        >
          <template #columns>
            <a-table-column title="序号" width="60">
              <template #cell="{ rowIndex }">{{ rowIndex + 1 }}</template>
            </a-table-column>
            <a-table-column title="名称" data-index="name" width="150"></a-table-column>
            <a-table-column title="创建时间" data-index="createTime"></a-table-column>
            <a-table-column title="地址" data-index="address"></a-table-column>
            <a-table-column title="比例" width="200">
              <template #cell="{ record }">
                <a-progress status="warning" :percent="record.proportion / 100" />
              </template>
            </a-table-column>
            <a-table-column title="状态" width="100">
              <template #cell="{ record }">
                <a-switch v-model="record.status">
                  <template #checked> ON </template>
                  <template #unchecked> OFF </template>
                </a-switch>
              </template>
            </a-table-column>
            <a-table-column title="操作" width="230">
              <template #cell="{ record }">
                <a-space>
                  <a-button type="primary" size="small" @click="onEdit(record)">修改</a-button>
                  <a-button type="primary" status="warning" size="small" @click="onDetail">详情</a-button>
                  <a-button type="primary" status="danger" size="small" @click="onDelete">删除</a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>

      <EditDialog v-model="showEditDialog" :form-data="formData"></EditDialog>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from '@arco-design/web-vue'
import GiCateTree from '@/views/components/GiCateTree.vue'
import EditDialog from './EditDialog.vue'
import { getTableList } from '@/apis/table'
const route = useRoute()
const router = useRouter()

let activeName = ref('3')
// onMounted(() => {
//   console.log(route.query)
//   if (route.query.tab) {
//     activeName.value = '3'
//   }
//   console.log('activeName', activeName.value)
// })

let tableData = ref([])
let showLoading = ref(false)

const pageInfo = reactive({
  page: 1,
  size: 1000
})

const getTableData = async () => {
  try {
    showLoading.value = true
    const res = await getTableList(pageInfo)
    tableData.value = res.data.list
    showLoading.value = false
  } catch (error) {
    showLoading.value = false
    return error
  }
}
getTableData()

// 批量删除
const onMulDelete = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false
  })
}

let showEditDialog = ref(false)

const formData = ref({})
const onEdit = (row) => {
  formData.value = row
  showEditDialog.value = true
}

const onAdd = () => {
  router.push({ path: '/indicator-manage/add' })
}

const onDetail = () => {
  router.push({ path: '/indicator-manage/detail' })
}

const onDelete = (row) => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false
  })
}
</script>

<style lang="scss" scoped>
.manage {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .tab {
    background: var(--color-bg-3);
  }
  .wrap {
    flex: 1;
    overflow: hidden;
    .right {
      display: flex;
      flex-direction: column;
    }
  }
}

:deep(.arco-tabs-content) {
  padding-top: 0;
}
</style>
