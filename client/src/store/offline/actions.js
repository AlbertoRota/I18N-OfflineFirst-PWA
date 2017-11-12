import db from '@/feathers/offline'

export default {
  setIsOffline ({ commit }, offlineStatus) {
    commit('setIsOffline', offlineStatus)
  },
  addOfflineOperation ({ rootState }, offlineOperation) {
    db.pendingActions.add({
      type: offlineOperation.type,
      payload: offlineOperation.payload,
      jwt: rootState.auth.accessToken
    }).then(
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register('offlineOperation')
      })
    )

  }
}
