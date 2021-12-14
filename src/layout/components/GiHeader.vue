<template>
  <a-layout-header>
    <section class="sys-name">Admin管理系统</section>
    <section class="sys-head">
      <a-button size="mini" @click="changeTheme" :style="{ marginRight: '10px' }">
        <template #icon>
          <icon-sun-fill v-if="!isDarkMode" />
          <icon-moon-fill v-else />
        </template>
      </a-button>

      <a-avatar :size="32" :style="{ marginRight: '8px' }">
        <img src="@/assets/images/avatar.jpg" />
      </a-avatar>
      <a-dropdown trigger="hover">
        <a-button type="text">admin</a-button>
        <template #content>
          <a-doption>
            <template #icon><icon-user /></template><span style="margin-left: 4px">个人中心</span>
          </a-doption>
          <a-doption>
            <template #icon><icon-export /></template><span style="margin-left: 4px" @click="logout">退出登录</span>
          </a-doption>
        </template>
      </a-dropdown>
    </section>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

const isDarkMode = computed(() => store.state.app.isDarkMode)

// 暗黑模式切换
const changeTheme = () => {
  // let theme = document.body.getAttribute('arco-theme')
  if (!isDarkMode.value) {
    // 设置为暗黑主题
    store.commit('app/storeSetDarkMode', true)
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    store.commit('app/storeSetDarkMode', true)
    document.body.removeAttribute('arco-theme')
  }
  console.log(isDarkMode.value)
}

onMounted(() => {
  changeTheme()
  console.log(isDarkMode.value)
})

// 退出登录
const logout = () => {
  Modal.warning({
    title: '提示',
    content: '确认退出登录？',
    hideCancel: false,
    onOk: () => {
      router.replace('/login')
    }
  })
}
</script>

<style lang="scss" scoped>
.arco-layout-header {
  padding: 0 $padding;
  height: 50px;
  background: var(--color-bg-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-text-4);
  .sys-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-1);
  }
  .sys-head {
    display: flex;
    align-items: center;
  }
  .user {
    color: var(--color-text-2);
  }
}
</style>
