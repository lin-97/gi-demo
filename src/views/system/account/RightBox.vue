<template>
  <div class="right-box">
    <section class="right-box__header">
      <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
        <img :src="userStore.avatar" />
        <template #trigger-icon>
          <IconCamera />
        </template>
      </a-avatar>
      <section class="username">{{ userStore.name }}</section>
      <ul class="list">
        <li><icon-user /><span>前端开发工程师</span></li>
        <li><icon-safe /><span>前端</span></li>
        <li><icon-location /><span>广州</span></li>
      </ul>
      <a-button type="primary" class="edit-btn">
        <template #icon> <icon-edit /> </template>编辑信息
      </a-button>
    </section>

    <a-tabs hide-content default-active-key="1">
      <a-tab-pane key="1" title="文章"></a-tab-pane>
      <a-tab-pane key="2" title="项目"></a-tab-pane>
      <a-tab-pane key="3" title="应用（3）"></a-tab-pane>
    </a-tabs>

    <section class="right-box__comment">
      <a-comment v-for="(item, index) in list" :key="index" :author="item.name" :avatar="item.avatar"
        :content="item.content" datetime="1个小时之前" align="right" class="comment-item">
        <template #actions>
          <a-space :size="20">
            <span class="action">
              <IconHeart /><span>83</span>
            </span>
            <span class="action">
              <IconStar /><span>3</span>
            </span>
            <span class="action">
              <IconMessage /><span>回复</span>
            </span>
          </a-space>
        </template>
      </a-comment>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const list = [
  {
    avatar:
      'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    name: 'Lin',
    content: '生活会让你苦上一阵子，等你适应以后，再让你苦上一辈子'
  },
  {
    avatar:
      'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    name: 'Lin',
    content: '我从一无所有，到资产过亿，从家徒四壁，到豪车别墅，这些不是靠的别人，完全是靠我自己，一点一滴，想出来的'
  },
  {
    avatar:
      'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    name: 'Lin',
    content: '有很多事情你当时想不通，别着急，过一段时间你再想，就想不起来了'
  },
  {
    avatar:
      'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    name: 'Lin',
    content: '⽐你优秀的⼈都⽐你努⼒，你努力还有什么用'
  },
  {
    avatar:
      'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    name: '窃·格瓦拉',
    content: '打工这辈子是不可能打工的，做生意又不会做，就是偷这种东西，才可以维持生活这样子'
  }
]
</script>

<style lang="scss" scoped>
.edit-btn {
  color: #fff;
  border-color: #fff;
  background: transparent;

  &:hover {
    background: rgb(var(--primary-5));
    border-color: rgb(var(--primary-5));
  }
}

.right-box {
  flex: 1;
  background-color: var(--color-bg-1);
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  overflow: hidden;
  overflow-y: auto;

  &__header {
    min-height: 204px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    background-color: rgb(var(--primary-6));

    .username {
      font-size: 16px;
      font-weight: 500;
      margin: 10px 0;
    }

    .list {
      display: flex;
      margin-bottom: 10px;

      >li {
        margin-right: 15px;

        span {
          margin-left: 2px;
        }
      }
    }
  }

  &__comment {
    flex: 1;
    padding: 20px 30px;
    padding-left: 16px;
    overflow: auto;

    .comment-item {
      margin-bottom: 15px;

      .text {
        color: $color-text-2;
      }
    }
  }
}
</style>
