import http from '@/utils/http'

interface DefaultP {
  GetListParams?: Record<string, any>
  GetDetailParams?: { id: string }
  AddParams?: Record<string, any>
  UpdateParams?: Record<string, any>
  DeleteParams?: { ids: string[] }
}

// 获取基础接口
export function getBaseApi<T, P extends DefaultP = DefaultP>(params: { baseUrl: string }) {
  const { baseUrl } = params

  const baseApi = {
    // 获取分页列表
    getList(params?: P['GetListParams'] & { page?: number, size?: number }) {
      return http.get<PageRes<T[]>>(`${baseUrl}/getList`, params)
    },
    // 获取详情
    getDetail(params: P['GetDetailParams']) {
      return http.get<T>(`${baseUrl}/getDetail`, params)
    },
    // 新增
    add(params: P['AddParams']) {
      return http.post<T>(`${baseUrl}/add`, params)
    },
    // 修改
    update(params: P['UpdateParams']) {
      return http.post<T>(`${baseUrl}/update`, params)
    },
    // 删除
    delete(params: P['DeleteParams']) {
      return http.post<boolean>(`${baseUrl}/delete`, params)
    }
  }

  return baseApi
}
