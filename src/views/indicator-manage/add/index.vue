<template>
  <div class="add">
    <section class="head">
      <a-page-header title="新增" subtitle="指标管理新增" @back="cancel">
        <template #breadcrumb>
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in route.matched" :key="index">{{
              item.meta.title
            }}</a-breadcrumb-item>
          </a-breadcrumb>
        </template>
        <template #extra>
          <a-space>
            <a-button type="primary" @click="confirm">确认</a-button>
            <a-button @click="cancel">取消</a-button>
          </a-space>
        </template>
      </a-page-header>
    </section>

    <section class="wrap">
      <a-form ref="formRef" :model="form" :style="{ width: '600px' }">
        <a-form-item field="name" label="任务名称">
          <a-input v-model="form.name" placeholder="请输入任务名称" style="width: 280px" />
        </a-form-item>
        <a-form-item field="way" label="执行方式">
          <a-radio-group v-model="form.way">
            <a-radio value="1">单次任务</a-radio>
            <a-radio value="2">周期任务</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="isApprove" label="是否选择审批">
          <a-radio-group v-model="form.isApprove">
            <a-radio value="1">否</a-radio>
            <a-radio value="2">是</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="treeSelect" label="发送表单">
          <a-tree-select
            :data="treeData"
            :field-names="{
              key: 'key',
              title: 'title',
              children: 'children'
            }"
            v-model="form.formId"
            placeholder="请选择"
            style="width: 280px"
          />
        </a-form-item>
        <a-form-item field="isApprove" label="发送对象">
          <a-radio-group v-model="form.dept">
            <a-radio value="1">业务处室</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="treeSelect" label="选择人员">
          <a-tree-select
            tree-checkable
            :data="treeData"
            v-model="form.user"
            placeholder="请选择"
            style="width: 280px"
          />
        </a-form-item>
        <a-form-item field="isApprove" label="填报说明">
          <a-textarea
            v-model="form.desc"
            placeholder="请输入填报说明"
            :auto-size="{ minRows: 4, maxRows: 6 }"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const form = reactive({
  name: '',
  way: '1',
  isApprove: '1',
  formId: '',
  dept: '1',
  user: [],
  desc: ''
})

const confirm = () => {
  router.back()
}

const cancel = () => {
  router.back()
}

const treeData = [
  {
    key: 'node1',
    title: 'Node1',
    children: [
      {
        key: 'node2',
        title: 'Node2'
      }
    ]
  },
  {
    key: 'node3',
    title: 'Node3',
    children: [
      {
        key: 'node4',
        title: 'Node4'
      },
      {
        key: 'node5',
        title: 'Node5'
      }
    ]
  }
]
</script>

<style lang="scss" scoped>
.add {
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    background: var(--color-bg-2);
  }
  .wrap {
    flex: 1;
    margin: $margin;
    background: var(--color-bg-2);
    overflow: hidden;
    padding: 20px;
    padding-top: 30px;
  }
}
</style>
