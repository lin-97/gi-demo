<template>
  <div class="system-manage">
    <section class="left">
      <a-menu
        :style="{ width: '220px', height: '100%', 'border-radius': '2px' }"
        :default-open-keys="['0']"
        :default-selected-keys="[currentKey]"
      >
        <a-sub-menu key="0">
          <a-menu-item :key="item.id" v-for="(item, index) in menuList" @click="onClickMenuItem(item, index)">
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </section>

    <section class="right">
      <component :is="menuList[currentIndex].value"></component>
    </section>
  </div>
</template>

<script setup lang="ts" name="SystemManage">
import { ref, reactive } from 'vue'
import UserCenter from './UserCenter/index.vue'
import DeptManage from './dept-manage/index.vue'

let currentKey = ref<string>('01')
let currentIndex = ref<number>(0)

interface MenuItem {
  id: string
  name: string
  value: any
}
const menuList: MenuItem[] = reactive([
  { id: '01', name: '个人中心', value: UserCenter },
  { id: '04', name: '部门管理', value: DeptManage },
  { id: '02', name: '用户管理', value: UserCenter },
  { id: '03', name: '角色管理', value: UserCenter },
  { id: '05', name: '菜单管理', value: UserCenter }
])

const onClickMenuItem = (item: MenuItem, index: number) => {
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
    background: var(--color-bg-2);
    overflow: hidden;
    margin: $margin $margin $margin 0;
    border-radius: 2px;
  }
}
</style>
