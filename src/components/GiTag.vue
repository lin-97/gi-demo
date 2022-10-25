<template>
  <div class="gi-tag" :class="getClassName" @click="handleClick">
    <slot></slot>
    <span class="gi-tag-close-btn" v-if="closable" @click="handleClose"><icon-close class="close-icon" /></span>
  </div>
</template>

<script setup lang="ts" name="GiTag">
import { computed, type PropType } from 'vue'

type GiTagType = 'dark' | 'light' | 'outline' | 'light-outline'
type GiTagStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type GiTagSize = 'mini' | 'small' | 'large'

const props = defineProps({
  type: {
    type: String as PropType<GiTagType>,
    default: 'light'
  },
  status: {
    type: String as PropType<GiTagStatus>,
    default: 'primary'
  },
  size: {
    type: String as PropType<GiTagSize>,
    default: 'small'
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const getClassName = computed<string>(() => {
  return `gi-tag-${props.type} gi-tag-size-${props.size} gi-tag-status-${props.status}`
})

const emit = defineEmits(['click', 'close'])

const handleClick = () => {
  emit('click')
}

const handleClose = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.gi-tag {
  display: inline-flex;
  padding: 0 8px;
  // padding-top: 1px;
  height: 20px;
  font-size: 12px;
  line-height: 1;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  box-sizing: border-box;
  cursor: pointer;
}

.gi-tag-close-btn {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 4px;
  .close-icon {
    width: 12px;
    height: 12px;
    z-index: 9;
  }
  &::before {
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    position: absolute;
    display: block;
    box-sizing: border-box;
    background-color: transparent;
    border-radius: var(--border-radius-circle);
    transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
  }
}

$status: primary, success, warning, danger, info;

.gi-tag-dark {
  color: #fff;
  @each $i in $status {
    &.gi-tag-status-#{$i} {
      border: 1px solid rgb(var(--#{$i}-6));
      background-color: rgb(var(--#{$i}-6));
      .gi-tag-close-btn {
        &:hover {
          color: rgb(var(--#{$i}-6));
          &::before {
            background-color: rgb(var(--#{$i}-1));
          }
        }
      }
    }
    @if ($i == info) {
      &.gi-tag-status-#{$i} {
        border: 1px solid rgb(var(--#{$i}-6));
        background-color: rgb(var(--gray-6));
        .gi-tag-close-btn {
          &:hover {
            color: rgb(var(--gray-6));
            &::before {
              background-color: rgb(var(--gray-1));
            }
          }
        }
      }
    }
  }
}

.gi-tag-light {
  color: #fff;
  @each $i in $status {
    &.gi-tag-status-#{$i} {
      color: rgb(var(--#{$i}-6));
      background-color: rgb(var(--#{$i}-1));
      .gi-tag-close-btn {
        &:hover {
          color: rgb(var(--#{$i}-6));
          &::before {
            background-color: rgb(var(--#{$i}-2));
          }
        }
      }
    }
    @if ($i == info) {
      &.gi-tag-status-#{$i} {
        color: var(--color-text-2);
        background-color: rgb(var(--gray-2));
        .gi-tag-close-btn {
          &:hover {
            color: rgb(var(--gray-6));
            &::before {
              background-color: rgb(var(--gray-3));
            }
          }
        }
      }
    }
  }
}

.gi-tag-outline {
  background: transparent;
  @each $i in $status {
    &.gi-tag-status-#{$i} {
      color: rgb(var(--#{$i}-6));
      border: 1px solid rgb(var(--#{$i}-6));
      .gi-tag-close-btn {
        &:hover {
          color: rgb(var(--#{$i}-6));
          &::before {
            background-color: rgb(var(--#{$i}-2));
          }
        }
      }
    }
    @if ($i == info) {
      &.gi-tag-status-#{$i} {
        color: var(--color-text-2);
        border: 1px solid rgb(var(--gray-6));
        .gi-tag-close-btn {
          &:hover {
            color: rgb(var(--gray-6));
            &::before {
              background-color: rgb(var(--gray-3));
            }
          }
        }
      }
    }
  }
}

.gi-tag-light-outline {
  @each $i in $status {
    &.gi-tag-status-#{$i} {
      color: rgb(var(--#{$i}-6));
      border: 1px solid rgb(var(--#{$i}-2));
      background: rgba(var(--#{$i}-6), 0.1);
      .gi-tag-close-btn {
        &:hover {
          color: rgb(var(--#{$i}-6));
          &::before {
            background-color: rgb(var(--#{$i}-2));
          }
        }
      }
    }
    @if ($i == info) {
      &.gi-tag-status-#{$i} {
        color: var(--color-text-2);
        background-color: rgb(var(--gray-2));
        border: 1px solid rgb(var(--gray-3));
        .gi-tag-close-btn {
          &:hover {
            color: rgb(var(--gray-6));
            &::before {
              background-color: rgb(var(--gray-3));
            }
          }
        }
      }
    }
  }
}

.gi-tag-size-mini {
  height: 22px;
  padding: 0 4px;
}

.gi-tag-size-small {
  height: 24px;
}

.gi-tag-size-large {
  height: 28px;
  padding: 0 10px;
  font-size: 14px;
}
</style>
