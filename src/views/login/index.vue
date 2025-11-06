<template>
  <div class="login">
    <a-row align="stretch" class="login-box">
      <a-col :xs="0" :sm="12" :md="15">
        <div class="login-left">
          <img class="login-left__img" src="@/assets/svgs/login-img.svg" />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="9">
        <div class="login-right">
          <a-form ref="formRef" :size="isMobile() ? 'large' : 'medium'" :model="form" :rules="rules"
            :style="{ width: '84%' }" :label-col-style="{ display: 'none' }" :wrapper-col-style="{ flex: 1 }">
            <h3 class="login-right__title">
              <img class="logo" src="@/assets/images/logo.gif" /><span>Admin Pro</span>
            </h3>
            <a-form-item field="username">
              <a-input v-model="form.username" placeholder="账号 admin/user" allow-clear>
                <template #prefix><icon-user :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
              </a-input>
            </a-form-item>
            <a-form-item field="password">
              <a-input-password v-model="form.password" placeholder="密码" allow-clear>
                <template #prefix><icon-lock :stroke-width="1" :style="{ fontSize: '20px' }" /></template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-row justify="space-between" align="center" class="w-full">
                <a-checkbox v-model="checked">记住密码</a-checkbox>
                <a-link>忘记密码</a-link>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-space direction="vertical" fill class="w-full">
                <a-button type="primary" size="large" long :loading="loading" @click="login">登录</a-button>
                <a-button type="text" size="large" long class="register-btn">注册账号</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>

    <GiThemeBtn class="theme-btn"></GiThemeBtn>

    <LoginBg></LoginBg>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { useLoading } from '@/hooks'
import { useTabsStore, useUserStore } from '@/stores'
import { isMobile } from '@/utils'
import * as Regexp from '@/utils/regexp'
import LoginBg from './components/LoginBg/index.vue'

defineOptions({ name: 'Login' })
const router = useRouter()
const userStore = useUserStore()
const tabsStore = useTabsStore()

const form = reactive({
  username: 'admin',
  password: '123456'
})

const rules: FormInstance['rules'] = {
  username: [{ required: true, message: '请输入账号' }],
  password: [
    { required: true, message: '请输入密码' },
    { match: Regexp.Password, message: '输入密码格式不正确' }
  ]
}

// 记住密码
const checked = ref(false)
// 登录加载
const { loading, setLoading } = useLoading()
const errorMessage = ref('')

const formRef = useTemplateRef('formRef')
// 点击登录
const login = async () => {
  try {
    const valid = await formRef.value?.validate()
    if (valid) return
    setLoading(true)
    await userStore.login(form)
    tabsStore.reset()
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      path: (redirect as string) || '/',
      query: {
        ...othersQuery
      }
    })
    Message.success('登录成功')
  } catch (error) {
    errorMessage.value = (error as Error).message
  } finally {
    setLoading(false)
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-bg-5);

  &-box {
    z-index: 999;
    display: flex;
    width: 86%;
    max-width: 720px;
    height: 380px;
    box-shadow: 0 2px 4px 2px rgb(0 0 0 / 8%);
  }
}

.login-left {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(60deg, rgb(var(--primary-6)), rgb(var(--primary-3)));

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s;
  }
}

.login-right {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  background: var(--color-bg-1);

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    color: var(--color-text-1);
    text-align: center;

    .logo {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }
  }
}

.register-btn,
.register-btn:hover {
  color: var(--color-text-2);
}

.theme-btn {
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 9999;
}
</style>
