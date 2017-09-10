import axios from 'axios'
import { SessionStorage } from 'quasar'

export const getProducts = ({ commit }) => {
  return axios.get('/products').then((response) => {
    commit('setProducts', response.data)
    return Promise.resolve()
  })
}

export const fetchCart = ({ commit }) => {
  if (SessionStorage.has('cart')) {
    let cart = SessionStorage.get.item('cart')
    commit('setCart', cart)
  }

  // return axios.get('/cart').then((response) => {
  //   commit('setCart', response.data)
  //   return Promise.resolve()
  // })
}

export const addProductToCart = ({ commit, dispatch }, {product, quantity}) => {
  commit('addToCart', {product, quantity})
  // return axios.post('/cart', {
  //   product_id: product.id,
  //   quantity
  // }).catch(() => {
  //   dispatch('getCart')
  // })
}

export const removeProductFromCart = ({ commit, dispatch }, {productId, quantity}) => {
  return commit('removeProductFromCart', {productId, quantity})

  // return axios.delete('/cart/' + productId).catch(() => {
  //   dispatch('getCart')
  // })
}

export const clearCartAction = ({commit}) => {
  commit('clearCartMutation')
}
