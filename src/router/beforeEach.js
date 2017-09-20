import store from '../store'
import localforage from 'localforage'
import { hasIn } from 'lodash'

export const beforeEach = (to, from, next) => {
  if (hasIn(to.meta, 'needsAuth')) {
    // console.log('Authentication needed')
    checkAuthenticated(to, next)
      .then((message) => {
        // console.log('Authentication successful')
        next()
      })
      .catch(() => {
        // console.log('CheckAuthenticated failed')
        if (to.name !== 'logout') {
          localforage.setItem('intended', to.name)
          next({name: 'login'})
        }
        else {
          next({ name: 'index', params: { message: 'Ne is próbálkozz!' } })
        }
      })
  }
  else if (hasIn(to.meta, 'guest') && to.meta.guest) {
    if (to.name === 'login') {
      // console.log('Login jönne')
      checkAuthenticated(to, next)
        .then(() => {
          // console.log('De már be vagyunk jelentkezve')
          next({name: 'index'})
        })
        .catch(() => {
          // console.log('És nem vagyunk bejelentkezve')
          next()
        })
    }
    else {
      // console.log('Nem loginra megyünk')
      next()
    }
  }
  else {
    next()
  }
}

function checkAuthenticated (to, next) {
  return store.dispatch('auth/checkTokenExists')
    .then(() => {
      return store.dispatch('auth/fetchUser')
        .then(() => {
          return Promise.resolve('Fasza')
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    })
    .then((message) => {
      return Promise.resolve(message)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
