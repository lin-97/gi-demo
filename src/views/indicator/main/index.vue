<template>
  <div class="manage">
    <section class="tab">
      <a-tabs hide-content size="medium" v-model:active-key="activeName">
        <a-tab-pane key="1" title="原子指标管理"> </a-tab-pane>
        <a-tab-pane key="2" title="时间周期管理"> </a-tab-pane>
        <a-tab-pane key="3" title="维度管理"> </a-tab-pane>
        <a-tab-pane key="4" title="计量单位管理"> </a-tab-pane>
        <a-tab-pane key="5" title="派生指标管理"> </a-tab-pane>
      </a-tabs>
    </section>

    <section class="gi_lr_page wrap">
      <div class="left">
        <GiTitle title="指标分类"></GiTitle>
        <TheCateTree placeholder="请输入搜索关键词" @node-click="getTableData"></TheCateTree>
      </div>
      <div class="right">
        <GiTitle title="指标列表"></GiTitle>

        <div class="content">
          <a-row justify="space-between" style="margin-bottom: 12px">
            <a-space>
              <a-button type="primary" @click="onAdd">
                <template #icon>
                  <icon-plus />
                </template>
              </a-button>
              <a-button type="primary" status="danger" @click="onMulDelete">
                <template #icon>
                  <icon-delete />
                </template>
                <template #default>删除</template>
              </a-button>
              <a-button type="primary" status="success">
                <template #icon>
                  <icon-download />
                </template>
              </a-button>
            </a-space>

            <a-space>
              <a-select class="gi_select_input" placeholder="请选择" :trigger-props="{ updateAtScroll: true }">
                <a-option>北京</a-option>
                <a-option>上海</a-option>
                <a-option>广州</a-option>
              </a-select>
              <a-input-group>
                <a-input placeholder="请输入搜索关键词" allow-clear> </a-input>
                <a-button type="primary" @click="getTableData">
                  <icon-search />
                </a-button>
              </a-input-group>
              <a-button type="primary" @click="getTableData">
                <template #icon>
                  <icon-refresh />
                </template>
              </a-button>
            </a-space>
          </a-row>

          <section class="table-box">
            <a-table
              row-key="id"
              v-loading="loading"
              :bordered="{ cell: true }"
              :data="tableData"
              :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
              :row-selection="{ type: 'checkbox', showCheckedAll: true }"
              :pagination="{ showPageSize: true, total: total, current: current, pageSize: pageSize }"
              @page-change="changeCurrent"
              @page-size-change="changePageSize"
            >
              <template #columns>
                <a-table-column title="序号" :width="68">
                  <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
                </a-table-column>
                <a-table-column title="姓名" data-index="name"></a-table-column>
                <a-table-column title="创建时间" data-index="startTime" :width="180"></a-table-column>
                <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
                <a-table-column title="比例" :width="200">
                  <template #cell="{ record }">
                    <a-progress :status="getProportionColor(record.proportion)" :percent="record.proportion / 100" />
                  </template>
                </a-table-column>
                <a-table-column title="状态" :width="100">
                  <template #cell="{ record }">
                    <a-switch :model-value="record.status" size="medium">
                      <template #checked>开启</template>
                      <template #unchecked>关闭</template>
                    </a-switch>
                  </template>
                </a-table-column>
                <a-table-column title="操作" :width="200" align="center">
                  <template #cell="{ record }">
                    <a-row justify="center">
                      <a-space>
                        <a-button type="primary" size="mini" @click="onEdit(record)">修改</a-button>
                        <a-button size="mini" @click="onDetail">详情</a-button>
                        <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="onDelete(record)">
                          <a-button type="primary" status="danger" size="mini">删除</a-button>
                        </a-popconfirm>
                      </a-space>
                    </a-row>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </section>
        </div>
      </div>

      <EditDialog v-model="showEditDialog" :form-data="formData"></EditDialog>
    </section>
  </div>
</template>

<script setup lang="ts" name="IndicatorManage">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import TheCateTree from '@/views/components/TheCateTree/index.vue'
import EditDialog from './EditDialog.vue'
import { getTableList } from '@/apis'
import type { ApiTableItem } from '@/apis'

const router = useRouter()

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => {
  getTableData()
})

const activeName = ref('2')
const tableData = ref<ApiTableItem[]>([])
const loading = ref(false)

// 比例进度条颜色
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getTableList({
      current: current.value,
      pageSize: pageSize.value
    })
    tableData.value = res.data.list
    setTotal(res.data.total)
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

getTableData()

// 批量删除
const onMulDelete = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false,
    onOk: () => {
      tableData.value = []
    }
  })
}

const showEditDialog = ref(false)

const formData = ref({})
const onEdit = (row: any) => {
  formData.value = row
  showEditDialog.value = true
}

const onAdd = () => {
  showEditDialog.value = true
}

const onDetail = () => {
  router.push({ path: '/indicator/detail' })
}

const onDelete = (row: any) => {
  Message.success('删除成功')
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
    background: var(--color-bg-1);
  }
  .wrap {
    flex: 1;
    overflow: hidden;
    .right {
      display: flex;
      flex-direction: column;
      .content {
        flex: 1;
        padding: $padding;
        padding-top: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .table-box {
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
