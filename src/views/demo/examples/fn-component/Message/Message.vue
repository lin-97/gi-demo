<template>
  <transition name="fade-mask" mode="out-in" appear @after-leave="destroy">
    <div v-show="visible" class="message-mask">
      <transition name="zoom-message" mode="out-in" appear>
        <section class="message">
          <div class="icon" :class="props.type">
            <component :is="TypeMap[props.type].icon" :size="80"></component>
          </div>
          <p class="content">{{ props.content || TypeMap[props.type].content }}</p>
        </section>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { IconCheckCircle, IconCloseCircle, IconExclamationCircle } from '@arco-design/web-vue/es/icon'

interface Props {
  type?: 'success' | 'warning' | 'error'
  content?: string
  duration?: number
  destroy?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  content: '',
  duration: 2000,
  destroy: undefined
})

const TypeMap = {
  success: {
    content: '操作成功',
    icon: IconCheckCircle
  },
  warning: {
    content: '警告信息',
    icon: IconExclamationCircle
  },
  error: {
    content: '操作错误',
    icon: IconCloseCircle
  }
}

const visible = ref(false)

onMounted(() => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.message-mask {
  position: fixed;
  inset: 0;
  // backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 50%);

  .message {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 140px;
    padding: 14px;
    background-color: rgb(255 255 255 / 90%);
    // backdrop-filter: blur(4px);
    border-radius: 15px;

    .icon {
      &.success {
        color: rgb(var(--success-6));
      }

      &.warning {
        color: rgb(var(--warning-6));
      }

      &.error {
        color: rgb(var(--danger-6));
      }
    }

    .content {
      margin-top: 8px;
      font-size: 15px;
      line-height: 1.4;
      color: #000;
    }
  }
}

.fade-mask-enter-from,
.fade-mask-leave-to {
  opacity: 0;
}

.fade-mask-enter-to,
.fade-mask-leave-from {
  opacity: 1;
}

.fade-mask-enter-active,
.fade-mask-leave-active {
  transition: opacity 0.3s ease;
}

// -----------------------

.zoom-message-enter-from,
.zoom-message-appear-from {
  opacity: 0;
  transform: scale(0.5);
}

.zoom-message-enter-to,
.zoom-message-appear-to {
  opacity: 1;
  transform: scale(1);
}

.zoom-message-enter-active,
.zoom-message-appear-active {
  transition: all 0.2s;
}

.zoom-message-leave-from {
  opacity: 1;
  transform: scale(1);
}

.zoom-message-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.zoom-message-leave-active {
  transition: all 0.2s;
}
</style>
