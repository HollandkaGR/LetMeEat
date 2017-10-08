export const getMyRestaurants = (state) => {
  return state.myRestaurants
}

// Az id-t már a return statementnek adjuk
export const getRestaurant = (state) => (id) => {
  return state.myRestaurants.find(restaurant => {
    return restaurant.id === id
  })
}
