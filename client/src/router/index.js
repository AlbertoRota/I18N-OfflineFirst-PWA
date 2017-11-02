import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import LogIn from '@/components/user/LogIn'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    }
  ]
})
