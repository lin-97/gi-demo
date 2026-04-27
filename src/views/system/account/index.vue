<template>
  <div class="g-page account">
    <a-row :gutter="14">
      <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="8" :xxl="6">
        <AccountAvatar />
        <AccountInfoPane />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="16" :xxl="18">
        <AccountRightContent />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import AccountAvatar from './AccountAvatar.vue'
import AccountInfoPane from './AccountInfoPane.vue'
import AccountRightContent from './AccountRightContent.vue'

defineOptions({ name: 'SystemAccount' })
</script>

<style lang="scss" scoped></style>
