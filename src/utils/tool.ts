/*
 * 节点默认命名, 包含'新建分类'
 * 如果同一个父节点，子节点存在['新建分类1', '新建分类4'], 那么在当前父节点新增一个子节点, 那么新增节点应为 '新建分类2'
 * 如果同一个父节点，子节点存在['新建分类2', '新建分类3'], 那么在当前父节点新增一个子节点, 那么新增节点应为 '新建分类1'
 */
export function getNewNodeName(arr: string[], name = '新建分类'): string {
  let num = 0
  for (let i = 0; i < arr.length + 1; i++) {
    if (arr.includes(`${name}${i + 1}`)) {
      continue
    } else {
      num = i + 1
      break
    }
  }
  return `${name}${num}`
}
