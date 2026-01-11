<template>
  <div class="gi-footer">Copyright @{{ year }} Gi Admin Pro</div>
</template>

<script lang="ts" setup>
import Dayjs from 'dayjs'

defineOptions({ name: 'GiFooter' })

const year = Dayjs(new Date()).format('YYYY')
</script>

<style lang="scss" scoped>
.gi-footer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: $padding;
  margin-top: 12px;
  font-size: 12px;
  color: var(--color-text-3);
  border-top: 1px dashed var(--color-neutral-3);
}
</style>
