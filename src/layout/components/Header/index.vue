<template>
  <a-layout-header class="header">
    <section class="fold-btn-wrapper">
      <a-button size="mini" class="gi_hover_btn fold-btn" @click="appStore.setMenuCollapse(!appStore.menuCollapse)">
        <template #icon>
          <icon-menu-fold v-if="!appStore.menuCollapse" :size="18" :stroke-width="3" />
          <icon-menu-unfold v-else :size="18" :stroke-width="3" />
        </template>
      </a-button>
    </section>
    <a-row align="center" class="h-full header-right">
      <a-col :xs="0" :md="10" :lg="10" :xl="12" :xxl="12">
        <Breadcrumb></Breadcrumb>
      </a-col>
      <a-col :xs="24" :md="14" :lg="14" :xl="12" :xxl="12">
        <a-row justify="end" align="center">
          <a-space size="medium">
            <!-- 项目配置 -->
            <a-tooltip content="项目配置" position="bl">
              <a-button size="mini" class="gi_hover_btn" @click="SettingDrawerRef?.open">
                <template #icon>
                  <icon-settings :size="18" />
                </template>
              </a-button>
            </a-tooltip>

            <!-- 消息通知 -->
            <a-popover position="bottom" trigger="click">
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
            <a-tooltip v-if="!isPhone()" content="全屏切换" position="bottom">
              <a-button size="mini" class="gi_hover_btn" @click="toggleFullScreen">
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
              <a-row align="center" :wrap="false" class="user">
                <!-- 管理员头像 -->
                <a-avatar :size="32">
                  <img :src="userStore.avatar" />
                </a-avatar>
                <span class="username">{{ userStore.name }}</span>
                <icon-down />
              </a-row>
              <template #content>
                <a-doption @click="toUser">
                  <template #icon>
                    <span class="doption-icon primary"><icon-user /></span>
                  </template>
                  <span>个人中心</span>
                </a-doption>
                <a-doption @click="toGitPath">
                  <template #icon>
                    <span class="doption-icon success"><icon-github /></span>
                  </template>
                  <span>项目地址</span>
                </a-doption>
                <a-divider style="margin: 0" />
                <a-doption @click="logout">
                  <template #icon>
                    <span class="doption-icon warning"><icon-export /></span>
                  </template>
                  <span>退出登录</span>
                </a-doption>
              </template>
            </a-dropdown>
          </a-space>
        </a-row>
      </a-col>
    </a-row>

    <SettingDrawer ref="SettingDrawerRef"></SettingDrawer>
  </a-layout-header>
</template>

<script setup lang="ts">
import { Modal } from '@arco-design/web-vue'
import { useAppStore, useUserStore } from '@/stores'
import { useFullScreen } from '@/hooks'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'
import { isPhone } from '@/utils/common'

defineOptions({ name: 'Header' })
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const { isFullScreen, toggleFullScreen } = useFullScreen()
const SettingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()

// 跳转个人中心
const toUser = () => {
  router.push('/multilevel/index/user')
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
:deep(.fold-btn) {
  background-color: var(--color-secondary-hover) !important;
}

.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}

.header {
  display: flex;
  align-items: center;
  .header-right {
    flex: 1;
    overflow: hidden;
    margin-left: $padding;
  }
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
  &.primary {
    background-color: rgba(var(--primary-6));
  }
  &.success {
    background-color: rgba(var(--success-6));
  }
  &.warning {
    background-color: rgba(var(--warning-6));
  }
}

.arco-layout-header {
  padding: 0 $padding;
  height: 56px;
  background: var(--color-bg-1);
  border-bottom: 1px solid var(--color-neutral-3);
  .user {
    cursor: pointer;
    .username {
      margin-left: 10px;
      white-space: nowrap;
    }
    .arco-icon-down {
      transition: all 0.3s;
      margin-left: 2px;
    }
  }
}
</style>
