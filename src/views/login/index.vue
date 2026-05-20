<template>
  <div class="login">
    <a-row align="stretch" class="w-full h-full">
      <a-col :xs="0" :sm="0" :md="14" :lg="14" :xl="15" class="h-full">
        <LoginLeft />
      </a-col>
      <a-col :xs="24" :sm="24" :md="10" :lg="10" :xl="9" class="h-full">
        <div class="login-box">
          <GiThemeBtn class="theme-btn"></GiThemeBtn>
          <div class="login-box-content">
            <h3 class="title">欢迎回来</h3>
            <p class="sub-title">输入您的账号和密码登录</p>
            <a-form ref="formRef" size="large" :model="form" :rules="rules" layout="vertical"
              :label-col-props="{ style: { marginBottom: '0' } }">
              <a-form-item field="username" label="账号">
                <a-input v-model="form.username" placeholder="账号 admin/user" allow-clear>
                  <template #prefix><icon-user :stroke-width="3" :style="{ fontSize: '20px' }" /></template>
                </a-input>
              </a-form-item>
              <a-form-item field="password" label="密码">
                <a-input-password v-model="form.password" placeholder="密码" allow-clear>
                  <template #prefix><icon-lock :stroke-width="3" :style="{ fontSize: '20px' }" /></template>
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
                  <a-button type="primary" size="large" long :loading="loading" @click="login">
                    登录
                  </a-button>
                  <a-button type="text" size="large" long class="register-btn">
                    注册账号
                  </a-button>
                </a-space>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { useLoading } from '@/hooks'
import { useTabsStore, useUserStore } from '@/stores'
import * as Regexp from '@/utils/regexp'
import LoginLeft from './LoginLeft.vue'

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

const formRef = useTemplateRef('formRef')
// 登录加载
const { loading, setLoading } = useLoading()
// 记住密码
const checked = ref(false)

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
    Message.error((error as Error).message)
  } finally {
    setLoading(false)
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-input-wrapper),
:deep(.arco-btn-size-large) {
  height: 40px;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-bg-5);
}

.login-box {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 30px;
  background: var(--color-bg-1);

  &-content {
    box-sizing: border-box;
    width: 100%;
    max-width: 450px;
    padding: 20px;

    .title {
      margin-bottom: 12px;
      font-size: 36px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--color-text-1);
    }

    .sub-title {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 20px;
      color: var(--color-text-3);
    }
  }
}

.register-btn,
.register-btn:hover {
  color: var(--color-text-2);
}

.theme-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 9999;
}
</style>
