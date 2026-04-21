<template>
  <div>
    <a-form :model="flexConfig" auto-label-width>
      <a-form-item label="Select column:">
        <a-radio-group v-model="flexConfig.column" size="small" type="button">
          <a-radio :value="true">true</a-radio>
          <a-radio :value="false">false</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Select justify:">
        <a-radio-group v-model="flexConfig.justify" size="small" type="button">
          <a-radio value="start">start</a-radio>
          <a-radio value="center">center</a-radio>
          <a-radio value="end">end</a-radio>
          <a-radio value="space-between">space-between</a-radio>
          <a-radio value="space-around">space-around</a-radio>
          <a-radio value="space-evenly">space-evenly</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Select align:">
        <a-radio-group v-model="flexConfig.align" size="small" type="button">
          <a-radio value="start">start</a-radio>
          <a-radio value="center">center</a-radio>
          <a-radio value="end">end</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Select gap:">
        <a-slider v-model="flexConfig.gap" :min="0" :max="20" style="width: 200px;" />
      </a-form-item>
    </a-form>

    <a-card class="gi-card" :bordered="true" :header-style="{ display: 'none' }">
      <GiFlex :column="flexConfig.column" :justify="flexConfig.justify" :align="flexConfig.align" :gap="flexConfig.gap">
        <a-button type="primary">Primary</a-button>
        <a-button type="primary">Primary</a-button>
        <a-button type="primary">Primary</a-button>
        <a-button type="primary">Primary</a-button>
      </GiFlex>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import type { FlexProps } from '@/components/GiFlex/type'
import { reactive } from 'vue'

const flexConfig = reactive({
  justify: 'start' as FlexProps['justify'],
  align: 'start' as FlexProps['align'],
  column: false as FlexProps['column'],
  wrap: true as FlexProps['wrap'],
  gap: 0 as number
})
</script>
