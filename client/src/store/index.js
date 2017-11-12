import Vue from 'vue'
import Vuex from 'vuex'

import offline from './offline'
import authGettersFix from './authGettersFix'

import translations from './translations'
import auth from './auth'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    offline: offline,
    auth: authGettersFix
  },
  plugins: [
    translations,
    auth,
    createPersistedState()
  ]
})
