/** 常见公共方法 */

/**
 * @desc 去除空格
 * @param str - 字符串
 * @param pos - 去除空格的位置
 * pos="both": 去除两边空格
 * pos="left": 去除左边空格
 * pos="right": 去除右边空格
 * pos="all": 去除所有空格
 */
type Pos = 'both' | 'left' | 'right' | 'all'
export function trim(str: string, pos: Pos = 'both'): string {
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  } else if (pos == 'left') {
    return str.replace(/^\s*/, '')
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, '')
  } else if (pos == 'all') {
    return str.replace(/\s+/g, '')
  } else {
    return str
  }
}

/**
 * 根据数字获取对应的汉字
 * @param num - 数字(0-10)
 */
export function getHanByNumber(num: number): string {
  const str = '零一二三四五六七八九十'
  return str.charAt(num)
}

/**
 * 获取指定整数范围内的随机整数
 * @param start - 开始范围
 * @param end - 结束范围
 */
export function getRandomInterger(end: number, start = 0): number {
  const range = end - start
  const random = Math.floor(Math.random() * range + start)
  return random
}

// 千分位格式化
export function formatMoney(money: string) {
  return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',')
}

// 格式化电话号码 183-7983-6654
export function formatPhone(mobile: string, formatStr = '-') {
  return mobile.replace(/(?=(\d{4})+$)/g, formatStr)
}

// 数据类型检测方法
export function getDataType(value: string) {
  return Object.prototype.toString.call(value)
}

// 检测数据是否为空数据
export function isEmpty(data: unknown) {
  if (data === '' || data === 'undefined' || data === undefined || data === null || data === 'null') {
    return true
  }
  if (JSON.stringify(data) == '{}' || JSON.stringify(data) == '[]' || JSON.stringify(data) == '[{}]') {
    return true
  }
  return false
}
