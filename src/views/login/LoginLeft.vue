<template>
  <div class="login-left">
    <div class="login-left__inner">
      <header class="login-left__header">
        <div class="login-left__brand">
          <div class="login-left__logo">
            <img src="@/assets/images/logo.gif" alt="logo" />
          </div>
          <span class="login-left__title">Gi Admin Pro</span>
          <span class="login-left__badge">基于 Arco Design Vue</span>
        </div>
      </header>

      <section class="login-left__hero">
        <h1 class="login-left__heading">
          <span>高效 · 智能 · 现代化</span>
          <span class="login-left__heading-sub">后台管理模板</span>
        </h1>
        <p class="login-left__desc">
          基于 Arco Design 和 Vue 3 的企业级中后台解决方案
        </p>
      </section>

      <a-row class="login-left__features">
        <a-col v-for="item in features" :key="item.title" :md="12" :lg="12" :xl="6">
          <div class="login-left__feature">
            <div class="login-left__feature-icon" :class="item.iconClass">
              <Icon :icon="item.icon" :width="22" :height="22" />
            </div>
            <div class="login-left__feature-text">
              <strong>{{ item.title }}</strong>
              <span>{{ item.subtitle }}</span>
            </div>
          </div>
        </a-col>
      </a-row>

      <div class="login-left__bottom-bar">
        <a-row>
          <a-col v-for="item in bottomItems" :key="item.title" :md="12" :lg="12" :xl="6">
            <div class="login-left__bottom-item">
              <div class="login-left__bottom-icon">
                <Icon :icon="item.icon" :width="18" :height="18" />
              </div>
              <div class="login-left__bottom-text">
                <strong>{{ item.title }}</strong>
                <span>{{ item.subtitle }}</span>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({ name: 'LoginLeft' })

interface FeatureItem {
  title: string
  subtitle: string
  icon: string
  iconClass?: string
}

interface BottomItem {
  title: string
  subtitle: string
  icon: string
}

const features: FeatureItem[] = [
  { title: '高效开发', subtitle: '开箱即用', icon: 'icon-park-outline:thunderbolt', iconClass: 'is-blue' },
  { title: '组件丰富', subtitle: '覆盖常见场景', icon: 'icon-park-outline:layers', iconClass: 'is-blue' },
  { title: '主题定制', subtitle: '灵活配置', icon: 'icon-park-outline:platte', iconClass: 'is-purple' },
  { title: '安全可靠', subtitle: '权限完善', icon: 'icon-park-outline:shield', iconClass: 'is-blue' }
]

const bottomItems: BottomItem[] = [
  { title: '快速集成', subtitle: '零配置即可启动', icon: 'icon-park-outline:setting-two' },
  { title: '个性风格', subtitle: '轻松定制主题', icon: 'icon-park-outline:theme' },
  { title: '多元场景', subtitle: '满足各类业务', icon: 'icon-park-outline:three-hexagons' },
  { title: '持续更新', subtitle: '紧跟技术趋势', icon: 'icon-park-outline:upload-one' }
]
</script>

<style lang="scss" scoped>
.login-left {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(200deg,
      var(--color-primary-light-1) 0%,
      var(--color-bg-2) 38%,
      var(--color-bg-1) 100%);

  &::before {
    position: absolute;
    top: -80px;
    right: -60px;
    width: 320px;
    height: 320px;
    content: '';
    background: radial-gradient(circle, rgb(var(--primary-6), 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    position: absolute;
    bottom: 12%;
    left: -40px;
    width: 200px;
    height: 200px;
    content: '';
    background: radial-gradient(circle, rgb(var(--purple-6), 0.06) 0%, transparent 70%);
    border-radius: 50%;
  }

  &__inner {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    min-height: 0;
    padding: clamp(20px, 4vh, 48px) clamp(16px, 4vw, 56px) clamp(16px, 3vh, 40px);
    overflow: auto;
  }

  &__header {
    flex-shrink: 0;
    margin-bottom: clamp(24px, 4vh, 48px);
  }

  &__brand {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 12px;
    align-items: center;
  }

  &__logo {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 4px;
    line-height: 1;
    border: 1px solid var(--color-border-2);
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-size: clamp(18px, 2.2vw, 22px);
    font-weight: 700;
    color: var(--color-text-1);
    letter-spacing: -0.02em;
  }

  &__badge {
    padding: 4px 10px;
    font-size: clamp(11px, 1.1vw, 12px);
    font-weight: 500;
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
    border: 1px solid rgb(var(--primary-6), 0.15);
    border-radius: 20px;
  }

  &__hero {
    flex-shrink: 0;
    margin-bottom: clamp(20px, 3vh, 40px);
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0 0 clamp(10px, 2vh, 16px);
    font-size: clamp(22px, 2.8vw, 40px);
    font-weight: 700;
    line-height: 1.25;
    color: var(--color-text-1);
    letter-spacing: -0.02em;
  }

  &__heading-sub {
    color: rgb(var(--primary-6));
  }

  &__desc {
    margin: 0;
    font-size: clamp(13px, 1.4vw, 15px);
    line-height: 1.6;
    color: var(--color-text-3);
  }

  &__features {
    flex-shrink: 0;
    width: 100%;
    margin: 0 0 clamp(20px, 3vh, 48px);
  }

  &__feature {
    display: flex;
    gap: clamp(8px, 1.5vw, 12px);
    align-items: flex-start;
    padding: clamp(6px, 1vw, 10px);
  }

  &__feature-icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: clamp(36px, 5vw, 44px);
    height: clamp(36px, 5vw, 44px);
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
    border-radius: 10px;

    &.is-purple {
      color: rgb(var(--purple-6));
      background: rgb(var(--purple-6), 0.08);
    }
  }

  &__feature-text {
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      font-size: clamp(13px, 1.3vw, 14px);
      font-weight: 600;
      line-height: 1.3;
      color: var(--color-text-1);
    }

    span {
      font-size: clamp(11px, 1.1vw, 12px);
      line-height: 1.4;
      color: var(--color-text-3);
    }
  }

  &__bottom-bar {
    flex-shrink: 0;
    padding: clamp(12px, 2vw, 16px) clamp(12px, 2.5vw, 20px);
    margin-top: auto;
    background: color-mix(in srgb, var(--color-bg-1) 65%, transparent);
    border: 1px solid var(--color-border-2);
    border-radius: 16px;
    box-shadow:
      0 4px 24px rgb(var(--primary-6), 0.06),
      inset 0 1px 0 color-mix(in srgb, var(--color-bg-1) 90%, transparent);
    backdrop-filter: blur(1px);
  }

  &__bottom-item {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 4px 0;
  }

  &__bottom-icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: clamp(32px, 4vw, 36px);
    height: clamp(32px, 4vw, 36px);
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
    border-radius: 10px;
  }

  &__bottom-text {
    display: flex;
    flex-direction: column;
    gap: 2px;

    strong {
      font-size: clamp(12px, 1.2vw, 13px);
      font-weight: 600;
      line-height: 1.3;
      color: var(--color-text-2);
    }

    span {
      font-size: clamp(10px, 1vw, 11px);
      line-height: 1.4;
      color: var(--color-text-3);
    }
  }
}
</style>
