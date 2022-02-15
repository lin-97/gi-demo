<template>
  <div class="file-grid-wrap">
    <FileCard
      v-for="item in fileList"
      :key="item.id"
      :data="item"
      :check-mode="isBatchMode"
      :checked="file.selectedFileIdList.includes(item.id)"
      @click="handleClickFile(item)"
      @check="handleCheckFile(item)"
    ></FileCard>
  </div>
</template>

<style lang="scss" scoped>
.file-grid-wrap {
  flex: 1;
  margin-top: $margin;
  overflow: hidden;
  overflow-y: scroll;
  background: var(--color-bg-4);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
