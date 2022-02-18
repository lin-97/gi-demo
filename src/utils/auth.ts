const isLogin = (): boolean => {
  return !!localStorage.getItem('token')
}

const getToken = (): string | null => {
  return localStorage.getItem('token')
}

const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

const clearToken = (): void => {
  localStorage.removeItem('token')
}

export { isLogin, getToken, setToken, clearToken }
