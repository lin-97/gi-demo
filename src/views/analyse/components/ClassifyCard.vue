<template>
  <a-card hoverable :bordered="false" class="classify-card">
    <a-row justify="center" align="center" style="flex-direction: column">
      <GiIconBox :size="32" :color="props.color" shape="round">
        <component :is="props.icon" :size="18" />
      </GiIconBox>
      <span class="classify-card__name">{{ props.name }}</span>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
interface Props {
  name?: string
  icon?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  icon: '',
  color: ''
})
</script>

<style lang="scss" scoped>
.classify-card {
  margin-bottom: $margin;
  transition: transform 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
    transform: translateY(-4px);
  }

  &__name {
    margin-top: 8px;
  }
}
</style>
