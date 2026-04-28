<template>
  <div class="g-page home">
    <a-row :gutter="[14, 14]">
      <a-col v-bind="leftColProps">
        <WorkCard class="g-mb"></WorkCard>

        <FastCard class="g-mb"></FastCard>

        <a-row :gutter="[14, 14]">
          <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="8" :xxl="8">
            <TargetCard class="g-mb"></TargetCard>
            <OverviewCard></OverviewCard>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="16" :xxl="16">
            <ReportCard></ReportCard>
          </a-col>
        </a-row>
      </a-col>
      <a-col v-bind="rightColProps">
        <NoticeCard class="g-mb"></NoticeCard>
        <FinishCard class="g-mb"></FinishCard>
        <MessageCard></MessageCard>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import FastCard from './components/FastCard.vue'
import FinishCard from './components/FinishCard.vue'
import MessageCard from './components/MessageCard.vue'
import NoticeCard from './components/NoticeCard.vue'
import OverviewCard from './components/OverviewCard.vue'
import ReportCard from './components/ReportCard.vue'
import TargetCard from './components/TargetCard.vue'
import WorkCard from './components/WorkCard.vue'

defineOptions({ name: 'Home' })

const leftColProps = { xs: 24, sm: 24, md: 24, lg: 16, xl: 16, xxl: 18 }
const rightColProps = { xs: 24, sm: 24, md: 24, lg: 8, xl: 8, xxl: 6 }
</script>

<style lang="scss" scoped>
.home {
  .backtop-icon {
    cursor: pointer;
  }
}
</style>
