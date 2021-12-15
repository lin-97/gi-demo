<template>
  <a-layout-header>
    <section class="sys-name">Admin管理系统</section>
    <a-space class="sys-head" size="medium">
      <!-- 消息通知 -->
      <a-popover position="bl">
        <icon-notification class="gi_hover" style="font-size: 18px" />
        <template #content>消息通知</template>
      </a-popover>

      <!-- 全屏切换组件 -->
      <GiFullScreenIcon></GiFullScreenIcon>

      <!-- 暗黑模式切换 -->
      <a-button size="mini" @click="changeTheme">
        <template #icon>
          <icon-sun-fill v-if="ThemeMode === 'light'" />
          <icon-moon-fill v-else />
        </template>
      </a-button>

      <!-- 管理员头像 -->
      <a-avatar :size="32">
        <img src="@/assets/images/avatar.jpg" />
      </a-avatar>

      <!-- 管理员账户 -->
      <a-dropdown trigger="hover">
        <a-button type="text" class="username">admin</a-button>
        <template #content>
          <a-doption>
            <template #icon><icon-user /></template><span style="margin-left: 4px">个人中心</span>
          </a-doption>
          <a-doption @click="logout">
            <template #icon><icon-export /></template><span style="margin-left: 4px">退出登录</span>
          </a-doption>
        </template>
      </a-dropdown>
    </a-space>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import GiFullScreenIcon from '@/components/GiFullScreenIcon.vue'
const router = useRouter()
const store = useStore()

const ThemeMode = computed(() => store.state.app.ThemeMode)

// 暗黑模式切换
const changeTheme = () => {
  // let theme = document.body.getAttribute('arco-theme')
  if (ThemeMode.value === 'light') {
    store.commit('app/storeSetThemeMode', 'dark')
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    store.commit('app/storeSetThemeMode', 'light')
    document.body.removeAttribute('arco-theme')
  }
}

const initTheme = () => {
  if (ThemeMode.value === 'dark') {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}
initTheme()

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
  border-bottom: 1px solid var(--color-border-2);
  .sys-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-1);
  }
  .sys-head {
    display: flex;
    align-items: center;
  }
  .username {
    color: var(--color-text-2);
  }
}
</style>
