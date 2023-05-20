<template>
  <div class="user">
    <a-menu class="menu" :selected-keys="selectedKeys">
      <a-menu-item v-for="(item, index) in list" :key="item.path" @click="toPage(item.path)">
        <template #icon>
          <icon-menu></icon-menu>
        </template>
        <span>{{ item.name }}</span>
      </a-menu-item>
    </a-menu>
    <div class="content">
      <ParentView></ParentView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'User' })
const router = useRouter()

const selectedKeys = ref('')

const list = [
  { name: '个人中心', value: 1, path: '/user/index/index' },
  { name: '消息通知', value: 2, path: '/user/index/notice' }
]

const toPage = (path: string) => {
  router.push({ path: path })
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  .menu {
    width: 270px;
  }
  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
