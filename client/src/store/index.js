import Vue from 'vue'
import Vuex from 'vuex'

import offline from './offline'

import feathersVuex from 'feathers-vuex'
import feathersClient from '@/feathers'

const { service, auth } = feathersVuex(feathersClient)

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    offline: offline
  },
  plugins: [
    service('translations', {
      idField: '_id',
      state: {
        supportedLanguages: [
          'en_EN',
          'es_ES',
          'fr_FR'
        ]
      },
      getters: {
        supportedLanguages (state) {
          return state.supportedLanguages
        },
        isOperationPending (state) {
          return state.isFindPending ||
            state.isGetPending ||
            state.isCreatePending ||
            state.isUpdatePending ||
            state.isPatchPending ||
            state.isRemovePending
        },
        errorOnOperation (state) {
          return state.errorOnFind ||
            state.errorOnGet ||
            state.errorOnCreate ||
            state.errorOnUpdate ||
            state.errorOnPatch ||
            state.errorOnRemove
        }
      },
      mutations: {},
      actions: {}
    }),

    auth({
      state: {
        mode: 'SingUp'
      },
      // TODO: Getters are not being loaded, fix it ans send a PullRequest
      getters: {
        isLoggedIn (state) {
          return !!state.accessToken
        },
        errorOnOperation (state) {
          return state.errorOnAuthenticate || state.errorOnAuthenticate
        },
        isOperationPending (state) {
          return state.isAuthenticatePending
        },
        mode (state) {
          return state.mode
        }
      },
      mutations: {
        toggleLoginMode (state) {
          state.mode = state.mode === 'SingUp' ? 'SingIn' : 'SingUp'
        }
      },
      actions: {
        toggleLoginMode ({ commit }) {
          commit('toggleLoginMode', 'SingIn')
        }
      }
    })
  ]
})
