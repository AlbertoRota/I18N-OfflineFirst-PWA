export default {
  supportedLanguages (state) {
    return state.supportedLanguages
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
  }
}
