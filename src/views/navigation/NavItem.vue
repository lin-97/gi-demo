<template>
  <div class="nav-item" :class="`mode-${mode}`" v-if="icon" @click="handleClick">
    <div class="icon"><img :src="icon" /></div>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="desc gi_line_2" v-if="desc">
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  mode: {
    type: Number,
    default: 1
  },
  icon: {
    type: String
  },
  name: {
    type: String
  },
  desc: {
    type: String
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
  &.mode-1 {
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      .content {
        .name {
          color: $color-danger;
        }
      }
    }
    .icon {
      width: 40px;
      height: 40px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .content {
      margin-top: 10px;
      .name {
        font-size: 12px;
        transition: all 0.2s;
      }
      .desc {
        display: none;
      }
    }
  }
  &.mode-2 {
    width: 226px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    margin-right: 16px;
    transition: all 0.2s;
    border-radius: 12px;
    &:hover {
      background-color: rgba(var(--primary-6), 0.08);
      .content {
        .name {
          color: $color-danger;
        }
        .desc {
          color: $color-text-2;
        }
      }
    }
    .icon {
      width: 26px;
      height: 26px;
      flex-shrink: 0;
      margin-right: 6px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 1;
      .name {
        color: $color-text-1;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.2s;
      }
      .desc {
        margin-top: 8px;
        color: $color-text-3;
        font-size: 12px;
        line-height: 1.5;
        transition: all 0.2s;
      }
    }
  }
}
</style>
