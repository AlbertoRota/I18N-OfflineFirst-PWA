import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import feathersVuex from 'feathers-vuex'
import feathersClient from '@/feathers'

const { auth } = feathersVuex(feathersClient)

export default auth({
  state: state,
  // TODO: Getters are not being loaded, fix it ans send a PullRequest
  getters: getters,
  mutations: mutations,
  actions: actions
})
