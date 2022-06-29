<template>
  <div class="link-page" v-loading="loading">
    <iframe id="iframe" src="https://arco.design/vue/component/button" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts" name="ArcoDesign">
import useIframe from '../useIframe'
const { loading } = useIframe()
</script>

<style lang="scss" scoped>
.link-page {
  flex: 1;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
