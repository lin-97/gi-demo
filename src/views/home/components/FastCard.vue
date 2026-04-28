<template>
  <a-card title="快捷操作" :bordered="false" class="g-base-card g-card-title fast-card">
    <a-row :gutter="[14, 14]">
      <a-col v-for="item in list" :key="item.name" v-bind="colProps">
        <div class="fast-card-item">
          <GiIconBox :size="48" :color="item.color" style="border-radius: 10px;">
            <component :is="item.icon" :size="24" :style="{ color: '#fff' }"></component>
          </GiIconBox>
          <span class="fast-card-item__name">{{ item.name }}</span>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import GiIconBox from '@/components/GiIconBox/GiIconBox.vue'

const colProps = { xs: 8, sm: 8, md: 4, lg: 4, xl: 4, xxl: 4 }

const list = [
  { name: '主控台', icon: 'icon-dashboard', color: 'linear-gradient(140deg, #7ED75F 0%, #3FAE2C 100%)' },
  { name: '列表', icon: 'icon-list', color: 'linear-gradient(140deg, #FFCF6B 0%, #F5A524 100%)' },
  { name: '表单', icon: 'icon-file', color: 'linear-gradient(140deg, #69B7FF 0%, #0E7AE6 100%)' },
  { name: '权限管理', icon: 'icon-mind-mapping', color: 'linear-gradient(140deg, #FF8FB3 0%, #E14B7E 100%)' },
  { name: '系统管理', icon: 'icon-computer', color: 'linear-gradient(140deg, #A27DF5 0%, #5A2EBC 100%)' },
  { name: '消息', icon: 'icon-notification', color: 'linear-gradient(140deg, #7AEEE6 0%, #2AB8AD 100%)' }
]
</script>

<style lang="scss" scoped>
.fast-card-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
</style>
