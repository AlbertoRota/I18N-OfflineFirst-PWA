import Vue from 'vue'
import Vuex from 'vuex'

import offline from './offline'
import translations from './translations'
import auth from './auth'
import authGettersFix from './authGettersFix'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    offline: offline,
    auth: authGettersFix
  },
  plugins: [
    translations,
    auth
  ]
})
