<template>
  <div class="gi_flex_box home">
    <a-card title="工作台" :bordered="false" :style="{ marginTop: '10px' }">
      <WorkPlatform></WorkPlatform>
    </a-card>

    <div class="wrap">
      <section class="left">
        <ItemList></ItemList>
        <MsgList style="margin-top: 10px"></MsgList>
      </section>
      <section class="right">
        <div class="pic">
          <img src="../../assets/images/home/home-design.svg" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import WorkPlatform from './WorkPlatform.vue'
import ItemList from './ItemList.vue'
import MsgList from './MsgList.vue'
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow-y: scroll;
  .wrap {
    display: flex;
    flex-wrap: wrap;
    padding: $padding;
    .left,
    .right {
      flex: 1;
      flex-shrink: 0;
      min-width: 450px;
    }
    .right {
      margin-left: $margin;
      .pic {
        padding: 20px;
        box-sizing: border-box;
        background: var(--color-bg-2);
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
