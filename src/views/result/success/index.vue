<template>
  <div class="page">
    <section class="box">
      <a-result status="success" title="操作成功">
        <template #subtitle>表单提交成功！</template>
        <template #extra>
          <a-space>
            <a-button size="medium">打印结果</a-button>
            <a-button type="primary" size="medium">返回列表</a-button>
          </a-space>
        </template>
      </a-result>
      <div class="info">已提交申请，等待财务部门审核。</div>
    </section>
  </div>
</template>

<script setup lang="ts" name="ResultSuccess"></script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  padding: $margin;
  box-sizing: border-box;
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: var(--color-bg-1);
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
