import { SessionStorage } from 'quasar'

export const fetchOrder = (state, order) => {
  state.order = order
}

export const setLastOrders = (state, lastOrders) => {
  state.lastOrders = lastOrders
}

export const storeOrder = (state) => {
  SessionStorage.set('order', state.order)
}

export const removeOrder = () => {
  SessionStorage.remove('order')
}

export const setCity = (state, city) => {
  state.order.city = city
}

export const setStreet = (state, street) => {
  state.order.street = street
}

export const resetStreet = (state) => {
  state.order.street = null
}

export const setHouseNumber = (state, houseNumber) => {
  state.order.houseNumber = houseNumber
}

export const resetHouseNumber = (state) => {
  state.order.houseNumber = null
}

export const resetAddress = (state) => {
  let newOrder = {
    city: null,
    street: null,
    houseNumber: null,
    description: null
  }
  state.order = Object.assign({}, state.order, newOrder)
}

export const setOrderDesc = (state, description) => {
  state.order.description = description
}

export const resetOrderDesc = (state) => {
  state.order.description = null
}
