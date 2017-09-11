import { SessionStorage } from 'quasar'

export const setProducts = (state, products) => {
  state.products = products
}

export const setCart = (state, items) => {
  state.cart = items
}

export const addToCart = (state, {restaurant, product, quantity}) => {
  const exists = state.cart.find((item) => {
    return item.product.id === product.id
  })

  if (exists) {
    exists.quantity += quantity
  }
  else {
    state.cart.push({
      restaurant,
      product,
      quantity
    })
  }
  SessionStorage.set('cart', state.cart)
}

export const removeProductFromCart = (state, {productId, quantity}) => {
  const exists = state.cart.find((item) => {
    return item.product.id === productId
  })

  if (exists.quantity > quantity) {
    exists.quantity -= quantity
  }
  else {
    state.cart = state.cart.filter((item) => {
      return item.product.id !== productId
    })
  }
  SessionStorage.set('cart', state.cart)
}

export const clearCartMutation = (state) => {
  state.cart = []
}
