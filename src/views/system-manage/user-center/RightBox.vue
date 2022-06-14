<template>
  <div class="right-box">
    <section class="head-box">
      <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
        <img src="@/assets/images/avatar.jpg" />
        <template #trigger-icon>
          <IconCamera />
        </template>
      </a-avatar>
      <section class="user-name">Lin</section>
      <section class="label-list">
        <div><icon-user /><span>前端开发工程师</span></div>
        <div><icon-safe /><span>前端</span></div>
        <div><icon-location /><span>广州</span></div>
      </section>
      <a-button type="primary" class="edit-btn"
        ><template #icon> <icon-edit /> </template>编辑信息</a-button
      >
    </section>

    <a-tabs hide-content default-active-key="2">
      <a-tab-pane key="1">
        <template #title>文章</template>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>项目</template>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #title>应用（3）</template>
      </a-tab-pane>
    </a-tabs>

    <section class="comment-box">
      <a-comment author="Lin" datetime="1个小时之前" align="right" class="comment-item" v-for="i in 5" :key="i">
        <template #actions>
          <span class="action" key="heart">
            <span><IconHeart /></span>
            <span>83</span>
          </span>
          <span class="action" key="star">
            <span><IconStar /></span>
            <span>3</span>
          </span>
          <span class="action" key="reply"> <IconMessage /><span>回复</span></span>
        </template>
        <template #avatar>
          <a-avatar>
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
        </template>
        <template #content>
          <div class="text">
            A design is a plan or specification for the construction of an object or system or for the implementation of
            an activity or process, or the result of that plan or specification in the form of a prototype, product or
            process.
          </div>
        </template>
      </a-comment>
    </section>
  </div>
</template>

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
  margin: $margin;
  margin-left: 0;
  background-color: var(--color-bg-2);
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  overflow: hidden;
}

.head-box {
  min-height: 204px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  background-color: rgb(var(--primary-6));
  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin: 10px 0;
  }
  .label-list {
    display: flex;
    margin-bottom: 10px;
    > div {
      margin-right: 15px;
      span {
        margin-left: 2px;
      }
    }
  }
}

.comment-box {
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
</style>
