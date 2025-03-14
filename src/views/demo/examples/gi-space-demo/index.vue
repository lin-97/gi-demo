<template>
  <div class="gi_px gi_py">
    <a-card title="水平方向" :bordered="true" class="gi_mb">
      <template #extra>
        <a-button type="primary" @click="onClick">动态增删按钮</a-button>
      </template>
      <GiSpace>
        <a-button type="primary">按钮</a-button>
        <a-button v-if="flag" type="primary" status="success">按钮</a-button>
        <a-button type="primary" status="warning">按钮</a-button>
        <a-button type="primary" status="danger">按钮</a-button>
      </GiSpace>
    </a-card>
    <a-card title="垂直方向" :bordered="true" class="gi_mb">
      <GiSpace direction="vertical">
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="mini">按钮</a-button>
      </GiSpace>
    </a-card>
    <a-card title="垂直对齐-居中" :bordered="true" class="gi_mb">
      <GiSpace fill>
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="large">按钮</a-button>
      </GiSpace>
    </a-card>
    <a-card title="垂直对齐-顶部" :bordered="true" class="gi_mb">
      <GiSpace fill align="start">
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="large">按钮</a-button>
      </GiSpace>
    </a-card>
    <a-card title="垂直对齐-底部" :bordered="true" class="gi_mb">
      <GiSpace fill align="end">
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="mini">按钮</a-button>
        <a-button type="primary" size="large">按钮</a-button>
      </GiSpace>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
const flag = ref(true)
const onClick = () => {
  flag.value = !flag.value
}
</script>
