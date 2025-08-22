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
  transition: transform 0.3s;
  margin-bottom: $margin;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &__name {
    margin-top: 8px;
  }
}
</style>
