<template>
  <div class="gi_page">
    <section class="result-box">
      <a-result status="success" title="操作成功">
        <template #subtitle>表单提交成功！</template>
        <template #extra>
          <a-space>
            <a-button size="medium">打印结果</a-button>
            <a-button type="primary" size="medium">返回列表</a-button>
          </a-space>
        </template>
        <a-row justify="center">
          <a-typography class="result-box__info">
            <ul>
              <li>已提交申请，等待财务部门审核。</li>
            </ul>
          </a-typography>
        </a-row>
      </a-result>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ResultSuccess' })
</script>

<style lang="scss" scoped>
.result-box {
  padding: 30px;
  box-sizing: border-box;
  background-color: var(--color-bg-1);

  &__info {
    background: var(--color-fill-2);
    font-size: 12px;
    padding: 24px;
    box-sizing: border-box;
    width: 100%;
    max-width: 500px;
  }
}
</style>
