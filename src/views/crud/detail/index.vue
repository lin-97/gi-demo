<template>
  <a-spin :loading="loading" class="w-full">
    <a-card title="基本信息" class="gi-mx gi-my">
      <template #extra>
        <a-button @click="back">返回</a-button>
      </template>
      <template v-if="detail">
        <a-descriptions table-layout="fixed" :label-style="{ width: '80px' }"
          :column="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }">
          <a-descriptions-item label="姓名">{{ detail.name }}</a-descriptions-item>
          <a-descriptions-item v-if="detail.avatar" label="头像">
            <a-avatar :size="24" shape="circle">
              <img :src="detail.avatar" alt="头像">
            </a-avatar>
          </a-descriptions-item>
          <a-descriptions-item label="账户">{{ detail.account }}</a-descriptions-item>
          <a-descriptions-item label="手机号">{{ detail.phone ? hidePhone(detail.phone) : '-' }}</a-descriptions-item>
          <a-descriptions-item label="性别">
            <GiCellGender :gender="detail.gender" />
          </a-descriptions-item>
          <a-descriptions-item label="邮箱">{{ detail.email || '-' }}</a-descriptions-item>
          <a-descriptions-item label="年龄">{{ detail.age ?? '-' }}</a-descriptions-item>
          <a-descriptions-item label="爱好" :span="2">
            <a-space v-if="detail.hobbys?.length" :size="5" wrap>
              <a-tag v-for="(item, i) in detail.hobbys" :key="i">{{ item }}</a-tag>
            </a-space>
            <span v-else>-</span>
          </a-descriptions-item>
          <a-descriptions-item label="状态">
            <GiCellStatus :status="detail.status" />
          </a-descriptions-item>
          <a-descriptions-item label="创建时间">{{ detail.createTime || '-' }}</a-descriptions-item>
          <a-descriptions-item label="地址">{{ detail.address || '-' }}</a-descriptions-item>
          <a-descriptions-item label="备注" :span="3">{{ detail.remark || '-' }}</a-descriptions-item>
        </a-descriptions>
      </template>
      <a-empty v-else-if="!loading" description="暂无数据" />
    </a-card>
  </a-spin>
</template>

<script setup lang="ts">
import type * as T from '@/apis/person'
import { baseAPI } from '@/apis/person'
import { GiCellGender, GiCellStatus } from '@/components/index'
import { hidePhone } from '@/utils'

defineOptions({ name: 'CrudDetailId' })

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const detail = ref<T.ListItem | null>(null)

const detailId = computed(() => (route.params.id as string) || (route.query.id as string))

async function fetchDetail() {
  const id = detailId.value
  if (!id) return
  try {
    loading.value = true
    const res = await baseAPI.getDetail({ id })
    detail.value = res.data ?? null
  } finally {
    loading.value = false
  }
}

const back = () => {
  router.back()
}

watch(
  detailId,
  (id) => {
    if (id) fetchDetail()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
