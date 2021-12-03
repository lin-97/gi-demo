// 用户信息

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
  storeUser(state) {
    return state.user
  }
}

const mutations = {
  // 设置用户信息
  storeSetUser(state, userInfo) {
    const { account, deptId, email, id, isAdmin, name, phone } = userInfo
    state.user = { account, deptId, email, id, isAdmin, name, phone }
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
