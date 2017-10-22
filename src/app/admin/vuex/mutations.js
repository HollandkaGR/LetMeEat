import Vue from 'vue'

export const setMyRestaurants = (state, restaurants) => {
  state.myRestaurants = restaurants
}

export const setSelectedRestaurant = (state, restaurant) => {
  state.selectedRestaurant = restaurant
}

export const resetSelectedRestaurant = (state) => {
  state.selectedRestaurant = {}
}

export const setCategories = (state, categories) => {
  Vue.set(state.selectedRestaurant, 'categories', categories)
  // state.selectedRestaurant.categories = categories
}

export const addCategory = (state, category) => {
  if (typeof state.selectedRestaurant.categories === 'undefined') {
    state.selectedRestaurant.categories = []
  }
  state.selectedRestaurant.categories.push(category)
}
