export default {
  offlineAction ({ commit }, offlineId) {
    setTimeout(() => {
      commit('offlineMutation', offlineId)
    }, 1000)
  }
}
