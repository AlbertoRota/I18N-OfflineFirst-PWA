import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import feathersVuex from 'feathers-vuex'
import feathersClient from '@/feathers'

const { service } = feathersVuex(feathersClient)

export default service('translations', {
  idField: '_id',
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})
