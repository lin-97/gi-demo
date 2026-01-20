// 辅助类型：获取所有类型的键的联合
type AllKeys<T> = T extends any ? keyof T : never

// 辅助类型：获取属性在所有类型中的联合类型
type UnionType<T, K extends PropertyKey> = T extends any
  ? K extends keyof T
    ? T[K]
    : never
  : never

// 合并多个类型，同名属性转为联合类型
export type MergeMultiple<T extends any[]> = {
  [K in AllKeys<T[number]>]: UnionType<T[number], K>
}
