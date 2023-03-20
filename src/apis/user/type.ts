export interface UserInfo {
  name: string
  avatar: string
}

export interface LoginRes {
  token: string
  userInfo: UserInfo
}
