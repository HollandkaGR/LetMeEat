import store from '../store'

export const isAdminMenu = (to) => {
  return to.matched.some(m => m.meta.adminMenu)
}

export const areWeAdmin = () => {
  return store.state.auth.user.data.isOwner
}
