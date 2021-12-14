<template>
  <section class="tab">
    <a-tabs default-active-key="2">
      <a-tab-pane key="1" title="原子指标管理"> </a-tab-pane>
      <a-tab-pane key="2" title="时间周期管理"> </a-tab-pane>
      <a-tab-pane key="3" title="维度管理"> </a-tab-pane>
      <a-tab-pane key="4" title="计量单位管理"> </a-tab-pane>
      <a-tab-pane key="5" title="派生指标管理"> </a-tab-pane>
    </a-tabs>
  </section>

  <section class="gi_lr_page indicator-manage">
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
          <a-button type="primary">
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
        </a-space>
      </a-row>

      <a-table :data="tableData">
        <template #columns>
          <a-table-column title="名称1" data-index="name"></a-table-column>
          <a-table-column title="工资" data-index="salary"></a-table-column>
          <a-table-column title="地址" data-index="address"></a-table-column>
          <a-table-column title="邮箱" data-index="email"></a-table-column>
          <a-table-column title="状态" width="100">
            <template #cell="{ record }">
              <a-switch v-model="record.status">
                <template #checked> ON </template>
                <template #unchecked> OFF </template>
              </a-switch>
            </template>
          </a-table-column>
          <a-table-column title="操作" width="200">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="small">修改</a-button>
                <a-button type="primary" status="warning" size="small" @click="onDetail">详情</a-button>
                <a-button type="primary" status="danger" size="small" @click="onDelete">删除</a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import GiCateTree from '@/views/components/GiCateTree.vue'
import { Modal } from '@arco-design/web-vue'
const router = useRouter()

let tableData = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
    status: true
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
    status: false
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
    status: true
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
    status: true
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
    status: false
  }
])

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
.tab {
  padding: 0 $padding;
  background: var(--color-bg-3);
}
:deep(.arco-tabs-content) {
  padding-top: 0;
}
</style>
