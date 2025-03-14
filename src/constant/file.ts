/** 文件类型列表项接口 */
export interface FileTypeListItem {
  /** 显示名称 */
  name: string
  /** 类型值 */
  value: string
  /** 菜单图标 */
  menuIcon: string
  /** 文件图标 */
  icon: string
}

/**
 * 文件类型列表
 * @description 定义系统中支持的文件类型分类
 */
export const FILE_TYPE_LIST: FileTypeListItem[] = [
  { name: '全部', value: '0', menuIcon: 'menu-file', icon: 'icon-stamp' },
  { name: '图片', value: '1', menuIcon: 'file-image', icon: 'icon-file-image' },
  { name: '文档', value: '2', menuIcon: 'file-txt', icon: 'icon-file' },
  { name: '视频', value: '3', menuIcon: 'file-video', icon: 'icon-video-camera' },
  { name: '音频', value: '4', menuIcon: 'file-music', icon: 'icon-file-audio' },
  { name: '其他', value: '5', menuIcon: 'file-other', icon: 'icon-bulb' }
]

/** 文件扩展名与图标映射接口 */
export interface FileExtendNameIconMap {
  [key: string]: string
}

/**
 * 文件类型图标映射
 * @description 定义文件扩展名与对应图标的映射关系
 */
export const FILE_ICON_MAP: FileExtendNameIconMap = {
  // 音频文件
  mp3: 'file-music',
  // 视频文件
  mp4: 'file-video',
  // 文件夹
  dir: 'file-dir',
  // Office 文件
  ppt: 'file-ppt',
  doc: 'file-wps',
  docx: 'file-wps',
  xls: 'file-excel',
  xlsx: 'file-excel',
  // 文本文件
  txt: 'file-txt',
  // 压缩文件
  rar: 'file-rar',
  zip: 'file-zip',
  // 网页文件
  html: 'file-html',
  css: 'file-css',
  js: 'file-js',
  // 未知文件
  other: 'file-other'
}

/**
 * 图片文件类型列表
 * @description 系统支持的图片文件扩展名
 */
export const IMAGE_TYPES = ['jpg', 'png', 'gif', 'jpeg']

/**
 * Office 文件类型列表
 * @description 系统支持的 Office 文件扩展名
 */
export const OFFICE_TYPES = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx']
