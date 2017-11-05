import feathersClient from '@/feathers'

export default {
  toggleLoginMode ({ state, commit }) {
    if (state.mode === 'SingUp') {
      commit('setMode', 'SingIn')
    } else if (state.mode === 'SingIn') {
      commit('setMode', 'SingUp')
    }
  },
  clearError ({ commit }) {
    commit('clearError')
  },
  signUp ({ commit, dispatch }, user) {
    commit('setIsLoading', true)

    feathersClient.service('users').create(user)
      .then((response) => {
        dispatch('signIn', user)
      })
      .catch((error) => {
        if (error.key === user.email && error.errorType === 'uniqueViolated') {
          commit('setError', 'Email address already in use, use another or Sing In.')
        } else {
          console.log(error)
          commit('setError', error)
        }
        commit('setIsLoggedIn', false)
        commit('setIsLoading', false)
      })
  },
  signIn ({ commit }, user) {
    commit('setIsLoading', true)

    const payload = user ? Object.assign({ strategy: 'local' }, user) : {}
    feathersClient.authenticate(payload)
      .then((token) => {
        commit('clearError')
        commit('setIsLoggedIn', true)
        commit('setIsLoading', false)
      })
      .catch((error) => {
        if (error.type === 'FeathersError' && error.message === 'Invalid login') {
          commit('setError', 'Invalid eMail or password.')
        } else {
          console.log(error)
          commit('setError', error)
        }
        commit('setIsLoggedIn', false)
        commit('setIsLoading', false)
      })
  },
  autoSignIn ({ commit }) {
    commit('setIsLoading', true)
    feathersClient.authenticate({})
      .then((token) => {
        commit('setIsLoggedIn', true)
        commit('setIsLoading', false)
      })
      .catch((error) => {
        if (!error.message.includes('Could not find stored JWT')) {
          console.log(error)
          commit('setIsLoggedIn', false)
        }
        commit('setIsLoading', false)
      })
  },
  logOut ({ commit }) {
    commit('setIsLoading', true)
    feathersClient.logout()
      .then((response) => {
        console.log(response)
        commit('setIsLoggedIn', false)
        commit('setIsLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setIsLoggedIn', false)
        commit('setIsLoading', false)
      })
  }

}
