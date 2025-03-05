import { browse, mapTree } from 'xe-utils'
import { camelCase, upperFirst } from 'lodash-es'
import { isExternal } from '@/utils/validate'

export * from './modules/getFieldToRangTimeForm'
export * from './modules/getRangeTimeToFieldForm'

/**
 * @description 工具函数库
 * @recommend 优先使用 lodash-es、xe-utils、dayjs 等成熟库的方法
 */

// =============== 类型定义 ===============

/** 字符串去除空格的位置 */
type TrimPosition = 'both' | 'left' | 'right' | 'all'

/** 树形结构基础接口 */
interface TreeNode {
  children?: TreeNode[]
  [key: string]: any
}

/** 可排序的树节点 */
interface SortableTreeNode extends TreeNode {
  sort: number
  children?: SortableTreeNode[]
}

// =============== 对象操作 ===============

/**
 * 获取对象属性值（类型安全）
 * @param obj - 目标对象
 * @param key - 属性键名
 * @returns 属性值
 */
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

/**
 * 深拷贝
 * @param data - 要拷贝的数据
 * @returns 深拷贝后的数据
 */
export function deepClone<T>(data: T): T {
  if (typeof data !== 'object' || data === null) return data
  const newData: any = Array.isArray(data) ? [] : {}
  for (const key in data) {
    newData[key] = typeof data[key] === 'object' ? deepClone(data[key]) : data[key]
  }
  return newData
}

// =============== 字符串操作 ===============

/**
 * 去除字符串空格
 * @param str - 目标字符串
 * @param pos - 去除位置，默认两端
 * @returns 处理后的字符串
 */
export function trim(str: string, pos: TrimPosition = 'both'): string {
  const trimMap = {
    both: /^\s+|\s+$/g,
    left: /^\s*/,
    right: /(\s*$)/g,
    all: /\s+/g
  }
  return str.replace(trimMap[pos] || trimMap.both, '')
}

/**
 * 字符串大小写转换
 * @param str - 目标字符串
 * @param type - 转换类型：1-全大写 2-全小写 3-首字母大写
 * @returns 转换后的字符串
 */
export function toCase(str: string, type: 1 | 2 | 3): string {
  const caseMap = {
    1: () => str.toUpperCase(),
    2: () => str.toLowerCase(),
    3: () => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  return caseMap[type]?.() || str
}

/**
 * 格式化电话号码
 * @param mobile - 手机号
 * @param separator - 分隔符
 * @returns 格式化后的电话号码，如：183-7983-6654
 */
export function formatPhone(mobile: string, separator = '-'): string {
  return mobile.replace(/(?=(\d{4})+$)/g, separator)
}

/**
 * 手机号脱敏处理
 * @param phone - 手机号
 * @returns 脱敏后的手机号，如：155****8810
 */
export function hidePhone(phone: string): string {
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}

// =============== 数字操作 ===============

/**
 * 获取指定范围内的随机整数
 * @param min - 最小值
 * @param max - 最大值
 * @returns 随机整数
 */
export function getRandomInteger(min = 0, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 数组计算工具
 */
export const arrayMath = {
  /** 获取数组最大值 */
  max: (arr: number[]): number => Math.max(...arr),
  /** 获取数组最小值 */
  min: (arr: number[]): number => Math.min(...arr),
  /** 计算数组总和 */
  sum: (arr: number[]): number => arr.reduce((a, b) => a + b, 0),
  /** 计算数组平均值 */
  average: (arr: number[]): number => arrayMath.sum(arr) / arr.length
}

// =============== 数据验证 ===============

/**
 * 检测数据是否为空
 * @param data - 要检测的数据
 * @returns 是否为空
 */
export function isEmpty(data: unknown): boolean {
  if (data === '' || data == null || data === 'undefined' || data === 'null') return true
  if (typeof data === 'object') {
    return JSON.stringify(data) === '{}'
      || JSON.stringify(data) === '[]'
      || JSON.stringify(data) === '[{}]'
  }
  return false
}

/**
 * 获取数据类型
 * @param value - 要检测的值
 * @returns 数据类型字符串
 */
export function getTypeOf(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

// =============== 日期时间 ===============

/**
 * 判断是否为闰年
 * @param year - 年份
 * @returns 是否闰年
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 获取问候语
 * @returns 根据当前时间返回问候语
 */
export function goodTimeText(): string {
  const hour = new Date().getHours()
  if (hour < 9) return '早上好'
  if (hour <= 11) return '上午好'
  if (hour <= 13) return '中午好'
  if (hour < 20) return '下午好'
  return '晚上好'
}

// =============== 文件处理 ===============

/**
 * 格式化文件大小
 * @param size - 文件大小（字节）
 * @returns 格式化后的文件大小
 */
export function formatFileSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let index = 0
  while (size > 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }
  return `${Math.round(size * 100) / 100}${units[index]}`
}

// =============== 颜色处理 ===============

/**
 * RGB转十六进制
 * @param r - 红色值(0-255)
 * @param g - 绿色值(0-255)
 * @param b - 蓝色值(0-255)
 * @returns 十六进制颜色值
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * 获取随机十六进制颜色
 * @returns 随机颜色值
 */
export function randomHex(): string {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padEnd(6, '0')}`
}

// =============== 路由工具 ===============

/**
 * 转换路由路径为名称
 * @param path - 路由路径
 * @returns 转换后的名称
 * @example
 * /system => System
 * /system/menu => SystemMenu
 * /data-manage/detail => DataManageDetail
 */
export function transformPathToName(path: string): string {
  if (!path || isExternal(path)) return ''
  return upperFirst(camelCase(path))
}

// =============== 树形结构处理 ===============

/**
 * 过滤树形结构
 * @param array - 树形数组
 * @param predicate - 过滤函数
 * @returns 过滤后的树形数组
 */
export function filterTree(array: TreeNode[], predicate: (node: TreeNode) => boolean): TreeNode[] {
  const filtered = array.filter(predicate)
  return mapTree(filtered, (item) => {
    if (item.children?.length) {
      item.children = item.children.filter(predicate)
    }
    return item
  })
}

/**
 * 排序树形结构
 * @param array - 可排序的树形数组
 * @returns 排序后的树形数组
 */
export function sortTree(array: SortableTreeNode[]): SortableTreeNode[] {
  const sort = (a: SortableTreeNode, b: SortableTreeNode) => (a.sort ?? 0) - (b.sort ?? 0)
  array.sort(sort)
  return mapTree(array, (item) => {
    if (item.children?.length) {
      item.children.sort(sort)
    }
    return item
  })
}

// =============== 环境检测 ===============

/**
 * 检测是否为移动端环境
 * @returns 是否为移动端
 */
export function isMobile(): boolean {
  return browse().isMobile
}
