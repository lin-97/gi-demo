<template>
  <a-config-provider update-at-scroll>
    <router-view></router-view>

    <template #loading>
      <img src="/static/images/loading.gif" class="loading-icon" />
    </template>
  </a-config-provider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })

// h5禁止缩放
document.addEventListener('gesturestart', function (event) {
  event.preventDefault()
})
</script>

<style lang="scss" scoped>
.loading-icon {
  width: 30px;
}
</style>
