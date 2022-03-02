<template>
  <a-layout-header>
    <section class="system-logo" @click="toHome">
      <img src="@/assets/images/logo.gif" />
      <span class="gi_hover">{{ appStore.systemName }}</span>
    </section>
    <a-space class="system-head" size="medium">
      <!-- 项目配置 -->
      <a-button size="mini" class="gi_hover_btn" @click="showSettingDrawer = !showSettingDrawer">
        <template #icon>
          <icon-settings :size="18" />
        </template>
      </a-button>

      <!-- 消息通知 -->
      <a-tooltip content="消息通知" position="bl">
        <a-button size="mini" class="gi_hover_btn">
          <template #icon>
            <icon-notification :size="18" />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 全屏切换组件 -->
      <a-button size="mini" class="gi_hover_btn" @click="onToggleFullScreen">
        <template #icon>
          <icon-fullscreen :size="18" v-if="!isFullScreen" />
          <icon-fullscreen-exit :size="18" v-else />
        </template>
      </a-button>

      <!-- 暗黑模式切换 -->
      <a-button size="mini" class="gi_hover_btn" @click="onToggleThemeDark">
        <template #icon>
          <icon-sun-fill :size="18" v-if="themeStore.theme === 'light'"></icon-sun-fill>
          <icon-moon-fill :size="18" v-else></icon-moon-fill>
        </template>
      </a-button>

      <!-- 管理员头像 -->
      <a-avatar :size="32">
        <img src="@/assets/images/avatar.jpg" />
      </a-avatar>

      <!-- 管理员账户 -->
      <a-dropdown trigger="hover">
        <a-button type="text" class="username">
          <span>{{ userStore.userName }}</span>
          <icon-down />
        </a-button>
        <template #content>
          <a-doption @click="toUser">
            <div class="option-item">
              <span style="background: #1677ff"><icon-user /></span>
              <span>个人中心</span>
            </div>
          </a-doption>
          <a-doption @click="logout">
            <div class="option-item">
              <span style="background: #ff7d00"><icon-export /></span>
              <span>退出登录</span>
            </div>
          </a-doption>
        </template>
      </a-dropdown>
    </a-space>

    <SettingDrawer v-model="showSettingDrawer"></SettingDrawer>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore, useThemeStore } from '@/store'
import { useFullScreen, useThemeDark } from '@/hooks'
import SettingDrawer from './SettingDrawer.vue'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const themeStore = useThemeStore()

const { isFullScreen, onToggleFullScreen } = useFullScreen()
const { onToggleThemeDark } = useThemeDark()

let showSettingDrawer = ref<boolean>(false)

// 跳转首页
const toHome = () => {
  router.push('/')
}

// 跳转个人中心
const toUser = () => {
  router.push('/user')
}

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
.option-item {
  display: flex;
  align-items: center;
  span {
    &:first-child {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border-radius: 4px;
    }
    &:last-child {
      margin-left: 5px;
    }
  }
}
.arco-layout-header {
  padding: 0 $padding;
  height: 50px;
  background: var(--color-bg-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border-2);
  .system-logo {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-1);
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 32px;
      height: 32px;
      border-radius: 6px;
    }
    span {
      margin-left: 10px;
      white-space: nowrap;
    }
  }
  .system-head {
    display: flex;
    align-items: center;
  }
  .username {
    color: var(--color-text-2);
  }
}
</style>
