// import { groupBy } from 'lodash'

export const products = (state) => {
  return state.products
}

export const getCart = (state) => {
  return state.cart
}

export const getCartGroupByRestaurant = (state) => {
  let returnObj = {}
  state.cart.map(item => {
    let restName = item.restaurant
    returnObj = Object.assign({
      restaurant: restName,
      products: returnObj.products.push(item.product)
    })
  })
  console.log(returnObj)
}

export const cartItemCount = (state) => {
  return state.cart.length
}

export const cartTotal = (state) => {
  return state.cart.reduce((a, b) => {
    return a + b.product.price * b.quantity
  }, 0)
}
