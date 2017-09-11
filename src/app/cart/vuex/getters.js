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
    let newObj = {
      name: restName,
      products: [{
        product: item.product,
        quantity: item.quantity
      }],
      subTotal: item.product.price * item.quantity
    }
    if (!returnObj.hasOwnProperty(restName)) {
      returnObj[restName] = newObj
    }
    else {
      returnObj[restName].products.push(newObj.products[0])
      returnObj[restName].subTotal += newObj.subTotal
    }
  })
  return returnObj
}

export const cartItemCount = (state) => {
  return state.cart.length
}

export const cartTotal = (state) => {
  return state.cart.reduce((a, b) => {
    return a + b.product.price * b.quantity
  }, 0)
}
