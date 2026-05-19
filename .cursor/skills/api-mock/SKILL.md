---
name: api-mock
description: 在本模板项目中新增或修改 API 接口、类型定义与 vite-plugin-mock 模拟数据。涉及 getBaseApi、http、baseAPI、mock 目录、分页响应格式时使用。
---

# API 与 Mock

## 接口层结构

每个业务模块一个文件，例如 `src/apis/system/user.ts`：

```ts
import { getBaseApi } from '@/apis/base'
import http from '@/utils/http'

export interface ListItem {
  id: string
  name: string
  status: Status
  createTime: string
  // ...
}

/** 标准 CRUD */
export const baseAPI = getBaseApi<ListItem>({ baseUrl: '/system/user' })

/** 非标准接口单独声明 */
export function getDictDataList(params: { code: string } & Pagination) {
  return http.get<PageRes<DictDataItem[]>>('/system/dict/getDictDataList', params)
}
```

## getBaseApi 约定路径

| 方法 | HTTP | 路径 |
|------|------|------|
| getList | GET | `{baseUrl}/getList` |
| getDetail | GET | `{baseUrl}/getDetail` |
| add | POST | `{baseUrl}/add` |
| update | POST | `{baseUrl}/update` |
| delete | POST | `{baseUrl}/delete` |

列表参数：`{ page, size, ...filters }`
删除参数：`{ ids: string[] }`

## 响应格式

```ts
// 单条/布尔
interface ApiRes<T> {
  code: number
  data: T
  message: string
  success: boolean
}

// 分页列表 data 结构
interface PageRes<T> {
  records: T
  total: number
}
```

`useTable` 同时兼容 `data` 为数组或 `PageRes` 两种形态。

## http 封装

- 实例：`src/utils/http.ts`，`baseURL` = `import.meta.env.VITE_API_PREFIX`
- 开发环境 `.env.development`：`VITE_API_PREFIX = '/mock'`
- Token：请求头 `token` 字段（`getToken()`）
- 业务失败：`success === false` 时 Message/Notification 提示并 reject
- 401：跳转 `/login`

```ts
import http from '@/utils/http'

http.get<PageRes<Item[]>>('/path', { page: 1, size: 10 })
http.post<boolean>('/path', { ids: ['1'] })
```

## Mock 开发流程

### 1. 静态数据

在 `mock/_data/` 下维护 JSON/TS 数据，如 `system_dict.ts`。

### 2. 路由 Mock

在 `mock/system/`（或对应模块）新建文件：

```ts
import { defineMock } from '../_base'
import { getBaseApi, getDelayTime, resultError, resultSuccess } from '../_utils'

export default defineMock([
  ...getBaseApi({
    baseUrl: '/system/xxx',
    getListData: () => resultSuccess({ total: list.length, records: list }),
    getDetailData: (query) => {
      const obj = list.find((i) => i.id === query.id)
      return obj ? resultSuccess(obj) : resultError(null, '未找到', 400)
    }
  }),
  {
    url: '/system/xxx/customAction',
    method: 'get',
    timeout: getDelayTime(),
    response: ({ query }) => {
      // 筛选、分页后返回
      return resultSuccess({ total, records })
    }
  }
])
```

### 3. 工具函数

| 函数 | 用途 |
|------|------|
| `resultSuccess(data)` | `{ code:200, success:true, data, message }` |
| `resultError(data, message, code?)` | 失败响应 |
| `getDelayTime()` | 50–300ms 随机延迟 |
| `getBaseApi({ baseUrl, getListData, ... })` | 生成标准 CRUD mock |

`defineMock` 会自动给 url 加前缀 `/mock`，与 `VITE_API_PREFIX` 对应。

### 4. 注册

确保 mock 文件被 `mock/index` 或同级聚合引入（遵循现有 `mock/system/*.ts` 模式）。

## 新增模块检查清单

- [ ] `src/apis/{module}/{name}.ts`：类型 + `baseAPI` 或自定义方法
- [ ] `mock/{module}/{name}.ts`：与接口路径一致
- [ ] 列表 Mock 返回 `{ total, records }`
- [ ] 字段类型与 `Status`、`Gender` 等全局类型对齐
- [ ] 在页面通过 `useTable({ listAPI, deleteAPI })` 接入

## 自定义 listAPI 示例

```ts
useTable({
  listAPI: (page) => getDictDataList({
    ...page,
    code: dictCode.value,
    name: query.name || undefined,
    status: query.status === '' ? undefined : query.status
  }),
  immediate: false
})
```

`immediate: false` 用于依赖左侧选中项后再 `search()` 的场景。
