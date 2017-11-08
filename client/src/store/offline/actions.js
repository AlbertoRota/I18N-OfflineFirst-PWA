import db from '../../feathers/offline'

export default {
  setIsOffline ({ commit }, offlineStatus) {
    commit('setIsOffline', offlineStatus)
  },
  addOfflineOperation ({ commit }, offlineOperation) {
    db.pendingActions.add({type: offlineOperation.type, payload: offlineOperation.payload})
  }
}
