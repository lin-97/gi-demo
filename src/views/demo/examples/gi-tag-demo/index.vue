<template>
  <div class="gi_px gi_py">
    <a-card title="基本使用" :bordered="true">
      <a-space wrap fill>
        <GiTag>light</GiTag>
        <GiTag status="success" closable @close="onClose">标签</GiTag>
        <GiTag status="warning">标签</GiTag>
        <GiTag status="danger" closable>标签</GiTag>
      </a-space>
      <a-space wrap fill>
        <GiTag type="dark" size="mini">dark</GiTag>
        <GiTag type="dark" size="mini" status="success" closable @close="onClose">标签</GiTag>
        <GiTag type="dark" size="mini" status="warning">标签</GiTag>
        <GiTag type="dark" size="mini" status="danger" closable>标签</GiTag>
      </a-space>
      <a-space wrap fill>
        <GiTag type="outline">outline</GiTag>
        <GiTag type="outline" status="success" closable @close="onClose">标签</GiTag>
        <GiTag type="outline" status="warning">标签</GiTag>
        <GiTag type="outline" status="danger" closable>标签</GiTag>
      </a-space>
      <a-space wrap fill>
        <GiTag type="light-outline">light-outline</GiTag>
        <GiTag type="light-outline" status="success" closable @close="onClose">标签</GiTag>
        <GiTag type="light-outline" status="warning">标签</GiTag>
        <GiTag type="light-outline" status="danger" closable>标签</GiTag>
      </a-space>
    </a-card>

    <a-card title="基础颜色" :bordered="true" class="gi_mt">
      <a-space wrap fill>
        <gi-tag color="red" closable>red</gi-tag>
        <gi-tag color="orangered">orangered</gi-tag>
        <gi-tag color="orange">orange</gi-tag>
        <gi-tag color="gold">gold</gi-tag>
        <gi-tag color="lime">lime</gi-tag>
        <gi-tag color="green">green</gi-tag>
        <gi-tag color="cyan">cyan</gi-tag>
        <gi-tag color="blue">blue</gi-tag>
        <gi-tag color="purple">purple</gi-tag>
        <gi-tag color="pink">pink</gi-tag>
        <gi-tag color="gray">gray</gi-tag>
      </a-space>
      <a-space wrap fill>
        <gi-tag type="dark" color="red" closable>red</gi-tag>
        <gi-tag type="dark" color="orangered">orangered</gi-tag>
        <gi-tag type="dark" color="orange">orange</gi-tag>
        <gi-tag type="dark" color="gold">gold</gi-tag>
        <gi-tag type="dark" color="lime">lime</gi-tag>
        <gi-tag type="dark" color="green">green</gi-tag>
        <gi-tag type="dark" color="cyan">cyan</gi-tag>
        <gi-tag type="dark" color="blue">blue</gi-tag>
        <gi-tag type="dark" color="purple">purple</gi-tag>
        <gi-tag type="dark" color="pink">pink</gi-tag>
        <gi-tag type="dark" color="gray">gray</gi-tag>
      </a-space>
      <a-space wrap fill>
        <gi-tag type="outline" color="red" closable>red</gi-tag>
        <gi-tag type="outline" color="orangered">orangered</gi-tag>
        <gi-tag type="outline" color="orange">orange</gi-tag>
        <gi-tag type="outline" color="gold">gold</gi-tag>
        <gi-tag type="outline" color="lime">lime</gi-tag>
        <gi-tag type="outline" color="green">green</gi-tag>
        <gi-tag type="outline" color="cyan">cyan</gi-tag>
        <gi-tag type="outline" color="blue">blue</gi-tag>
        <gi-tag type="outline" color="purple">purple</gi-tag>
        <gi-tag type="outline" color="pink">pink</gi-tag>
        <gi-tag type="outline" color="gray">gray</gi-tag>
      </a-space>
      <a-space wrap fill>
        <gi-tag type="light-outline" color="red" closable>red</gi-tag>
        <gi-tag type="light-outline" color="orangered">orangered</gi-tag>
        <gi-tag type="light-outline" color="orange">orange</gi-tag>
        <gi-tag type="light-outline" color="gold">gold</gi-tag>
        <gi-tag type="light-outline" color="lime">lime</gi-tag>
        <gi-tag type="light-outline" color="green">green</gi-tag>
        <gi-tag type="light-outline" color="cyan">cyan</gi-tag>
        <gi-tag type="light-outline" color="blue">blue</gi-tag>
        <gi-tag type="light-outline" color="purple">purple</gi-tag>
        <gi-tag type="light-outline" color="pink">pink</gi-tag>
        <gi-tag type="light-outline" color="gray">gray</gi-tag>
      </a-space>
    </a-card>

    <a-card title="自定义颜色" :bordered="true" class="gi_mt">
      <a-space wrap fill>
        <gi-tag color="#4E6EF2" closable>#4E6EF2</gi-tag>
        <gi-tag color="#1BA035">#1BA035</gi-tag>
        <gi-tag color="#AB57E3">#AB57E3</gi-tag>
        <gi-tag color="#FF6C9D">#FF6C9D</gi-tag>
        <gi-tag color="#0fc6c2">#0fc6c2</gi-tag>
      </a-space>
      <a-space wrap fill>
        <gi-tag type="dark" color="#4E6EF2" closable>#4E6EF2</gi-tag>
        <gi-tag type="dark" color="#1BA035">#1BA035</gi-tag>
        <gi-tag type="dark" color="#AB57E3">#AB57E3</gi-tag>
        <gi-tag type="dark" color="#FF6C9D">#FF6C9D</gi-tag>
        <gi-tag type="dark" color="#0fc6c2">#0fc6c2</gi-tag>
      </a-space>
      <a-space wrap fill>
        <gi-tag type="outline" color="#4E6EF2" closable>#4E6EF2</gi-tag>
        <gi-tag type="outline" color="#1BA035">#1BA035</gi-tag>
        <gi-tag type="outline" color="#AB57E3">#AB57E3</gi-tag>
        <gi-tag type="outline" color="#FF6C9D">#FF6C9D</gi-tag>
        <gi-tag type="outline" color="#0fc6c2">#0fc6c2</gi-tag>
      </a-space>
      <a-space wrap fill>
        <gi-tag type="light-outline" color="#4E6EF2" size="mini" closable>#4E6EF2</gi-tag>
        <gi-tag type="light-outline" color="#1BA035" size="mini">#1BA035</gi-tag>
        <gi-tag type="light-outline" color="#AB57E3" size="mini">#AB57E3</gi-tag>
        <gi-tag type="light-outline" color="#FF6C9D" size="mini">#FF6C9D</gi-tag>
        <gi-tag type="light-outline" color="#0fc6c2" size="mini">#0fc6c2</gi-tag>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const onClose = () => {
  Message.success('点击了关闭图标')
}
</script>
