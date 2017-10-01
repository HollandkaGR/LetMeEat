export const getUser = (state) => {
  return state.user
}

export const userIsOwner = (state) => {
  if (state.user.data) {
    return state.user.data.isOwner
  }
  return false
}

export const getUsersName = (state) => {
  if (state.user.data) {
    return state.user.data.last_name + ' ' + state.user.data.first_name
  }
  return 'Nem azonosítható?!'
}
