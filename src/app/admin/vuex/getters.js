export const getMyRestaurants = (state) => {
  return state.myRestaurants
}

// Az id-t már a return statementnek adjuk
export const getRestaurant = (state) => (id) => {
  return state.myRestaurants.find(restaurant => {
    return restaurant.id === id
  })
}

export const getSelectedRestaurant = (state) => {
  return state.selectedRestaurant
}

export const getSelectedRestId = (state) => {
  return state.selectedRestaurant.id
}

export const getCategories = (state) => {
  let categories = state.selectedRestaurant.categories
  return typeof categories !== 'undefined' ? categories : null
}
