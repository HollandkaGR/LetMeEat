export const products = (state) => {
  return state.products
}

export const getCart = (state) => {
  return state.cart
}

export const cartItemCount = (state) => {
  return state.cart.length
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
