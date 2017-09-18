import { SessionStorage } from 'quasar'
import Vue from 'vue'

export const setProducts = (state, products) => {
  state.products = products
}

export const setCart = (state, items) => {
  state.cart = items
}

export const addToCart = (state, {restaurant, product, quantity}) => {
  // Ha nincs még ilyen étterem, létrehozzuk
  let identifyBy = restaurant.id
  let etterem = {}

  if (!state.cart.hasOwnProperty(identifyBy)) {
    etterem = {
      restaurant,
      products: [{
        product,
        quantity
      }],
      subTotal: product.price * quantity
    }
  // Ha van, akkor a productsoknál vizsgáljuk, hogy az adott termék már a kosárban van-e
  }
  else {
    etterem = state.cart[identifyBy]

    const exists = etterem.products.find((item) => {
      return item.product.id === product.id
    })

    if (exists) {
      exists.quantity += quantity
    }
    else {
      etterem.products.push({
        product,
        quantity
      })
    }

    etterem.subTotal += product.price * quantity
  }
  Vue.set(state.cart, identifyBy, etterem)
  SessionStorage.set('cart', state.cart)
}

export const removeProductFromCart = (state, {restaurant, productId, quantity}) => {
  let etterem = state.cart[restaurant.id]

  const exists = etterem.products.find((item) => {
    return item.product.id === productId
  })

  if (exists.quantity > quantity) {
    exists.quantity -= quantity
    etterem.subTotal -= exists.product.price * quantity
  }
  else {
    etterem.products = etterem.products.filter((item) => {
      return item.product.id !== productId
    })

    if (etterem.products.length === 0) {
      delete state.cart[etterem.restaurant.id]
    }
    else {
      etterem.subTotal -= exists.product.price * quantity
      state.cart[restaurant.id] = etterem
    }
  }

  SessionStorage.set('cart', state.cart)
}

export const clearCartMutation = (state) => {
  state.cart = []
}
