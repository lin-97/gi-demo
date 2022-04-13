<template>
  <div class="page">
    <a-result status="success" title="操作成功">
      <template #subtitle>
        <a-typography class="info"> 已提交申请，等待财务部门审核。 </a-typography>
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
}
</style>
