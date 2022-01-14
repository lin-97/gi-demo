import Clipboard from 'clipboard'
import { Message } from '@arco-design/web-vue'

/**
 * 复制文本
 * @param {string} 文本
 * @param {event} 事件对象
 */
export const handleCopyText = (text: string, event: any) => {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    Message.success('复制成功')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    Message.error('复制失败')
    clipboard.destroy()
  })
}
