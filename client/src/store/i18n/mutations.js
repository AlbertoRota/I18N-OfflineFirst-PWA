export default {
  setTranslations (state, translations) {
    state.translations = translations
  },
  createTranslation (state, translationToCreate) {
    state.translations.push(translationToCreate)
  },
  updateTranslation (state, translationToUpdate) {
    const index = state.translations.findIndex((translation) => translation._id === translationToUpdate._id)
    state.translations = [
      ...state.translations.slice(0, index),
      translationToUpdate,
      ...state.translations.slice(index + 1)
    ]
  },
  deleteTranslation (state, translationToRemove) {
    state.translations = state.translations.filter((translation) => translation._id !== translationToRemove._id)
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  }
}
