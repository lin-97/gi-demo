import type { ButtonProps as ArcoButtonProps } from '@arco-design/web-vue'

export interface ButtonProps extends Omit<ArcoButtonProps, 'type'> {
  type?: 'add' | 'edit' | 'delete' | 'search' | 'reset' | 'upload' | 'import' | 'export' | ''
}
