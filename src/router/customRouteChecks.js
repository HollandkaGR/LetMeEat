import store from '../store'

export const checkAuthenticated = () => {
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

export const isAdminMenu = (to) => {
  return to.matched.some(m => m.meta.adminMenu)
}

export const areWeAdmin = () => {
  return store.state.auth.user.data.isOwner
}
