import { createStore } from 'vuex'

import app from './modules/app'
import user from './modules/user'

export const store = createStore({
  modules: {
    app,
    user
  }
})

export default store
