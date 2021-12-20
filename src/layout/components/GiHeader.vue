<template>
  <a-layout-header>
    <section class="sys-name">
      <img src="@/assets/logo.png" />
      <span>Admin管理系统</span>
    </section>
    <a-space class="sys-head" size="medium">
      <!-- 消息通知 -->
      <a-tooltip content="消息通知" position="bl">
        <icon-notification class="gi_hover" style="font-size: 18px" />
      </a-tooltip>

      <!-- 全屏切换组件 -->
      <FullScreenIcon class="gi_hover"></FullScreenIcon>

      <!-- 暗黑模式切换 -->
      <a-button size="mini" style="line-height: 1" @click="changeTheme">
        <template #icon>
          <icon-sun-fill style="font-size: 18px" v-if="ThemeMode === 'light'" />
          <icon-moon-fill style="font-size: 18px" v-else />
        </template>
      </a-button>

      <!-- 管理员头像 -->
      <a-avatar :size="32">
        <img src="@/assets/images/avatar.jpg" />
      </a-avatar>

      <!-- 管理员账户 -->
      <a-dropdown trigger="hover">
        <a-button type="text" class="username">
          <span>admin</span>
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
              <span style="background: #e44d26"><icon-export /></span>
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
import FullScreenIcon from './FullScreenIcon.vue'
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
  .sys-name {
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
    }
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
