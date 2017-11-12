import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'

import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
