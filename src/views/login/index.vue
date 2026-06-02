<template>
  <div class="login">
    <a-row align="stretch" class="login__row">
      <a-col :xs="0" :sm="0" :md="14" :lg="14" :xl="15" class="login__col login__col--brand">
        <LoginLeft />
      </a-col>
      <a-col :xs="24" :sm="24" :md="10" :lg="10" :xl="9" class="login__col">
        <div class="login__panel">
          <div class="login__toolbar">
            <LoginPalette />
            <GiThemeBtn />
          </div>

          <div class="login__body">
            <div class="login__content">
              <header class="login__mobile-brand">
                <div class="login__mobile-logo">
                  <img src="@/assets/images/logo.gif" alt="Gi Admin Pro" />
                </div>
                <div>
                  <h2 class="login__mobile-title">Gi Admin Pro</h2>
                  <p class="login__mobile-desc">企业级后台管理系统</p>
                </div>
              </header>

              <h3 class="login__title">欢迎回来</h3>
              <p class="login__subtitle">请输入账号和密码登录系统</p>

              <a-form ref="formRef" class="login__form" size="large" :model="form" :rules="rules" layout="vertical"
                :label-col-props="{ style: { marginBottom: '0' } }" @submit="onSubmit">
                <a-form-item field="username" label="账号">
                  <a-input v-model="form.username" placeholder="请输入账号" allow-clear autocomplete="username">
                    <template #prefix>
                      <icon-user :stroke-width="3" class="login__input-icon" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item field="password" label="密码">
                  <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear
                    autocomplete="current-password" @press-enter="login">
                    <template #prefix>
                      <icon-lock :stroke-width="3" class="login__input-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>
                <a-form-item hide-label>
                  <a-row justify="space-between" align="center" class="w-full">
                    <a-checkbox v-model="remember">记住密码</a-checkbox>
                    <a-link class="login__link">忘记密码</a-link>
                  </a-row>
                </a-form-item>
                <a-form-item hide-label>
                  <a-space direction="vertical" fill class="w-full">
                    <a-button class="login__btn" type="primary" size="large" long html-type="submit" :loading="loading"
                      :disabled="loading">
                      登录
                    </a-button>
                    <a-button class="login__btn login__btn--text" type="text" size="large" long :disabled="loading">
                      注册账号
                    </a-button>
                  </a-space>
                </a-form-item>
              </a-form>
            </div>
          </div>

          <footer class="login__footer">
            <span>© {{ year }} Gi Admin Pro</span>
          </footer>
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
import LoginPalette from './LoginPalette.vue'

defineOptions({ name: 'Login' })

const router = useRouter()
const userStore = useUserStore()
const tabsStore = useTabsStore()
const year = new Date().getFullYear()

const form = reactive({
  username: 'admin',
  password: '123456'
})

const rules: FormInstance['rules'] = {
  username: [
    { required: true, message: '请输入账号' },
    { minLength: 2, message: '账号至少 2 个字符' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { match: Regexp.Password, message: '密码为 6 位数字' }
  ]
}

const formRef = useTemplateRef('formRef')
const { loading, setLoading } = useLoading()
const remember = ref(false)

async function login() {
  try {
    const valid = await formRef.value?.validate()
    if (valid) return
    setLoading(true)
    await userStore.login(form)
    tabsStore.reset()
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    await router.push({
      path: (redirect as string) || '/',
      query: { ...othersQuery }
    })
    Message.success('登录成功')
  } catch (error) {
    Message.error((error as Error).message || '登录失败，请重试')
  } finally {
    setLoading(false)
  }
}

function onSubmit(data: { values: Record<string, unknown>, errors: Record<string, unknown> | undefined }) {
  if (data.errors) return
  login()
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: var(--color-bg-5);

  &__row {
    width: 100%;
    height: 100%;
  }

  &__col {
    height: 100%;

    &--brand {
      min-height: 0;
    }
  }

  &__panel {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    padding: 24px 20px 16px;
    background: var(--color-bg-1);
  }

  &__body {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 0;
  }

  &__toolbar {
    position: absolute;
    top: 20px;
    right: clamp(16px, 3vw, 30px);
    z-index: 10;
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__content {
    box-sizing: border-box;
    width: 100%;
    max-width: 400px;
    padding: 8px 4px 24px;
  }

  &__mobile-brand {
    display: none;
    gap: 14px;
    align-items: center;
    margin-bottom: 28px;
  }

  &__mobile-logo {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    padding: 6px;
    background: rgb(var(--primary-1));
    border: 1px solid rgb(var(--primary-6), 0.15);
    border-radius: 12px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__mobile-title {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-text-1);
  }

  &__mobile-desc {
    margin: 0;
    font-size: 13px;
    line-height: 1.4;
    color: var(--color-text-3);
  }

  &__title {
    margin: 0 0 8px;
    font-size: clamp(22px, 4vw, 28px);
    font-weight: 700;
    line-height: 1.25;
    color: var(--color-text-1);
    letter-spacing: -0.02em;
  }

  &__subtitle {
    margin: 0 0 28px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text-3);
  }

  &__form {
    :deep(.arco-form-item-label-col > label) {
      font-weight: 500;
      color: var(--color-text-2);
    }
  }

  &__input-icon {
    font-size: 18px;
    color: var(--color-text-3);
  }

  :deep(.arco-input-wrapper) {
    height: 44px;
    border-radius: 8px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  :deep(.arco-input-wrapper:focus-within) {
    border-color: rgb(var(--primary-6));
    box-shadow: 0 0 0 2px rgb(var(--primary-6), 0.12);
  }

  &__link {
    cursor: pointer;
  }

  &__btn {
    height: 44px;
    border-radius: 8px;

    &--text {
      color: var(--color-text-2);

      &:hover {
        color: var(--color-text-1);
      }
    }
  }

  &__footer {
    position: absolute;
    right: 0;
    bottom: 16px;
    left: 0;
    font-size: 12px;
    color: var(--color-text-4);
    text-align: center;
  }
}

@media (width <=768px) {
  .login {
    height: 100dvh;

    &__row,
    &__col {
      height: 100dvh;
    }

    &__panel {
      min-height: 100dvh;
    }

    &__body {
      padding: 48px 0 40px;
    }

    &__mobile-brand {
      display: flex;
    }

    &__title {
      font-size: 22px;
    }

    &__subtitle {
      margin-bottom: 24px;
    }
  }
}
</style>
