<template>
  <div class="nav-item mode-1">
    <div class="icon"><img :src="icon" /></div>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="desc gi_line_2">
        {{
          desc ||
          '企业的专业办公管理工具。与微信一致的沟通体验，提供丰富免费的办公应用，并与微信消息、小程序、微信支付等互通，助力企业高效办公和管理。'
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String
  },
  name: {
    type: String
  },
  desc: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.nav-item {
  &.mode-1 {
    width: 226px;
    height: 89px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    margin-right: 16px;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 15px;
    &:hover {
      background-color: rgba(var(--primary-6), 0.08);
      .content {
        .name {
          color: $color-danger;
        }
        .desc {
          color: $color-text-2;
        }
      }
    }
    .icon {
      width: 26px;
      height: 26px;
      flex-shrink: 0;
      margin-right: 6px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 1;
      .name {
        color: $color-text-1;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.2s;
      }
      .desc {
        margin-top: 8px;
        color: $color-text-3;
        font-size: 12px;
        line-height: 1.5;
        transition: all 0.3s;
      }
    }
  }
}
</style>
