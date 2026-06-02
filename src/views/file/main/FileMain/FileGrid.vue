<template>
  <div class="file-grid">
    <a-grid :cols="{ xs: 4, sm: 4, md: 5, lg: 7, xl: 8, xxl: 9 }" :col-gap="12" :row-gap="12">
      <a-trigger v-for="item in data" :key="item.id" trigger="contextMenu" align-point
        animation-name="slide-dynamic-origin" auto-fit-transform-origin position="bl" update-at-scroll scroll-to-close>
        <a-grid-item>
          <div class="file-grid__item" @click.stop="handleClickFile(item)">
            <section class="file-grid__body">
              <div class="file-grid__icon">
                <FileImage :data="item"></FileImage>
              </div>
              <p class="g-line-1 file-grid__label">{{ getFileName(item) }}</p>
            </section>
            <section v-show="props.isBatchMode" class="file-grid__check"
              :class="{ 'file-grid__check--checked': props.selectedFileIds.includes(item.id) }"
              @click.stop="handleCheckFile(item)">
              <a-checkbox class="file-grid__checkbox" :model-value="props.selectedFileIds.includes(item.id)"
                @change="handleCheckFile(item)" />
            </section>
          </div>
        </a-grid-item>
        <template #content>
          <FileRightMenu :data="item" @click="handleRightMenuClick($event, item)"></FileRightMenu>
        </template>
      </a-trigger>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import type { FileItem } from '@/apis/file'

defineOptions({ name: 'FileGrid' })

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  selectedFileIds: () => [],
  isBatchMode: false
})

const emit = defineEmits<{
  (e: 'click', record: FileItem): void
  (e: 'select', record: FileItem): void
  (e: 'right-menu-click', mode: string, item: FileItem): void
}>()

interface Props {
  data?: FileItem[]
  selectedFileIds?: string[]
  isBatchMode?: boolean
}

const FileImage = defineAsyncComponent(() => import('./FileImage.vue'))
const FileRightMenu = defineAsyncComponent(() => import('./FileRightMenu.vue'))

const getFileName = (item: FileItem) => {
  return `${item.name}${item.extendName ? `.${item.extendName}` : ''}`
}

const handleClickFile = (item: FileItem) => {
  emit('click', item)
}

const handleCheckFile = (item: FileItem) => {
  emit('select', item)
}

const handleRightMenuClick = (mode: string, item: FileItem) => {
  emit('right-menu-click', mode, item)
}
</script>

<style lang="scss" scoped>
.file-grid {
  flex: 1;
  overflow: scroll;
  background: var(--color-bg-2);

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    cursor: pointer;

    &:hover {
      background: var(--color-primary-light-1);
    }

    &:active {

      svg,
      img {
        transform: scale(0.9);
      }
    }
  }

  &__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 76%;
    max-width: 100px;
    height: 100%;
    overflow: hidden;
  }

  &__icon {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60px;
    overflow: hidden;

    >img {
      width: auto;
      height: 100%;
      transition: all 0.3s;
    }

    >svg {
      height: 100%;
      transition: all 0.3s;
    }
  }

  &__label {
    box-sizing: border-box;
    width: 100%;
    padding: 0 5px;
    margin-top: 8px;
    font-size: 12px;
    text-align: center;
  }

  &__check {
    position: absolute;
    inset: 0;
    z-index: 9;
    background: rgb(0 0 0 / 10%);

    &--checked {
      background: none;
    }
  }

  &__checkbox {
    position: absolute;
    top: 5px;
    left: 5px;
    padding-left: 0;
  }
}
</style>
