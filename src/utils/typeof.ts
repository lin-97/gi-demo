/** 判断变量类型 */

export function isNumber(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Number]'
}

export function isString(data: unknown) {
  return Object.prototype.toString.call(data) === '[object String]'
}

export function isBoolean(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Boolean]'
}

export function isNull(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Null]'
}

export function isUndefined(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Undefined]'
}

export function isObject(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export function isArray(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Array]'
}

export function isDate(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Date]'
}

export function isRegExp(data: unknown) {
  return Object.prototype.toString.call(data) === '[object RegExp]'
}

export function isSet(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Set]'
}

export function isMap(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Map]'
}
