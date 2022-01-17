/**
 * 文件模块-映射
 */

// 文件分类
export const fileTypeList = [
  { name: '全部', value: 'all', icon: 'icon-stamp' },
  { name: '图片', value: 'image', icon: 'icon-file-image' },
  { name: '文档', value: 'document', icon: 'icon-file' },
  { name: '视频', value: 'video', icon: 'icon-video-camera' },
  { name: '音乐', value: 'music', icon: 'icon-file-audio' },
  { name: '其他', value: 'other', icon: 'icon-bulb' }
]

// 文件类型图标 Map 映射
export const fileImgMap = {
  mp3: 'music',
  mp4: 'video',
  dir: 'files',
  ppt: 'ppt',
  doc: 'wps',
  docx: 'wps',
  xls: 'excel',
  xlsx: 'excel',
  txt: 'txt',
  rar: 'rar',
  zip: 'zip',
  html: 'html',
  css: 'css',
  js: 'javascript',
  other: 'other' // 未知文件
}

export const imageTypeList = ['jpg', 'png', 'gif', 'jpeg']
