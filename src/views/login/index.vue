<template>
  <div class="login">
    <section class="login-box animated flipInY">
      <!-- 左侧 -->
      <div class="login-left">
        <img class="login-img" src="@/assets/svgs/login-img.svg" />
      </div>
      <!-- 右侧 -->
      <div class="login-right">
        <a-form
          :model="form"
          :style="{ width: '84%' }"
          :label-col-style="{ display: 'none' }"
          :wrapper-col-style="{ flex: 1 }"
        >
          <h3 class="login-form-title" data-v-6b0ccce2="">
            <img class="logo" src="@/assets/images/logo.gif" /><span>Admin Pro</span>
          </h3>
          <a-form-item field="username">
            <a-input v-model="form.username" placeholder="账号" size="medium" allow-clear>
              <template #prefix><icon-user :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
            </a-input>
          </a-form-item>
          <a-form-item field="password">
            <a-input-password v-model="form.password" placeholder="密码" size="medium" allow-clear>
              <template #prefix><icon-lock :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-row justify="space-between" align="center" style="width: 100%">
              <a-checkbox v-model="checked">记住密码</a-checkbox>
              <a-link>忘记密码</a-link>
            </a-row>
          </a-form-item>
          <a-form-item>
            <a-space direction="vertical" fill style="width: 100%">
              <a-button type="primary" size="large" long :loading="loading" @click="login">登录</a-button>
              <a-button type="text" size="large" long class="register-btn">注册账号</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </section>

    <a-button size="mini" class="theme-btn gi_hover_btn" @click="onToggleThemeDark">
      <template #icon>
        <icon-sun-fill :size="18" v-if="themeStore.theme === 'light'"></icon-sun-fill>
        <icon-moon-fill :size="18" v-else></icon-moon-fill>
      </template>
    </a-button>

    <LoginBg></LoginBg>
  </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import LoginBg from './components/LoginBg/index.vue'
import { useThemeStore } from '@/store'
import { useThemeDark } from '@/hooks'
const router = useRouter()
const themeStore = useThemeStore()

const { onToggleThemeDark } = useThemeDark()

type LoginForm = { username: string; password: string }

const form: LoginForm = reactive({
  username: 'admin',
  password: '123'
})

// 记住密码
let checked = ref<boolean>(false)
// 登录加载
let loading = ref<boolean>(false)

// 点击登录
const login = () => {
  if (!form.username) {
    return Message.warning('请输入账户名称')
  }
  if (!form.password) {
    return Message.warning('请输入账户密码')
  }
  loading.value = true
  setTimeout(() => {
    router.push('/home')
    loading.value = false
  }, 600)
}
</script>

<style lang="scss" scoped>
:deep(.arco-checkbox-icon) {
  width: 16px;
  height: 16px;
  border-width: 1px;
}
.register-btn,
.register-btn:hover {
  color: var(--color-text-2);
}

.login-form-title {
  color: var(--color-text-1);
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 32px;
    height: 32px;
    margin-right: 6px;
  }
}

.theme-btn {
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 9999;
}

.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-5);
  &-box {
    width: 720px;
    height: 380px;
    display: flex;
    z-index: 999;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
  }
}

.login-left {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(60deg, rgb(var(--primary-6)), rgb(var(--primary-3)));
  &::before {
    content: '';
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    z-index: 99;
  }
  &:hover {
    .login-img {
      transform: scale(1.05);
    }
  }
  .login-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.3s;
    object-fit: cover;
  }
}

.login-right {
  width: 270px;
  height: 100%;
  background: var(--color-bg-2);

  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  box-sizing: border-box;
  :deep(.arco-input-wrapper) {
    border-color: var(--color-border-2);
    &.arco-input-focus {
      border-color: rgb(var(--primary-6));
    }
  }
}
</style>
