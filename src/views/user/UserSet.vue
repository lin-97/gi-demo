<template>
  <div class="user-set">
    <section class="menu" v-if="width > 715">
      <a-menu
        :default-open-keys="['0']"
        :default-selected-keys="['0_0']"
        :style="{ width: '200px', borderRadius: '4px' }"
      >
        <a-sub-menu key="0">
          <a-menu-item key="0_0">个人信息</a-menu-item>
          <a-menu-item key="0_1">账号设置</a-menu-item>
          <a-menu-item key="0_2">密码</a-menu-item>
          <a-menu-item key="0_3">消息通知</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </section>
    <section class="form">
      <a-form :model="form" layout="vertical" :style="{ width: 'auto' }">
        <a-form-item field="avatar" label="头像">
          <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
            <img src="@/assets/images/avatar.jpg" />
            <template #trigger-icon>
              <IconCamera />
            </template>
          </a-avatar>
        </a-form-item>
        <a-form-item field="name" label="用户名">
          <a-input v-model="form.name" style="max-width: 280px" />
        </a-form-item>
        <a-form-item field="map" label="办公地址">
          <a-select v-model="form.map" style="max-width: 280px">
            <a-option value="a">广州</a-option>
            <a-option value="b">深圳</a-option>
            <a-option value="c">上海</a-option>
            <a-option value="d">北京</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="desc" label="个人简介">
          <a-textarea v-model="form.desc" allow-clear style="max-width: 280px" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary">保存信息</a-button>
            <a-button>取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

type Form = { name: string; map: string; desc: string }

const form: Form = reactive({
  name: 'Lin',
  map: 'a',
  desc: ''
})
</script>

<style lang="scss" scoped>
.user-set {
  margin: $margin;
  display: flex;
  background: var(--color-bg-2);
  .menu {
    border-right: 1px solid var(--color-border-2);
  }
  .form {
    width: 100%;
    padding: 25px;
    overflow: hidden;
  }
}
</style>
