<template>
  <div class="gi_page_scroll_y menu-manage">
    <a-card title="菜单管理">
      <a-row justify="space-between">
        <a-space>
          <a-button type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-tooltip content="展开/折叠">
            <a-button type="primary" status="success" @click="onExpanded">
              <template #icon>
                <icon-list v-if="!isExpanded" />
                <icon-mind-mapping v-else />
              </template>
            </a-button>
          </a-tooltip>
        </a-space>

        <a-space>
          <a-input placeholder="输入菜单名称搜索" allow-clear style="width: 250px">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-select placeholder="菜单状态" style="width: 120px">
            <a-option :value="1">正常</a-option>
            <a-option :value="0">禁用</a-option>
          </a-select>
          <a-button type="primary">
            <template #icon><icon-search /></template>
            <span>搜索</span>
          </a-button>
          <a-button>
            <template #icon><icon-refresh /></template>
            <span>重置</span>
          </a-button>
        </a-space>
      </a-row>

      <section class="gi_mt">
        <a-table
          ref="TableRef"
          :data="menuTreeList"
          row-key="path"
          :loading="loading"
          :scroll="{ x: '100%', y: '100%', minWidth: 900 }"
          :pagination="false"
          :expandable="{ width: 80 }"
        >
          <template #expand-icon="{ expanded }">
            <IconDown v-if="expanded" />
            <IconRight v-else />
          </template>
          <template #columns>
            <a-table-column title="菜单名称">
              <template #cell="{ record }">{{ record.meta?.title || '' }}</template>
            </a-table-column>
            <a-table-column title="菜单地址" data-index="path">
              <template #cell="{ record }">
                <span v-if="record.path">{{ record.path }}</span>
                <span v-else>无</span>
              </template>
            </a-table-column>
            <a-table-column title="菜单图标" data-index="icon" :width="200">
              <template #cell="{ record }">
                <GiSvgIcon :size="24" :name="record.meta?.svgIcon || record.meta?.icon"></GiSvgIcon>
              </template>
            </a-table-column>
            <a-table-column title="是否缓存" :width="200">
              <template #cell="{ record }">
                <a-button status="success" size="mini" v-if="record.meta?.keepAlive"
                  ><template #icon>是</template></a-button
                >
                <a-button status="danger" size="mini" v-else><template #icon>否</template></a-button>
              </template>
            </a-table-column>
            <a-table-column title="是否隐藏" data-index="hidden" :width="200">
              <template #cell="{ record }">
                <a-button status="success" size="mini" v-if="record.meta?.hidden"
                  ><template #icon>是</template></a-button
                >
                <a-button status="danger" size="mini" v-else><template #icon>否</template></a-button>
              </template>
            </a-table-column>
            <a-table-column title="操作" :width="100">
              <template #cell="{ record }">
                <a-space>
                  <a-button type="primary" size="mini" @click="onEdit(record)">
                    <template #icon><icon-edit /></template>
                  </a-button>
                  <a-popconfirm type="warning" content="您确定要删除该项吗?">
                    <a-button type="primary" status="danger" size="mini">
                      <template #icon><icon-delete /></template>
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </section>
    </a-card>

    <AddMenuModal ref="AddMenuModalRef"></AddMenuModal>
  </div>
</template>

<script setup lang="ts">
import AddMenuModal from './AddMenuModal.vue'
import { usePermissionStore } from '@/store'
import { getUserRoutes } from '@/apis'
import type { RouteRecordRaw } from 'vue-router'
import type { TableInstance } from '@arco-design/web-vue'

defineOptions({ name: 'SystemMenu' })

const AddMenuModalRef = ref<InstanceType<typeof AddMenuModal>>()
const loading = ref(false)
const menuTreeList = ref<RouteRecordRaw[]>([])
const TableRef = ref<TableInstance>()
const isExpanded = ref(false)
const onExpanded = () => {
  isExpanded.value = !isExpanded.value
  TableRef.value?.expandAll(isExpanded.value)
}

const getMenuTreeList = async () => {
  try {
    const res = await getUserRoutes()
    menuTreeList.value = res.data
  } catch (error) {
  } finally {
    loading.value = false
  }
}

getMenuTreeList()

const onAdd = () => {
  AddMenuModalRef.value?.add()
}

const onEdit = (item: any) => {
  AddMenuModalRef.value?.edit(item.path)
}
</script>

<style lang="scss" scoped>
.menu-manage {
}
</style>
