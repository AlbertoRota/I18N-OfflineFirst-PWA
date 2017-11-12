export default {
  toggleLoginMode (state) {
    state.mode = state.mode === 'SingUp' ? 'SingIn' : 'SingUp'
  }
}
