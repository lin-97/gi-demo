<template>
  <div class="flex-css">
    <a-space>
      <section>
        <div>flex-start-center</div>
        <div>flex-row-start-center</div>
        <div class="item flex-start-center"><span></span></div>
      </section>
      <section>
        <div>flex-center-center</div>
        <div>flex-row-center-center</div>
        <div class="item flex-center-center"><span></span></div>
      </section>
      <section>
        <div>flex-end-center</div>
        <div>flex-row-end-center</div>
        <div class="item flex-end-center"><span></span></div>
      </section>
    </a-space>

    <a-space style="margin-top: 20px">
      <section>
        <div>flex-col-start-center</div>
        <div class="item flex-col-start-center"><span></span></div>
      </section>
      <section>
        <div>flex-col-center-center</div>
        <div class="item flex-col-center-center"><span></span></div>
      </section>
      <section>
        <div>flex-col-end-center</div>
        <div class="item flex-col-end-center"><span></span></div>
      </section>
    </a-space>
  </div>
</template>

<script setup lang="ts" name="Flex"></script>

<style lang="scss" scoped>
.flex-css {
  .item {
    width: 200px;
    height: 100px;
    border: 1px solid $color-border;
    background-color: var(--color-bg-3);
    > span {
      width: 30px;
      height: 30px;
      background: $color-theme;
    }
  }
}
</style>
