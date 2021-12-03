<template>
  <a-layout class="gi-layout">
    <GiAside></GiAside>
    <a-layout>
      <GiHeader></GiHeader>
      <GiMain></GiMain>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconCaretRight, IconCaretLeft, IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'
import GiAside from './components/GiAside.vue'
import GiHeader from './components/GiHeader.vue'
import GiMain from './components/GiMain.vue'

export default defineComponent({
  components: {
    GiAside,
    GiHeader,
    GiMain,
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar
  },
  methods: {
    onClickMenuItem(key) {
      Message.info({ content: `You select ${key}`, showIcon: true })
    }
  }
})
</script>

<style scoped>
.gi-layout {
  height: 100%;
}
</style>
