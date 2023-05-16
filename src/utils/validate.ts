/** 判断path是否为外链 */
export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

/** 判断url是否是http或https */
export function isHttp(url: string) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}
