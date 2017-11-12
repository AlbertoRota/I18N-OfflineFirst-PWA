import Vue from 'vue'
import Router from 'vue-router'
import I18NPage from '@/components/i18n/I18NPage'
import LogIn from '@/components/user/LogIn'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'I18NPage',
      component: I18NPage,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    }
  ]
})
