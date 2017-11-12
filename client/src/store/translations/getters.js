export default {
  supportedLanguages (state) {
    return [
      'en_EN',
      'es_ES',
      'fr_FR'
    ]
  },
  isOperationPending (state) {
    return state.isFindPending ||
      state.isGetPending ||
      state.isCreatePending ||
      state.isUpdatePending ||
      state.isPatchPending ||
      state.isRemovePending
  },
  errorOnOperation (state) {
    return state.errorOnFind ||
      state.errorOnGet ||
      state.errorOnCreate ||
      state.errorOnUpdate ||
      state.errorOnPatch ||
      state.errorOnRemove
  },
  currentCopy (state) {
    return state.copy
  }
}
