<template>
  <a-config-provider update-at-scroll>
    <router-view></router-view>

    <template #loading>
      <img src="/static/images/loading.gif" style="width: 30px" />
    </template>
  </a-config-provider>
</template>

<script setup lang="ts" name="App"></script>
