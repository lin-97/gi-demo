<template>
  <div class="system-manage">
    <section class="left">
      <a-menu
        :style="{ width: '200px', height: '100%', 'border-radius': '2px' }"
        :default-open-keys="['0']"
        :default-selected-keys="[currentKey]"
        show-collapse-button
      >
        <a-menu-item :key="item.id" v-for="(item, index) in menuList" @click="onClickMenuItem(item, index)">
          <template #icon>
            <component :is="item.icon" :size="18"></component>
          </template>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </section>

    <section class="right">
      <component :is="menuList[currentIndex].value"></component>
    </section>
  </div>
</template>

<script setup lang="ts" name="SystemManage">
import { ref, reactive } from 'vue'
import UserCenter from './user-center/index.vue'
import DeptManage from './dept-manage/index.vue'
import UserManage from './user-manage/index.vue'
import RoleManage from './role-manage/index.vue'
import MenuManage from './menu-manage/index.vue'

const currentKey = ref('01')
const currentIndex = ref(0)

interface LeftMenuItem {
  id: string
  name: string
  value: any
  icon: string
}
const menuList: LeftMenuItem[] = reactive([
  { id: '01', name: '部门管理', value: DeptManage, icon: 'icon-mind-mapping' },
  { id: '02', name: '用户管理', value: UserManage, icon: 'icon-user-group' },
  { id: '03', name: '角色管理', value: RoleManage, icon: 'icon-robot' },
  { id: '04', name: '菜单管理', value: MenuManage, icon: 'icon-menu' },
  { id: '05', name: '个人中心', value: UserCenter, icon: 'icon-user' }
])

const onClickMenuItem = (item: LeftMenuItem, index: number) => {
  currentKey.value = item.id
  currentIndex.value = index
}
</script>

<style lang="scss" scoped>
.system-manage {
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  > .left {
    margin: $margin;
  }
  > .right {
    flex: 1;
    background: var(--color-bg-1);
    overflow: hidden;
    margin: $margin $margin $margin 0;
    border-radius: 2px;
    .dept-manage,
    .menu-manage,
    .role-manage,
    .user-manage {
      margin: 0;
    }
  }
}
</style>
