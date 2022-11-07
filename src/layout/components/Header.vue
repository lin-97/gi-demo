<template>
  <a-layout-header>
    <section class="system-logo" @click="toHome">
      <img src="@/assets/images/logo.gif" />
      <span class="system-name">Admin Pro</span>
    </section>
    <a-space class="system-head" size="medium">
      <!-- 项目配置 -->
      <a-tooltip content="项目配置" position="bl">
        <a-button size="mini" class="gi_hover_btn" @click="SettingDrawerRef?.open">
          <template #icon>
            <icon-settings :size="18" />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 消息通知 -->
      <a-popover position="br" trigger="click">
        <a-badge :count="9" dot>
          <a-button size="mini" class="gi_hover_btn">
            <template #icon>
              <icon-notification :size="18" />
            </template>
          </a-button>
        </a-badge>
        <template #content>
          <Message></Message>
        </template>
      </a-popover>

      <!-- 全屏切换组件 -->
      <a-tooltip content="全屏切换" position="bottom">
        <a-button size="mini" class="gi_hover_btn" @click="onToggleFullScreen">
          <template #icon>
            <icon-fullscreen :size="18" v-if="!isFullScreen" />
            <icon-fullscreen-exit :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 暗黑模式切换 -->
      <a-tooltip content="主题切换" position="bottom">
        <GiThemeBtn></GiThemeBtn>
      </a-tooltip>

      <!-- 管理员账户 -->
      <a-dropdown trigger="hover">
        <a-row align="center" class="user">
          <!-- 管理员头像 -->
          <a-avatar :size="32">
            <img :src="userStore.userInfo.avatar" />
          </a-avatar>
          <span class="username">{{ userStore.userName }}</span>
          <icon-down />
        </a-row>
        <template #content>
          <a-doption @click="toUser">
            <template #icon>
              <span class="doption-icon" style="background: rgba(var(--primary-6))"><icon-user /></span>
            </template>
            <template #default>个人中心</template>
          </a-doption>
          <a-doption @click="toGitPath">
            <template #icon
              ><span class="doption-icon" style="background: rgba(var(--success-6))"><icon-github /></span
            ></template>
            <template #default>项目地址</template>
          </a-doption>
          <a-divider style="margin: 0" />
          <a-doption @click="logout">
            <template #icon>
              <span class="doption-icon" style="background: rgba(var(--warning-6))"><icon-export /></span>
            </template>
            <template #default>退出登录</template>
          </a-doption>
        </template>
      </a-dropdown>
    </a-space>

    <SettingDrawer ref="SettingDrawerRef"></SettingDrawer>
  </a-layout-header>
</template>

<script setup lang="ts" name="Header">
import { ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { useFullScreen } from '@/hooks'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'

const router = useRouter()
const userStore = useUserStore()
const { isFullScreen, onToggleFullScreen } = useFullScreen()
const SettingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()

// 跳转首页
const toHome = () => {
  router.push('/')
}

// 跳转个人中心
const toUser = () => {
  router.push('/system/user-center')
}

// 退出登录
const logout = () => {
  Modal.warning({
    title: '提示',
    content: '确认退出登录？',
    hideCancel: false,
    closable: true,
    onOk: () => {
      userStore.logout()
      router.replace('/login')
    }
  })
}

// 跳转项目地址
const toGitPath = () => {
  window.open('https://gitee.com/lin0716/gi-demo')
}
</script>

<style lang="scss" scoped>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}

.doption-icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  border-radius: 4px;
}

.arco-layout-header {
  padding: 0 $padding;
  height: 56px;
  background: var(--color-bg-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-neutral-3);
  .system-logo {
    font-size: 20px;
    line-height: 1;
    color: var(--color-text-1);
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    img {
      width: 32px;
      height: 32px;
      border-radius: 6px;
    }
    .system-name {
      padding-left: 10px;
      white-space: nowrap;
      transition: color 0.3s;
      &:hover {
        color: $color-theme !important;
        cursor: pointer;
      }
    }
  }
  .system-head {
    display: flex;
    align-items: center;
  }
  .user {
    color: var(--color-text-2);
    cursor: pointer;
    .username {
      margin-left: 10px;
    }
    .arco-icon-down {
      transition: all 0.3s;
      margin-left: 2px;
    }
  }
}
</style>
