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
  mp3: 'file-music',
  mp4: 'file-video',
  dir: 'file-dir',
  ppt: 'file-ppt',
  doc: 'file-wps',
  docx: 'file-wps',
  xls: 'file-excel',
  xlsx: 'file-excel',
  txt: 'file-txt',
  rar: 'file-rar',
  zip: 'file-zip',
  html: 'file-html',
  css: 'file-css',
  js: 'file-js',
  other: 'file-other' // 未知文件
}

// 图片类型
export const imageTypeList = ['jpg', 'png', 'gif', 'jpeg']

// WPS、Office文件类型
export const officeFileType = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx']
