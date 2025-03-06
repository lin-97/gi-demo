/** Token 存储键名 */
const TOKEN_KEY = 'token'

/**
 * 检查用户是否已登录
 * @description 通过检查 localStorage 中是否存在 token 来判断用户登录状态
 * @returns {boolean} 是否已登录
 */
const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

/**
 * 获取用户 Token
 * @description 从 localStorage 中获取存储的 token
 * @returns {string | null} 用户 token，未登录时返回 null
 */
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置用户 Token
 * @description 将用户 token 存储到 localStorage 中
 * @param token - 用户 token
 */
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 清除用户 Token
 * @description 从 localStorage 中移除用户 token
 */
const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export { isLogin, getToken, setToken, clearToken }
