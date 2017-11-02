import {store} from '../store'

export default (to, from, next) => {
  if (store.getters['user/isLoggedIn']) {
    next()
  } else {
    next('/login')
  }
}
