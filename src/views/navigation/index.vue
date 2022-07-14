<template>
  <div class="navigation">
    <section class="left" id="leftId">
      <div class="search-box">
        <a-row justify="center" align="center">
          <img class="baidu-logo" src="https://mbdp01.bdstatic.com/static/landing-pc/img/logo_top.79fdb8c2.png" />
          <a-input-group>
            <a-input v-model="searchValue" placeholder="请输入搜索内容" size="large" allow-clear style="width: 430px" />
            <a-button type="primary" size="large" @click="search">搜索</a-button>
          </a-input-group>
        </a-row>
      </div>

      <GroupBox v-for="(item, index) in data" :key="index" :title="item.title" :id="item.id">
        <NavItem
          v-for="(i, ind) in item.list"
          :key="i.name + ind"
          :mode="item.mode"
          :icon="i.src"
          :name="i.name"
          :desc="i.desc"
          @click="onClick(i)"
        ></NavItem>
      </GroupBox>
    </section>
    <section class="right">
      <a-anchor line-less :change-hash="false" scroll-container="#leftId">
        <a-anchor-link v-for="(item, index) in data" :key="index" :href="`#${item.id}`">{{ item.title }}</a-anchor-link>
      </a-anchor>
    </section>
  </div>
</template>

<script setup lang="ts" name="Navigation">
import { ref } from 'vue'
import GroupBox from './GroupBox.vue'
import NavItem from './NavItem.vue'
import data from './data'

const searchValue = ref('')

const search = () => {
  window.open(`http://www.baidu.com/s?wd=${searchValue.value}`)
}

const onClick = (i: any) => {
  if (i.path) {
    window.open(i.path)
  }
}
</script>

<style lang="scss" scoped>
body[arco-theme='dark'] {
  .navigation {
    background-color: var(--color-bg-5);
  }
}
.navigation {
  flex: 1;
  display: flex;
  overflow: hidden;
  .search-box {
    height: 110px;
    margin: 20px 0;
    padding: 20px;
    background-color: var(--color-bg-1);
    display: flex;
    justify-content: center;
    align-items: center;
    .baidu-logo {
      height: 50px;
      margin-right: 20px;
      margin-bottom: 14px;
    }
  }
  .left {
    flex: 1;
    padding: 0 50px;
    box-sizing: border-box;
    overflow: auto;
  }
  .right {
    padding: 14px 16px;
    background-color: var(--color-bg-1);
  }
}
</style>
