<template>
  <div class="login">
    <section class="login-box animated flipInY">
      <!-- 左侧 -->
      <div class="login-left">
        <img class="bg" src="@/assets/images/login-bg.png" />
        <div class="system">
          <img class="logo" src="@/assets/images/logo.gif" />
          <div class="system-name"><span>Admin</span><span>管理系统</span></div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="login-right">
        <section class="form">
          <div class="form-item">
            <icon-user :stroke-width="1" :style="{ fontSize: '20px' }" />
            <input type="text" placeholder="账号" v-model="form.username" />
          </div>
          <div class="form-item">
            <icon-lock :stroke-width="1" :style="{ fontSize: '20px' }" />
            <input type="password" placeholder="密码" v-model="form.password" />
          </div>
          <div class="check">
            <a-checkbox v-model="checked">保持登录状态</a-checkbox>
          </div>
          <div>
            <a-button type="primary" size="large" long :loading="showLoading" @click="login">登录</a-button>
          </div>
        </section>
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
  &-box {
    width: 720px;
    height: 380px;
    background: #fff;
    display: flex;
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
    background-color: rgba(var(--primary-6), 0.6);
    z-index: 99;
  }
  &:hover {
    .bg {
      transform: scale(1.05);
    }
  }
  .bg {
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
  position: relative;
  background: var(--color-bg-2);
  .form {
    padding: 80px 35px;
    &-item {
      border-bottom: 1px solid #dcdfe6;
      padding-bottom: 10px;
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      input {
        color: var(--color-text-2);
        height: 100%;
        margin: 0;
        margin-left: 5px;
        padding: 0;
        border: none;
        outline: 0;
        font-weight: 100;
        font-size: 13px;
        background-color: transparent;
      }
    }
    .check {
      margin-bottom: 30px;
    }
  }
}
</style>
