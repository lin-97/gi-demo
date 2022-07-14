<template>
  <div class="page">
    <section class="box">
      <a-result status="error" title="操作失败">
        <template #subtitle>表单提交失败，请重试</template>
        <template #extra>
          <a-space>
            <a-button size="medium">回到首页</a-button>
            <a-button type="primary" size="medium">返回修改</a-button>
          </a-space>
        </template>
      </a-result>
      <div class="info">
        <a-typography-paragraph>您提交的内容有如下错误：</a-typography-paragraph>
        <ul>
          <li>
            <icon-exclamation-circle-fill :size="20" style="color: rgb(var(--warning-5))" />
            <span class="tip">认证照片不够清晰</span>
            <a-button type="text">立即修改</a-button>
          </li>
          <li>
            <icon-exclamation-circle-fill :size="20" style="color: rgb(var(--warning-5))" />
            <span class="tip">你的用户不具有此操作权限</span>
            <a-button type="text">立即修改</a-button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts" name="ResultFail"></script>

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
    ul > li {
      display: flex;
      align-items: center;
      padding-left: 40px;
      .tip {
        margin: 0 10px;
      }
    }
  }
  .tip {
    margin-left: 5px;
  }
}
</style>
