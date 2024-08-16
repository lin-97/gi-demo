export interface UserInfoResult {
  id: string
  nickname: string
  avatar: string
  roles: string[]
  permissions: string[]
}

export interface UserLoginResult {
  token: string
}
