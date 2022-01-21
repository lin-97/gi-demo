<template>
  <a-layout-header>
    <section class="system-logo" @click="toHome">
      <img src="@/assets/logo.png" />
      <span class="gi_hover">{{ app.systemName }}</span>
    </section>
    <a-space class="system-head" size="medium">
      <!-- 消息通知 -->
      <a-tooltip content="消息通知" position="bl">
        <icon-notification class="gi_hover" size="18" />
      </a-tooltip>

      <!-- 全屏切换组件 -->
      <GiFullScreenIcon class="gi_hover"></GiFullScreenIcon>

      <!-- 暗黑模式切换 -->
      <a-button class="switch-theme-btn" size="mini" @click="changeTheme">
        <template #icon>
          <icon-sun-fill :size="18" v-if="app.ThemeMode === 'light'" />
          <icon-moon-fill :size="18" v-else />
        </template>
      </a-button>

      <!-- 管理员头像 -->
      <a-avatar :size="32">
        <img src="@/assets/images/avatar.jpg" />
      </a-avatar>

      <!-- 管理员账户 -->
      <a-dropdown trigger="hover">
        <a-button type="text" class="username">
          <span>{{ user.userName }}</span>
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
  </a-layout-header>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import GiFullScreenIcon from '@/components/GiFullScreenIcon.vue'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
const router = useRouter()
const app = useAppStore()
const user = useUserStore()

// 暗黑模式切换
const changeTheme = () => {
  // let theme = document.body.getAttribute('arco-theme')
  if (app.ThemeMode === 'light') {
    app.setThemeMode('dark')
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    app.setThemeMode('light')
    document.body.removeAttribute('arco-theme')
  }
}

// 初始化主题
const initTheme = () => {
  if (app.ThemeMode === 'dark') {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}
initTheme()

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
  background: var(--color-bg-3);
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
      width: 30px;
      height: 30px;
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

  .switch-theme-btn {
    border: 0;
    &:hover {
      background: var(--color-secondary-hover);
    }
    &:active {
      background: var(--color-secondary-active);
    }
  }
}
</style>
