export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  getters: {
    isLoggedIn (state) {
      return !!state.accessToken
    },
    errorOnOperation (state) {
      return state.errorOnAuthenticate || state.errorOnLogout
    },
    isOperationPending (state) {
      return state.isAuthenticatePending
    },
    mode (state) {
      return state.mode
    }
  }
}
