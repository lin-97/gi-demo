/**
 * @description 类型判断工具函数集合
 * 提供比 typeof 更准确的类型判断方法
 */

/** 获取值的具体类型 */
const getType = (value: unknown): string => Object.prototype.toString.call(value)

/**
 * 判断是否为数字类型
 * @param value - 要判断的值
 * @example
 * isNumber(123) // true
 * isNumber('123') // false
 * isNumber(NaN) // true
 * isNumber(Infinity) // true
 */
export function isNumber(value: unknown): value is number {
  return getType(value) === '[object Number]'
}

/**
 * 判断是否为字符串类型
 * @param value - 要判断的值
 * @example
 * isString('abc') // true
 * isString(123) // false
 */
export function isString(value: unknown): value is string {
  return getType(value) === '[object String]'
}

/**
 * 判断是否为布尔类型
 * @param value - 要判断的值
 * @example
 * isBoolean(true) // true
 * isBoolean(0) // false
 */
export function isBoolean(value: unknown): value is boolean {
  return getType(value) === '[object Boolean]'
}

/**
 * 判断是否为 null
 * @param value - 要判断的值
 * @example
 * isNull(null) // true
 * isNull(undefined) // false
 */
export function isNull(value: unknown): value is null {
  return getType(value) === '[object Null]'
}

/**
 * 判断是否为 undefined
 * @param value - 要判断的值
 * @example
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 */
export function isUndefined(value: unknown): value is undefined {
  return getType(value) === '[object Undefined]'
}

/**
 * 判断是否为普通对象
 * @param value - 要判断的值
 * @example
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 */
export function isObject(value: unknown): value is Record<string, any> {
  return getType(value) === '[object Object]'
}

/**
 * 判断是否为数组
 * @param value - 要判断的值
 * @example
 * isArray([]) // true
 * isArray({}) // false
 * @recommend 推荐使用 Array.isArray() 代替
 */
export function isArray(value: unknown): value is any[] {
  return getType(value) === '[object Array]'
}

/**
 * 判断是否为日期对象
 * @param value - 要判断的值
 * @example
 * isDate(new Date()) // true
 * isDate('2024-01-01') // false
 */
export function isDate(value: unknown): value is Date {
  return getType(value) === '[object Date]'
}

/**
 * 判断是否为正则表达式
 * @param value - 要判断的值
 * @example
 * isRegExp(/abc/) // true
 * isRegExp('/abc/') // false
 */
export function isRegExp(value: unknown): value is RegExp {
  return getType(value) === '[object RegExp]'
}

/**
 * 判断是否为 Set 对象
 * @param value - 要判断的值
 * @example
 * isSet(new Set()) // true
 * isSet([]) // false
 */
export function isSet(value: unknown): value is Set<any> {
  return getType(value) === '[object Set]'
}

/**
 * 判断是否为 Map 对象
 * @param value - 要判断的值
 * @example
 * isMap(new Map()) // true
 * isMap({}) // false
 */
export function isMap(value: unknown): value is Map<any, any> {
  return getType(value) === '[object Map]'
}

/**
 * 判断是否为 Promise 对象
 * @param value - 要判断的值
 * @example
 * isPromise(Promise.resolve()) // true
 * isPromise({ then: () => {} }) // false
 */
export function isPromise(value: unknown): value is Promise<any> {
  return getType(value) === '[object Promise]'
}

/**
 * 判断是否为函数
 * @param value - 要判断的值
 * @example
 * isFunction(() => {}) // true
 * isFunction(class {}) // true
 * isFunction({}) // false
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

/**
 * 判断是否为有效数字（排除 NaN 和 Infinity）
 * @param value - 要判断的值
 * @example
 * isValidNumber(123) // true
 * isValidNumber(NaN) // false
 * isValidNumber(Infinity) // false
 */
export function isValidNumber(value: unknown): value is number {
  return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value)
}

/**
 * 判断是否为空值（null 或 undefined）
 * @param value - 要判断的值
 * @example
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil('') // false
 */
export function isNil(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value)
}
