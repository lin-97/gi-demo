export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}
