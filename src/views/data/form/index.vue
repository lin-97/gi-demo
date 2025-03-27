<template>
  <GiPageLayout>
    <a-card title="表单新增编辑页" class="gi_card flex-1">
      <template #extra>
        <a-button @click="router.back()">返回</a-button>
      </template>
      <a-alert>{{ route.query.id ? '编辑' : '新增' }}</a-alert>
    </a-card>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores'

defineOptions({ name: 'DataFormIndex' })

const route = useRoute()
const router = useRouter()
const { setTabTitle } = useTabsStore()
setTabTitle(route.query.id ? '编辑' : '新增')
</script>
