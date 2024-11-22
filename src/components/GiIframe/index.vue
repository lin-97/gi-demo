<template>
  <a-spin class="gi-iframe" :loading="loading">
    <iframe class="iframe" :src="props.src" @load="onLoad"></iframe>
  </a-spin>
</template>

<script lang='ts' setup>
defineOptions({ name: 'GiIframe' })

const props = withDefaults(defineProps<Props>(), {
  src: ''
})

interface Props {
  src: string
}

const loading = ref(true)

const onLoad = () => {
  loading.value = false
}
</script>

<style lang='scss' scoped>
.gi-iframe {
  flex: 1;
}

.iframe {
  border: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
