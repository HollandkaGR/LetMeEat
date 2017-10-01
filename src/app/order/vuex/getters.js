export const getOrderAddress = (state) => {
  return state.order
}

export const orderSubmitable = (state) => {
  return state.order.city !== null && state.order.street !== null && state.order.houseNumber !== null
}

export const isCitySelected = (state) => {
  return state.order.city !== null
}

export const getCity = (state) => {
  return state.order.city
}

export const isStreetSelected = (state) => {
  return state.order.street !== null
}

export const getStreet = (state) => {
  return state.order.street
}

export const isHouseNumberSelected = (state) => {
  return state.order.houseNumber !== null
}

export const getHouseNumber = (state) => {
  return state.order.houseNumber
}

export const getOrderDesc = (state) => {
  return state.order.description
}
