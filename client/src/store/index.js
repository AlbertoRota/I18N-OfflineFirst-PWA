import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import i18n from './i18n'
import offline from './offline'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    i18n: i18n,
    offline: offline
  }
})
