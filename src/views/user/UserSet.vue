<template>
  <div class="user-set">
    <section class="menu">
      <a-menu :style="{ width: '200px', borderRadius: '4px' }">
        <a-menu-item key="0_0">个人信息</a-menu-item>
        <a-menu-item key="0_1">账号设置</a-menu-item>
        <a-menu-item key="0_2">密码</a-menu-item>
        <a-menu-item key="0_3">消息通知</a-menu-item>
      </a-menu>
    </section>
    <section class="form">
      <a-form :model="form" layout="vertical" :style="{ width: '600px' }">
        <a-form-item field="avatar" label="头像">
          <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
            <img src="@/assets/images/avatar.jpg" />
            <template #trigger-icon>
              <IconCamera />
            </template>
          </a-avatar>
        </a-form-item>
        <a-form-item field="name" label="用户名">
          <a-input v-model="form.name" style="width: 360px" />
        </a-form-item>
        <a-form-item field="map" label="办公地址">
          <a-select v-model="form.map" style="width: 360px">
            <a-option value="a">广州</a-option>
            <a-option value="b">深圳</a-option>
            <a-option value="c">上海</a-option>
            <a-option value="d">北京</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="desc" label="个人简介">
          <a-textarea v-model="form.desc" allow-clear style="width: 360px" />
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

<script lang="ts" setup>
import { reactive } from '@vue/reactivity'

const form = reactive({
  name: 'Lin',
  map: 'a',
  desc: ''
})
</script>

<style lang="scss" scoped>
// :deep(.arco-menu-light .arco-menu-item.arco-menu-selected) {
//   background-color: rgb(var(--primary-6));
// }
.user-set {
  margin: $margin;
  display: flex;
  background: var(--color-bg-2);
  .menu {
    border-right: 1px solid var(--color-border-2);
  }
  .form {
    padding: 25px;
  }
}
</style>
