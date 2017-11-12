import {store} from '../store'

export default (to, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    next()
  } else {
    next('/login')
  }
}
