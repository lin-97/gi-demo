export interface UserInfo {
  name: string
  avatar: string
  email: string
  phone: string
  registrationDate: string
  accountId: string
  role: string
}

export interface LoginRes {
  token: string
  userInfo: UserInfo
}
