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

export const addProductToCart = ({ commit, state }, {restaurant, product, quantity}) => {
  const identifyBy = restaurant.id
  let cart = state.cart
  let etterem = {}

  // Ha nincs még ilyen étterem, létrehozzuk 
  if (!cart.hasOwnProperty(identifyBy)) {
    // console.log('Új étterem')
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
    // console.log('Van már ilyen étterem')
    etterem = state.cart[identifyBy]

    let exists = etterem.products.find((item) => {
      return item.product.id === product.id
    })

    // Ha van már ilyen termék, növeljük a mennyiségét
    if (exists) {
      exists.quantity += quantity
    }
    // Egyébként hozzáadjuk a termékekhez
    else {
      etterem.products.push({
        product,
        quantity
      })
    }

    etterem.subTotal += product.price * quantity
    console.log('ok')
  }
  cart[identifyBy] = etterem
  return commit('addToCart', { cart })
}

export const removeProductFromCart = ({ commit, state }, {restaurant, productId, quantity}) => {
  let cart = state.cart
  let etterem = cart[restaurant.id]

  // Megkeressük a törölni kívánt terméket
  const exists = etterem.products.find((item) => {
    return item.product.id === productId
  })

  // Ha a törlendő mennyiség nem nagyobb a jelenleginél, akkor csak kivonjuk és az étteremhez tartozó subTotalt módosítjuk
  if (exists.quantity > quantity) {
    exists.quantity -= quantity
    etterem.subTotal -= exists.product.price * quantity
  }
  // Egyébként törölnünk kell a terméket
  else {
    etterem.products = etterem.products.filter((item) => {
      return item.product.id !== productId
    })
    // Vizsgáljuk, hogy a törölendő terméketn kívül van-e más is az étteremből, ha van akkor csak subTotalt módosítunk
    if (etterem.products.length > 0) {
      // console.log('Van még termék')
      etterem.subTotal -= exists.product.price * quantity
    }
    // Egyébként töröljük az éttermet
    else {
      // console.log('étterem törlés')
      delete cart[etterem.restaurant.id]
    }
  }
  return commit('removeProductFromCart', { cart })
}

export const clearCartAction = ({commit}) => {
  commit('clearCartMutation')
}
