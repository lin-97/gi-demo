export interface FileTypeListItem {
  name: string
  value: string
  menuIcon: string
  icon: string
}

/** 文件分类 */
export const FileTypeList: FileTypeListItem[] = [
  { name: '全部', value: '0', menuIcon: 'menu-file', icon: 'icon-stamp' },
  { name: '图片', value: '1', menuIcon: 'file-image', icon: 'icon-file-image' },
  { name: '文档', value: '2', menuIcon: 'file-txt', icon: 'icon-file' },
  { name: '视频', value: '3', menuIcon: 'file-video', icon: 'icon-video-camera' },
  { name: '音频', value: '4', menuIcon: 'file-music', icon: 'icon-file-audio' },
  { name: '其他', value: '5', menuIcon: 'file-other', icon: 'icon-bulb' }
]

export interface FileExtendNameIconMap {
  [key: string]: string
}

/** 文件类型图标 Map 映射 */
export const FileIcon: FileExtendNameIconMap = {
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

/** 图片类型 */
export const ImageTypes = ['jpg', 'png', 'gif', 'jpeg']

/** WPS、Office文件类型 */
export const OfficeTypes = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx']
