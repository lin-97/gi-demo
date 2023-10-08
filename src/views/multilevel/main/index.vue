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
defineOptions({ name: 'MultilevelIndex' })

const route = useRoute()
const router = useRouter()

const selectedKeys = ref('')
watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = newPath
  },
  { immediate: true }
)

const list = [
  { name: '个人中心', value: 1, path: '/multilevel/index/user' },
  { name: '消息通知', value: 2, path: '/multilevel/index/notice' }
]

const toPage = (path: string) => {
  router.push({ path: path })
  selectedKeys.value = path
}
</script>

<style lang="scss" scoped>
.user {
  flex: 1;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  .menu {
    width: 220px;
    height: fit-content;
    margin: $margin;
  }
  .content {
    flex: 1;
    padding: $padding;
    padding-left: 0;
    overflow: hidden;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
</style>
