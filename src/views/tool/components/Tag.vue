<template>
  <div>
    <a-space direction="vertical" :size="20">
      <section>
        <a-space>
          <GiTag size="mini" closable @close="onClose">标签</GiTag>
          <GiTag status="success" size="mini">标签</GiTag>
          <GiTag status="warning" size="mini">标签</GiTag>
          <GiTag status="danger" size="mini">标签</GiTag>
          <GiTag status="info" size="mini">标签</GiTag>
        </a-space>
        <div style="height: 10px"></div>
        <a-space>
          <GiTag type="plain" size="mini" closable @close="onClose">标签</GiTag>
          <GiTag type="plain" status="success" size="mini">标签</GiTag>
          <GiTag type="plain" status="warning" size="mini">标签</GiTag>
          <GiTag type="plain" status="danger" size="mini">标签</GiTag>
          <GiTag type="plain" status="info" size="mini">标签</GiTag>
        </a-space>
        <div style="height: 10px"></div>
        <a-space>
          <GiTag type="light" size="mini" closable @close="onClose">标签</GiTag>
          <GiTag type="light" status="success" size="mini">标签</GiTag>
          <GiTag type="light" status="warning" size="mini">标签</GiTag>
          <GiTag type="light" status="danger" size="mini">标签</GiTag>
          <GiTag type="light" status="info" size="mini">标签</GiTag>
        </a-space>
      </section>
      <section>
        <a-space>
          <GiTag>标签</GiTag>
          <GiTag status="success" closable @close="onClose">标签</GiTag>
          <GiTag status="warning">标签</GiTag>
          <GiTag status="danger">标签</GiTag>
          <GiTag status="info">标签</GiTag>
        </a-space>
        <div style="height: 10px"></div>
        <a-space>
          <GiTag type="plain">标签</GiTag>
          <GiTag type="plain" status="success" closable @close="onClose">标签</GiTag>
          <GiTag type="plain" status="warning">标签</GiTag>
          <GiTag type="plain" status="danger">标签</GiTag>
          <GiTag type="plain" status="info">标签</GiTag>
        </a-space>
        <div style="height: 10px"></div>
        <a-space>
          <GiTag type="light">标签</GiTag>
          <GiTag type="light" status="success" closable @close="onClose">标签</GiTag>
          <GiTag type="light" status="warning">标签</GiTag>
          <GiTag type="light" status="danger">标签</GiTag>
          <GiTag type="light" status="info">标签</GiTag>
        </a-space>
      </section>
      <section>
        <a-space>
          <GiTag size="large">标签</GiTag>
          <GiTag status="success" size="large">标签</GiTag>
          <GiTag status="warning" size="large">标签</GiTag>
          <GiTag status="danger" size="large" closable @close="onClose">标签</GiTag>
          <GiTag status="info" size="large">标签</GiTag>
        </a-space>
        <div style="height: 10px"></div>
        <a-space>
          <GiTag type="plain" size="large">标签</GiTag>
          <GiTag type="plain" status="success" size="large">标签</GiTag>
          <GiTag type="plain" status="warning" size="large">标签</GiTag>
          <GiTag type="plain" status="danger" size="large" closable @close="onClose">标签</GiTag>
          <GiTag type="plain" status="info" size="large">标签</GiTag>
        </a-space>
        <div style="height: 10px"></div>
        <a-space>
          <GiTag type="light" size="large">标签</GiTag>
          <GiTag type="light" status="success" size="large">标签</GiTag>
          <GiTag type="light" status="warning" size="large">标签</GiTag>
          <GiTag type="light" status="danger" size="large" closable @close="onClose">标签</GiTag>
          <GiTag type="light" status="info" size="large">标签</GiTag>
        </a-space>
      </section>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const onClose = () => {
  Message.success('点击了关闭图标')
}
</script>
