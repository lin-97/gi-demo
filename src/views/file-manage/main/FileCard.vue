<template>
  <div class="file-card">
    <div class="file-image">
      <img src="../../../assets/svgs/file/files.svg" />
    </div>
    <div class="file-name">新建文件夹</div>
  </div>
</template>

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
  }
  .file-name {
    font-size: 12px;
    margin-top: 6px;
  }
}
</style>
