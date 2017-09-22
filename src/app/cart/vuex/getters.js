export const products = (state) => {
  return state.products
}

export const getCart = (state) => {
  return state.cart
}

export const getRestNumber = (state) => {
  return Object.keys(state.cart).length
}

export const cartItemCount = (state) => {
  let itemCount = 0
  for (let etterem in state.cart) {
    itemCount += state.cart[etterem].products.length
  }
  return itemCount
}

export const cartTotal = (state) => {
  let total = 0
  for (let etterem in state.cart) {
    total += state.cart[etterem].products.reduce((a, b) => {
      return a + b.product.price * b.quantity
    }, 0)
  }
  return total
}

export const getRestOrderDesc = (state) => {
  let orderDescs = {}
  for (let [k, v] of Object.entries(state.cart)) {
    orderDescs[k] = v.orderDesc
  }
  return orderDescs
}
