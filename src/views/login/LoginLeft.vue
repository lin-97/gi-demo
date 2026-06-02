<template>
  <div class="login-left">
    <div class="login-left__inner">
      <header class="login-left__header">
        <div class="login-left__brand">
          <div class="login-left__logo">
            <img src="@/assets/images/logo.gif" alt="Gi Admin Pro" />
          </div>
          <div class="login-left__brand-text">
            <span class="login-left__title">Gi Admin Pro</span>
          </div>
        </div>
      </header>

      <section class="login-left__hero">
        <h1 class="login-left__heading">
          高效智能 · 一站管理
          <span class="login-left__heading-sub">开箱即用的管理后台</span>
        </h1>
        <p class="login-left__desc">
          基于 Vue 3 与 Arco Design，提供权限、主题与业务组件的一站式解决方案，助力团队快速交付。
        </p>
      </section>

      <div class="login-left__illustration" aria-hidden="true">
        <img class="login-left__illustration-img" src="@/assets/svgs/home-design.svg" alt="" />
      </div>

      <ul class="login-left__features">
        <li v-for="item in features" :key="item.title" class="login-left__feature">
          <span class="login-left__feature-icon">
            <Icon :icon="item.icon" :width="20" :height="20" />
          </span>
          <span class="login-left__feature-text">
            <strong>{{ item.title }}</strong>
            <em>{{ item.subtitle }}</em>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({ name: 'LoginLeft' })

const features = [
  { title: '主题定制', subtitle: '跟随品牌主色切换', icon: 'icon-park-outline:platte' },
  { title: '响应式布局', subtitle: '桌面与移动端适配', icon: 'icon-park-outline:iphone' },
  { title: '权限体系', subtitle: '菜单与按钮级控制', icon: 'icon-park-outline:shield' }
] as const
</script>

<style lang="scss" scoped>
.login-left {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(165deg,
      rgb(var(--primary-1)) 0%,
      var(--color-bg-2) 42%,
      var(--color-bg-1) 100%);

  &::before {
    position: absolute;
    top: -120px;
    right: -80px;
    width: 360px;
    height: 360px;
    content: '';
    background: radial-gradient(circle, rgb(var(--primary-6), 0.12) 0%, transparent 68%);
    border-radius: 50%;
  }

  &::after {
    position: absolute;
    bottom: 8%;
    left: -60px;
    width: 240px;
    height: 240px;
    content: '';
    background: radial-gradient(circle, rgb(var(--primary-6), 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  &__inner {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    padding: clamp(24px, 4vh, 48px) clamp(20px, 4vw, 56px) clamp(20px, 3vh, 40px);
    overflow: auto;
  }

  &__header {
    flex-shrink: 0;
    margin-bottom: clamp(20px, 3vh, 36px);
  }

  &__brand {
    display: flex;
    gap: 14px;
    align-items: center;
  }

  &__logo {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 6px;
    background: var(--color-bg-1);
    border: 1px solid var(--color-border-2);
    border-radius: 12px;
    box-shadow: 0 4px 16px rgb(var(--primary-6), 0.08);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__brand-text {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__title {
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-text-1);
    letter-spacing: -0.02em;
  }

  &__hero {
    flex-shrink: 0;
    margin-bottom: clamp(12px, 2vh, 24px);
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0 0 12px;
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-text-1);
    letter-spacing: -0.02em;
  }

  &__heading-sub {
    font-size: clamp(16px, 2vw, 22px);
    font-weight: 600;
    color: rgb(var(--primary-6));
  }

  &__desc {
    max-width: 480px;
    margin: 0;
    font-size: clamp(13px, 1.4vw, 15px);
    line-height: 1.65;
    color: var(--color-text-3);
  }

  &__illustration {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-height: 160px;
    margin: clamp(8px, 2vh, 24px) 0;
  }

  &__illustration-img {
    width: min(100%, 520px);
    max-height: min(42vh, 320px);
    object-fit: contain;
    filter: drop-shadow(0 12px 32px rgb(var(--primary-6), 0.1));
    animation: login-float 6s ease-in-out infinite;
  }

  &__features {
    display: grid;
    flex-shrink: 0;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__feature {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 14px 12px;
    background: color-mix(in srgb, var(--color-bg-1) 72%, transparent);
    border: 1px solid var(--color-border-2);
    border-radius: 12px;
    box-shadow: 0 2px 12px rgb(var(--primary-6), 0.05);
  }

  &__feature-icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: rgb(var(--primary-6));
    background: rgb(var(--primary-1));
    border-radius: 10px;
  }

  &__feature-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    strong {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.3;
      color: var(--color-text-1);
    }

    em {
      font-size: 11px;
      font-style: normal;
      line-height: 1.4;
      color: var(--color-text-3);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-left__illustration-img {
    animation: none;
  }
}

@keyframes login-float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@media (width <=1200px) {
  .login-left__features {
    grid-template-columns: 1fr;
  }
}
</style>
