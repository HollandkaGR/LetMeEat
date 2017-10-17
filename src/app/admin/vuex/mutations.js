export const setMyRestaurants = (state, restaurants) => {
  state.myRestaurants = restaurants
}

export const setSelectedRestaurant = (state, restaurant) => {
  state.selectedRestaurant = restaurant
}

export const resetSelectedRestaurant = (state) => {
  state.selectedRestaurant = {}
}
