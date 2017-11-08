import Vue from 'vue'
import Vuex from 'vuex'

import offline from './offline'
import translations from './translations'
import auth from './auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    offline: offline
  },
  plugins: [
    translations,
    auth
  ]
})
