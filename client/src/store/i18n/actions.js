export default {
  i18nAction ({ commit }, i18nId) {
    setTimeout(() => {
      commit('i18nMutation', i18nId)
    }, 1000)
  }
}
