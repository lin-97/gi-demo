<!--
  @file Message 组件
  @description 消息通知组件，包含通知、关注和待办三个标签页
-->
<template>
  <div class="message">
    <!-- 消息标签页 -->
    <a-tabs :active-key="activeTab" @change="handleTabChange">
      <a-tab-pane v-for="tab in tabs" :key="tab.key">
        <template #title>{{ tab.title }}({{ tab.count }})</template>
      </a-tab-pane>
    </a-tabs>

    <!-- 消息列表 -->
    <section class="message-list">
      <a-comment v-for="item in messageList" :key="item.id" :author="item.name" :content="item.content"
        :datetime="item.datetime">
        <template #avatar>
          <a-avatar>
            <img :src="item.avatar" :alt="item.name">
          </a-avatar>
        </template>
      </a-comment>
    </section>
  </div>
</template>

<script setup lang="ts">
/** 组件名称 */
defineOptions({ name: 'Message' })

/** 消息类型定义 */
interface MessageItem {
  id?: string | number
  name: string
  datetime: string
  content: string
  avatar: string
  actionText?: string
}

/** 标签页配置 */
const tabs = [
  { key: '1', title: '通知', count: 1 },
  { key: '2', title: '关注', count: 1 },
  { key: '3', title: '待办', count: 2 }
]

/** 组件状态 */
const activeTab = ref('1')

/** 消息列表数据 */
const messageList = ref<MessageItem[]>([
  {
    id: 1,
    name: 'Socrates',
    datetime: '1小时之前',
    content: 'Comment body content.',
    avatar: 'https://lolicode.gitee.io/scui-doc/demo/img/avatar2.gif'
  },
  {
    id: 2,
    name: '木木糖醇',
    datetime: '2小时之前',
    content: '关注了你',
    avatar: 'https://s1.ax1x.com/2022/06/14/XhteeO.jpg'
  },
  {
    id: 3,
    name: '徐欣',
    datetime: '2个半小时之前',
    content: '收藏了你的文章',
    avatar: 'https://s1.ax1x.com/2022/06/14/XhtSwF.jpg'
  }
])

/** 处理标签页切换 */
const handleTabChange = (key: string) => {
  activeTab.value = key
}
</script>

<style lang="scss" scoped></style>
