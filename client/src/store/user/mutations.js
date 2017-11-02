export default {
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setMode (state, mode) {
    state.mode = mode
  },
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  },
  setIsLoggedIn (state, logInStatus) {
    state.isLoggedIn = logInStatus
  }
}
