<template>
  <div ref="containerRef" class="gi-page gi-p0">
    <a-affix :target="containerRef ?? undefined">
      <a-page-header title="订单详情">
        <template #extra>
          <a-button @click="back">返回</a-button>
        </template>
      </a-page-header>
    </a-affix>

    <!-- 下单用户信息 -->
    <a-card title="下单用户信息" :bordered="false" class="gi-mx gi-my">
      <a-descriptions bordered table-layout="fixed" :column="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }"
        :label-style="{ width: '120px' }">
        <a-descriptions-item label="用户名">{{ orderDetail.user.name }}</a-descriptions-item>
        <a-descriptions-item label="联系方式">{{ orderDetail.user.contact }}</a-descriptions-item>
        <a-descriptions-item label="昵称">{{ orderDetail.user.nickname }}</a-descriptions-item>
        <a-descriptions-item label="用户类型">
          <a-tag color="orangered">{{ orderDetail.user.userType }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <!-- 收货和物流信息 -->
    <a-card title="收货和物流信息" :bordered="false" class="gi-mx gi-my">
      <a-descriptions bordered table-layout="fixed" :column="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }"
        :label-style="{ width: '120px' }">
        <a-descriptions-item label="收货人">{{ orderDetail.shipping.receiver }}</a-descriptions-item>
        <a-descriptions-item label="收货地址">{{ orderDetail.shipping.address }}</a-descriptions-item>
        <a-descriptions-item label="联系方式">{{ orderDetail.shipping.contact }}</a-descriptions-item>
        <a-descriptions-item label="运送方式">{{ orderDetail.shipping.deliveryType }}</a-descriptions-item>
        <a-descriptions-item label="物流公司名称">{{ orderDetail.shipping.logisticsCompany }}</a-descriptions-item>
        <a-descriptions-item label="运单号">{{ orderDetail.shipping.trackingNo }}</a-descriptions-item>
        <a-descriptions-item label="发票抬头">{{ orderDetail.shipping.invoiceTitle }}</a-descriptions-item>
        <a-descriptions-item label="发票号码">{{ orderDetail.shipping.invoiceNo }}</a-descriptions-item>
      </a-descriptions>
      <a-divider />
      <a-typography-title :heading="6">物流信息</a-typography-title>
      <a-timeline>
        <a-timeline-item v-for="(item, index) in orderDetail.logistics" :key="index" dot-type="solid">
          <a-typography-text>{{ item.time }}</a-typography-text>
          <div>{{ item.desc }}</div>
        </a-timeline-item>
      </a-timeline>
    </a-card>

    <!-- 订单信息 -->
    <a-card title="订单信息" :bordered="false" class="gi-mx gi-my">
      <a-row justify="space-between" align="center" class="gi-mb">
        <a-space :size="24">
          <a-typography-text>订单号: {{ orderDetail.orderNo }}</a-typography-text>
          <a-typography-text>下单时间: {{ orderDetail.orderTime }}</a-typography-text>
        </a-space>
        <a-space>
          <a-button type="primary">查看图片</a-button>
          <a-button type="primary">同意</a-button>
          <a-button type="primary" status="danger">拒绝</a-button>
        </a-space>
      </a-row>
      <a-table row-key="id" size="small" :bordered="{ cell: true }" :data="tableData" :columns="returnTableColumns"
        :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys"
        :pagination="pagination" :loading="loading" @select="select" @select-all="selectAll">
        <template #index="{ rowIndex }">
          {{ (pagination.current - 1) * pagination.pageSize + rowIndex + 1 }}
        </template>
        <template #productName="{ record }">
          <a-link>{{ record.productName }}</a-link>
        </template>
      </a-table>
      <a-row justify="end" class="gi-mt">
        <a-space align="end">
          <a-typography-text>实收款: </a-typography-text>
          <a-statistic :value="Number(orderDetail.actualAmount) ?? 0"
            :value-style="{ color: 'rgb(var(--danger-5))', fontWeight: 'bold', lineHeight: 1 }">
            <template #prefix>¥</template>
          </a-statistic>
        </a-space>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import { useTable } from '@/hooks'

defineOptions({ name: 'DetailGeneral' })

const containerRef = useTemplateRef('containerRef')
const router = useRouter()

// 订单详情数据（可按接口替换）
const orderDetail = reactive({
  user: {
    name: '木木糖醇',
    contact: '155****8810',
    nickname: '林小二',
    userType: '超级会员'
  },
  shipping: {
    receiver: '木木糖醇',
    address: '广东省广州市天河区琶洲街道琶洲大道东1号',
    contact: '155****8810',
    deliveryType: '快递',
    logisticsCompany: '顺丰',
    trackingNo: 'SF110101260001',
    invoiceTitle: '林小二',
    invoiceNo: 'GD2026030214300001'
  },
  logistics: [
    { time: '2017-06-30 22:22:22', desc: '广东省广州市天河区琶洲街道琶洲大道东1号' },
    { time: '2017-06-29 18:00:00', desc: '快件已发出' },
    { time: '2017-06-28 10:30:00', desc: '商家已发货' }
  ],
  orderNo: 'JD2026030200012345',
  orderTime: '2017-06-17 22:22:22',
  actualAmount: '600'
})

// 退货审核表格模拟数据（共 20 条）
const RETURN_MOCK_LIST = [
  { id: '1', category: '数码', productId: 'P001', productName: '商品A', unitPrice: '200', quantity: 1, returnStatus: '待审核', returnTime: '2017-06-20 10:00:00', returnReason: '不想要了', totalPrice: '200' },
  { id: '2', category: '服饰', productId: 'P002', productName: '商品B', unitPrice: '150', quantity: 2, returnStatus: '已同意', returnTime: '2017-06-19 14:00:00', returnReason: '尺寸不合适', totalPrice: '300' },
  { id: '3', category: '家居', productId: 'P003', productName: '商品C', unitPrice: '100', quantity: 1, returnStatus: '已拒绝', returnTime: '2017-06-18 09:00:00', returnReason: '其他', totalPrice: '100' },
  { id: '4', category: '数码', productId: 'P004', productName: '商品D', unitPrice: '299', quantity: 1, returnStatus: '待审核', returnTime: '2017-06-21 09:00:00', returnReason: '质量问题', totalPrice: '299' },
  { id: '5', category: '美妆', productId: 'P005', productName: '商品E', unitPrice: '88', quantity: 3, returnStatus: '已同意', returnTime: '2017-06-20 14:00:00', returnReason: '过敏', totalPrice: '264' },
  { id: '6', category: '服饰', productId: 'P006', productName: '商品F', unitPrice: '199', quantity: 1, returnStatus: '待审核', returnTime: '2017-06-22 11:00:00', returnReason: '尺码不对', totalPrice: '199' },
  { id: '7', category: '数码', productId: 'P007', productName: '商品G', unitPrice: '599', quantity: 1, returnStatus: '已拒绝', returnTime: '2017-06-17 16:00:00', returnReason: '七天无理由', totalPrice: '599' },
  { id: '8', category: '家居', productId: 'P008', productName: '商品H', unitPrice: '158', quantity: 2, returnStatus: '已同意', returnTime: '2017-06-19 10:00:00', returnReason: '破损', totalPrice: '316' },
  { id: '9', category: '服饰', productId: 'P009', productName: '商品I', unitPrice: '268', quantity: 1, returnStatus: '待审核', returnTime: '2017-06-23 08:00:00', returnReason: '颜色不符', totalPrice: '268' },
  { id: '10', category: '数码', productId: 'P010', productName: '商品J', unitPrice: '399', quantity: 1, returnStatus: '已同意', returnTime: '2017-06-18 15:00:00', returnReason: '不兼容', totalPrice: '399' },
  { id: '11', category: '美妆', productId: 'P011', productName: '商品K', unitPrice: '128', quantity: 2, returnStatus: '待审核', returnTime: '2017-06-24 12:00:00', returnReason: '效果不好', totalPrice: '256' },
  { id: '12', category: '家居', productId: 'P012', productName: '商品L', unitPrice: '368', quantity: 1, returnStatus: '已拒绝', returnTime: '2017-06-16 09:00:00', returnReason: '其他', totalPrice: '368' },
  { id: '13', category: '服饰', productId: 'P013', productName: '商品M', unitPrice: '178', quantity: 1, returnStatus: '已同意', returnTime: '2017-06-21 14:00:00', returnReason: '发错货', totalPrice: '178' },
  { id: '14', category: '数码', productId: 'P014', productName: '商品N', unitPrice: '899', quantity: 1, returnStatus: '待审核', returnTime: '2017-06-25 10:00:00', returnReason: '性能不达预期', totalPrice: '899' },
  { id: '15', category: '美妆', productId: 'P015', productName: '商品O', unitPrice: '66', quantity: 4, returnStatus: '已同意', returnTime: '2017-06-20 11:00:00', returnReason: '过期', totalPrice: '264' },
  { id: '16', category: '家居', productId: 'P016', productName: '商品P', unitPrice: '228', quantity: 1, returnStatus: '待审核', returnTime: '2017-06-26 16:00:00', returnReason: '有异味', totalPrice: '228' },
  { id: '17', category: '服饰', productId: 'P017', productName: '商品Q', unitPrice: '358', quantity: 1, returnStatus: '已拒绝', returnTime: '2017-06-15 13:00:00', returnReason: '不想要了', totalPrice: '358' },
  { id: '18', category: '数码', productId: 'P018', productName: '商品R', unitPrice: '499', quantity: 1, returnStatus: '已同意', returnTime: '2017-06-22 09:00:00', returnReason: '无法开机', totalPrice: '499' },
  { id: '19', category: '美妆', productId: 'P019', productName: '商品S', unitPrice: '98', quantity: 2, returnStatus: '待审核', returnTime: '2017-06-27 08:00:00', returnReason: '包装破损', totalPrice: '196' },
  { id: '20', category: '家居', productId: 'P020', productName: '商品T', unitPrice: '188', quantity: 1, returnStatus: '已同意', returnTime: '2017-06-19 17:00:00', returnReason: '描述不符', totalPrice: '188' }
]

const fetchReturnList = (params: { page: number, size: number }) => {
  const { page, size } = params
  const start = (page - 1) * size
  const records = RETURN_MOCK_LIST.slice(start, start + size)
  return Promise.resolve({
    data: { records, total: RETURN_MOCK_LIST.length }
  } as ApiRes<PageRes<typeof records>>)
}

const { loading, tableData, pagination, selectedKeys, select, selectAll } = useTable({
  listAPI: fetchReturnList,
  immediate: true,
  rowKey: 'id'
})

const returnTableColumns: TableInstance['columns'] = [
  { title: '序号', width: 60, align: 'center', slotName: 'index' },
  { title: '类别', dataIndex: 'category', width: 80 },
  { title: '商品ID', dataIndex: 'productId', width: 90 },
  { title: '商品名称', dataIndex: 'productName', width: 140, slotName: 'productName' },
  { title: '单价', dataIndex: 'unitPrice', width: 90, align: 'right' },
  { title: '数量', dataIndex: 'quantity', width: 70, align: 'center' },
  { title: '退货状态', dataIndex: 'returnStatus', width: 90 },
  { title: '退货时间', dataIndex: 'returnTime', width: 160 },
  { title: '退货理由', dataIndex: 'returnReason', width: 120, ellipsis: true, tooltip: true },
  { title: '商品总价', dataIndex: 'totalPrice', width: 100, align: 'right' }
]

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
