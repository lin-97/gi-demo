// 用户信息
import { User } from '../../models/user'

const state = {
  user: JSON.parse(localStorage.getItem('USER')) || {
    account: '',
    deptId: '',
    email: '',
    id: '',
    isAdmin: false,
    name: '',
    phone: ''
  }
}

const getters = {
  // 获取用户信息
  storeUser(state: any) {
    return state.user
  }
}

const mutations = {
  // 设置用户信息
  storeSetUser(state: any, userInfo: User) {
    const { id, name, phone } = userInfo
    state.user = { id, name, phone }
    localStorage.setItem('USER', JSON.stringify(state.user))
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
