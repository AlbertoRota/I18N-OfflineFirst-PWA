import feathersClient from '@/feathers'

export default {
  populateData ({ commit }, translation) {
    commit('setIsLoading', true)
    feathersClient.service('translations').find()
      .then((response) => {
        console.log(response)
        commit('setTranslations', response.data)
        commit('clearError')
        commit('setIsLoading', false)
      })
      .catch((error) => {
        console.error(error)
        commit('setError', error)
        // TODO: Update store with new data
        commit('setIsLoading', false)
      })
  },
  createTranslation ({ commit }, translation) {
    commit('setIsLoading', true)
    feathersClient.service('translations').create(translation)
      .then((createdTranslation) => {
        commit('createTranslation', createdTranslation)
        commit('clearError')
        commit('setIsLoading', false)
      })
      .catch((error) => {
        console.error(error)
        commit('setError', error)
        commit('setIsLoading', false)
      })
  },
  updateTranslation ({ commit }, translation) {
    commit('setIsLoading', true)
    feathersClient.service('translations').update(translation._id, translation)
      .then((response) => {
        console.log(response)
        commit('updateTranslation', translation)
        commit('clearError')
        commit('setIsLoading', false)
      })
      .catch((error) => {
        console.error(error)
        commit('setError', error)
        commit('setIsLoading', false)
      })
  },
  deleteTranslation ({ commit }, translation) {
    commit('setIsLoading', true)
    feathersClient.service('translations').remove(translation._id)
      .then((response) => {
        console.log(response)
        commit('deleteTranslation', translation)
        commit('clearError')
        commit('setIsLoading', false)
      })
      .catch((error) => {
        console.error(error)
        commit('setError', error)
        commit('setIsLoading', false)
      })
  }
}
