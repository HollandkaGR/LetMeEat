import store from '../store'
import localforage from 'localforage'
import { hasIn } from 'lodash'
import { isAdminMenu, areWeAdmin } from './customRouteChecks'

export const beforeEach = (to, from, next) => {
  if (to.matched.some(m => m.meta.needsAuth)) {
    // console.log('Authentication needed')
    checkAuthenticated()
      .then(() => {
        // console.log('Authentication successful')
        if (isAdminMenu(to)) {
          // console.log('Admin menu')
          if (areWeAdmin()) {
            // console.log('Adminok vagyunk')
            next()
          }
          else {
            // console.log('Nem vagyunk adminok')
            next({
              name: 'index',
              params: {
                message: {
                  text: 'Nem vagy tulajdonos!',
                  type: 'warning'
                }
              }
            })
          }
        }
        else {
          next()
        }
      })
      .catch(() => {
        // console.log('CheckAuthenticated failed')
        if (to.name !== 'logout') {
          localforage.setItem('intended', to.name)
          next({name: 'login'})
        }
        else {
          next({
            name: 'index',
            params: {
              message: {
                text: 'Be sem vagy jelentkezve!',
                type: 'warning'
              }
            }
          })
        }
      })
  }
  else if (hasIn(to.meta, 'guest') && to.meta.guest) {
    if (to.name === 'login' || to.name === 'registration') {
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

function checkAuthenticated () {
  return store.dispatch('auth/checkTokenExists')
    .then(() => {
      return store.dispatch('auth/fetchUser')
        .then(() => {
          return Promise.resolve()
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    })
    .then(() => {
      return Promise.resolve()
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
