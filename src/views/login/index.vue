<template>
  <div class="login">
    <section class="login-box animated flipInY">
      <!-- 左侧 -->
      <div class="login-left">
        <img class="login-bg" src="@/assets/svgs/login-img.svg" />
        <div class="system">
          <img class="logo" src="@/assets/images/logo.gif" />
          <div class="system-name"><span>Admin</span><span>管理系统</span></div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="login-right">
        <a-form
          :model="form"
          :style="{ width: '80%' }"
          :label-col-style="{ display: 'none' }"
          :wrapper-col-style="{ flex: 1 }"
        >
          <a-form-item field="username">
            <a-input v-model="form.username" placeholder="账号" size="medium">
              <template #prefix><icon-user :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
            </a-input>
          </a-form-item>
          <a-form-item field="password">
            <a-input-password v-model="form.password" placeholder="密码" size="medium">
              <template #prefix><icon-lock :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="checked">保持登录状态</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" size="large" long :loading="showLoading" @click="login">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
const router = useRouter()

type LoginForm = { username: string; password: string }

const form: LoginForm = reactive({
  username: 'admin',
  password: '123'
})

// 记住密码
let checked = ref<boolean>(false)
// 登录加载
let showLoading = ref<boolean>(false)

// 点击登录
const login = () => {
  if (!form.username) {
    return Message.warning('请输入账户名称')
  }
  if (!form.password) {
    return Message.warning('请输入账户密码')
  }
  showLoading.value = true
  setTimeout(() => {
    router.push('/home')
    showLoading.value = false
  }, 800)
}
</script>

<style lang="scss" scoped>
:deep(.arco-checkbox-icon) {
  width: 16px;
  height: 16px;
  border-width: 1px;
}
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: var(--color-bg-2);
  background-image: url('@/assets/svgs/login-bg.svg');
  &-box {
    width: 720px;
    height: 380px;
    background: #fff;
    display: flex;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
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
  &::before {
    content: '';
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
  }
  &:hover {
    .bg {
      transform: scale(1.05);
    }
  }
  .login-bg {
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
  .system {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99;
    .system-name {
      color: #fff;
      margin-top: 8px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        &:first-child {
          font-size: 20px;
          margin-right: 4px;
        }
      }
    }
    .logo {
      width: 60px;
      height: 60px;
    }
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
  }
}
</style>
