import Cookies from 'js-cookie'

const TokenKey: string = 'Authorization'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function checkToken(): boolean {
  if (Cookies.get(TokenKey)) {
    return true
  } else {
    return false
  }
}
