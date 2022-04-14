<template>
  <div class="page">
    <a-result status="error" title="操作失败">
      <template #subtitle>
        <a-typography class="info">
          <a-typography-paragraph>您提交的内容有如下错误：</a-typography-paragraph>
          <a-row justify="center">
            <a-space align="center">
              <a-row>
                <icon-exclamation-circle-fill :size="20" style="color: rgb(240, 160, 32)" />
                <span class="tip">认证照片不够清晰</span>
              </a-row>
              <a-button type="text">立即修改</a-button>
            </a-space>
          </a-row>
          <a-row justify="center">
            <a-space align="center">
              <a-row>
                <icon-exclamation-circle-fill :size="20" style="color: rgb(240, 160, 32)" />
                <span class="tip">认证照片不够清晰</span>
              </a-row>
              <a-button type="text">立即修改</a-button>
            </a-space>
          </a-row>
        </a-typography>
      </template>

      <template #extra>
        <a-space>
          <a-button type="primary" size="medium">返回</a-button>
          <a-button size="medium">查看详情</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<style lang="scss" scoped>
:deep(.arco-result) {
  background-color: var(--color-bg-2);
}
.page {
  ul {
    list-style: none;
  }
  .info {
    width: 50%;
    margin: 0 auto;
    padding: 24px;
    margin-top: 20px;
    background: var(--color-fill-2);
  }
  .tip {
    margin-left: 5px;
  }
}
</style>
