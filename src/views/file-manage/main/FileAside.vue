<template>
  <div class="file-aside">
    <a-menu
      :style="{ width: '250px', height: '100%', 'border-radius': '2px' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_0']"
    >
      <div class="title">文件管理</div>
      <a-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>文件类型</template>
        <a-menu-item key="0_0">
          <template #icon><GiSvgIcon class="icon" name="menu-file"></GiSvgIcon></template>
          全部</a-menu-item
        >
        <a-menu-item key="0_1"
          ><template #icon><GiSvgIcon class="icon" name="file-image"></GiSvgIcon></template> 图片</a-menu-item
        >
        <a-menu-item key="0_2"
          ><template #icon><GiSvgIcon class="icon" name="file-txt"></GiSvgIcon></template> 文档</a-menu-item
        >
        <a-menu-item key="0_3"
          ><template #icon><GiSvgIcon class="icon" name="file-video"></GiSvgIcon></template> 视频</a-menu-item
        >
        <a-menu-item key="0_4">
          <template #icon><GiSvgIcon class="icon" name="file-music"></GiSvgIcon></template>
          音乐</a-menu-item
        >
        <a-menu-item key="0_5">
          <template #icon><GiSvgIcon class="icon" name="file-other"></GiSvgIcon></template>
          其他</a-menu-item
        >
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<style lang="scss" scoped>
.file-aside {
  height: 60%;
  padding: $margin 0 $margin $margin;
  .icon {
    width: 28px;
    height: 28px;
  }
  .title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    font-size: 14px;
    border-bottom: 1px solid var(--color-border-2);
    margin-bottom: 10px;
  }
}
</style>
