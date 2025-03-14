<template>
  <a-card title="API测试" :bordered="false">
    <a-space fill wrap>
      <a-button type="primary" @click="success">成功接口请求</a-button>
      <a-button type="primary" status="danger" @click="fail">失败接口请求</a-button>
      <a-button type="primary" status="warning" @click="setTokenExpired">设置token过期</a-button>
    </a-space>
    <a-space fill wrap>
      <a-input v-model="currentTabTitle" placeholder="输入当前tab页签名称"></a-input>
      <a-button type="primary" @click="changeTabTitle">修改</a-button>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { getTestFail, getTestSuccess } from '@/apis/test'
import { useTabsStore, useUserStore } from '@/stores'

const userStore = useUserStore()

const result = ref('')
const success = async () => {
  const res = await getTestSuccess()
  Message.success('请求成功啦，哈哈~') // 如果await后面的语句时成功的promise，那么这行代码会执行
  result.value = res.data
}

const fail = async () => {
  await getTestFail()
  Message.success('请求成功') // 如果await后面的语句时失败的promise，那么这行代码以及往下的代码都不会执行
}

const setTokenExpired = () => {
  userStore.editToken('token123456')
  Message.info('token已过期, 请刷新页面, 登录成功会返回此页面')
}

const { setTabTitle } = useTabsStore()
const currentTabTitle = ref('')
const changeTabTitle = () => {
  setTabTitle(currentTabTitle.value)
}
</script>

<style lang="scss" scoped></style>
