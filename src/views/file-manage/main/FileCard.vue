<template>
  <div class="file-card" @click="handleClick">
    <div class="file-image">
      <!-- <img src="../../../assets/svgs/file/files.svg" /> -->
      <GiFileIcon name="wps" class="svg"></GiFileIcon>
    </div>
    <div class="file-name">{{ data.name }}</div>

    <!-- 勾选模式 -->
    <section class="check-mode" v-show="checkMode" @click.stop="handleClick">
      <a-checkbox class="checkbox" :model-value="checked" @change="handleChange"></a-checkbox>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 文件数据
  data: {
    type: Object,
    default: () => {}
  },
  // 是否勾选
  checked: {
    type: Boolean,
    default: false
  },
  // 选择模式
  checkMode: {
    type: Boolean,
    default: false
  }
})

// let fileIMg = require('../../../assets/svgs/file/files.svg')

const emit = defineEmits(['click', 'check'])

const handleClick = () => {
  console.log('点击了')
  if (props.checkMode) {
    emit('check', props.data)
  } else {
    emit('click', props.data)
  }
}

const handleChange = (v) => {
  emit('check', props.data)
}
</script>

<style lang="scss" scoped>
.file-card {
  width: 100px;
  height: 100px;
  // background: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  &:hover {
    background: var(--color-primary-light-1);
  }
  .file-image {
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 50%;
    }
    .svg {
      width: 50%;
      height: 60px;
    }
  }
  .file-name {
    font-size: 12px;
    margin-top: 6px;
  }
  .check-mode {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    .checkbox {
      position: absolute;
      top: 5px;
      left: 5px;
      padding-left: 0;
    }
  }
}
</style>
