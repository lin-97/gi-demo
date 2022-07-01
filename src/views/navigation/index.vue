<template>
  <div class="navigation">
    <section class="left">
      <div class="search-box">
        <a-row justify="center" align="center">
          <img class="baidu-logo" src="https://img-blog.csdnimg.cn/img_convert/43c4d2e7ed80ca357e0827039fde024c.png" />
          <a-input-group>
            <a-input placeholder="请输入搜索内容" size="large" style="width: 430px" />
            <a-button type="primary" size="large">搜索</a-button>
          </a-input-group>
        </a-row>
      </div>

      <GroupBox v-for="(item, index) in data" :key="index" :title="item.title">
        <NavItem
          v-for="(i, ind) in item.list"
          :key="i.name + ind"
          :icon="i.src"
          :name="i.name"
          :desc="i.desc"
        ></NavItem>
      </GroupBox>
    </section>
    <section class="right"></section>
  </div>
</template>

<script setup lang="ts" name="Navigation">
import GroupBox from './GroupBox.vue'
import NavItem from './NavItem.vue'
import data from './data'
</script>

<style lang="scss" scoped>
.navigation {
  flex: 1;
  background-color: #f5f7fd;
  display: flex;
  .search-box {
    height: 110px;
    margin: 20px 0;
    background-color: var(--color-bg-2);
    display: flex;
    justify-content: center;
    align-items: center;
    .baidu-logo {
      height: 60px;
      margin-right: 20px;
    }
  }
  .left {
    flex: 1;
    padding: 0 50px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
