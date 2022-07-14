<template>
  <div class="menu-manage">
    <a-row class="head">
      <a-button type="primary" @click="showAddMenuModal = true">
        <template #icon><icon-plus /></template>
        <span>新增菜单</span>
      </a-button>
    </a-row>
    <section class="table-box">
      <a-table
        :data="treeData"
        row-key="id"
        v-loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 900 }"
        :pagination="false"
        :expandable="{ width: 80 }"
      >
        <template #expand-icon="{ expanded }">
          <IconDown v-if="expanded" />
          <IconRight v-else />
        </template>
        <template #columns>
          <a-table-column title="菜单名称" data-index="name"></a-table-column>
          <a-table-column title="菜单地址" data-index="path">
            <template #cell="{ record }">
              <span v-if="record.path">{{ record.path }}</span>
              <span class="no-text" v-else>无</span>
            </template>
          </a-table-column>
          <a-table-column title="菜单图标" data-index="icon" :width="200">
            <template #cell="{ record }">
              <GiSvgIcon :size="24" :name="record.icon" v-if="record.icon"></GiSvgIcon>
              <span class="no-text" v-else>无</span>
            </template>
          </a-table-column>
          <a-table-column title="是否缓存" data-index="keepAlive" :width="200">
            <template #cell="{ record }">
              <a-button status="success" size="mini" v-if="record.keepAlive"><template #icon>是</template></a-button>
              <a-button status="danger" size="mini" v-else><template #icon>否</template></a-button>
            </template>
          </a-table-column>
          <a-table-column title="是否隐藏" data-index="hidden" :width="200">
            <template #cell="{ record }">
              <a-button status="success" size="mini" v-if="record.hidden"><template #icon>是</template></a-button>
              <a-button status="danger" size="mini" v-else><template #icon>否</template></a-button>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="100">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="mini" @click="showAddMenuModal = true">
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

    <AddMenuModal :tree-data="treeData" v-model="showAddMenuModal"></AddMenuModal>
  </div>
</template>

<script setup lang="ts" name="MenuManage">
import { ref } from 'vue'
import { useMenuStore } from '@/store'
import AddMenuModal from './AddMenuModal.vue'
const menuStore = useMenuStore()

const loading = ref(false)
const showAddMenuModal = ref(false)
const treeData = ref([])

const getTreeData = () => {
  loading.value = true
  setTimeout(() => {
    treeData.value = menuStore.menuTree
    loading.value = false
  }, 300)
}

getTreeData()
</script>

<style lang="scss" scoped>
.menu-manage {
  flex: 1;
  height: 100%;
  margin: $margin;
  box-sizing: border-box;
  background: var(--color-bg-1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    padding: $padding $padding 0;
  }
  .table-box {
    flex: 1;
    margin-top: 12px;
    padding: 0 $padding $padding;
    overflow: hidden;
  }
  .no-text {
    color: $color-text-3;
  }
}
</style>
