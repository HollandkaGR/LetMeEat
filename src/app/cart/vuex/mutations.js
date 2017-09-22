import { SessionStorage } from 'quasar'

export const setProducts = (state, products) => {
  state.products = products
}

export const setCart = (state, items) => {
  state.cart = items
}

export const addToCart = (state, {cart}) => {
  state.cart = Object.assign({}, state.cart, cart)
  SessionStorage.set('cart', cart)
}

export const removeProductFromCart = (state, { cart }) => {
  state.cart = Object.assign({}, cart)
  SessionStorage.set('cart', cart)
}

export const setOrderDesc = (state, { cart }) => {
  state.cart = Object.assign({}, cart)
  SessionStorage.set('cart', cart)
}

export const clearCartMutation = (state) => {
  state.cart = []
}
