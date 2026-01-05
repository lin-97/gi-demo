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
  box-sizing: border-box;
  padding: 30px;
  background-color: var(--color-bg-1);

  &__info {
    box-sizing: border-box;
    width: 100%;
    max-width: 500px;
    padding: 24px;
    font-size: 12px;
    background: var(--color-fill-2);
    border-radius: var(--border-radius-small);
  }
}
</style>
