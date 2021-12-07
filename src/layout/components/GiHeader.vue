<template>
  <a-layout-header>
    <section class="sys-name">Admin管理系统</section>
    <section class="sys-head">
      <a-button size="mini" @click="changeTheme" :style="{ marginRight: '10px' }">
        <template #icon>
          <icon-sun-fill v-if="light" />
          <icon-moon-fill v-else />
        </template>
      </a-button>

      <a-avatar :size="32" :style="{ marginRight: '8px' }">A</a-avatar>
      <a-dropdown trigger="hover">
        <a-button type="text">admin</a-button>
        <template #content>
          <a-doption>
            <template #icon><icon-user /></template><span style="margin-left: 4px">个人中心</span>
          </a-doption>
          <a-doption @click="logout">
            <template #icon><icon-export /></template><span style="margin-left: 4px">退出登录</span>
          </a-doption>
        </template>
      </a-dropdown>
    </section>
  </a-layout-header>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
import { Modal } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let light = ref('')

const changeTheme = () => {
  let theme = document.body.getAttribute('arco-theme')
  light.value = theme
  if (!theme) {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}

const logout = () => {
  Modal.warning({
    title: '温馨提示',
    content: '确认退出登录？',
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
