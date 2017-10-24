import Vue from 'vue'
import { isEmpty } from 'lodash'

export const setMyRestaurants = (state, restaurants) => {
  state.myRestaurants = restaurants
}

export const setSelectedRestaurant = (state, restaurant) => {
  state.selectedRestaurant = restaurant
}

export const deleteRestaurant = (state, restId) => {
  state.myRestaurants = state.myRestaurants.filter(rest => rest.id !== restId)
}

export const resetSelectedRestaurant = (state) => {
  state.selectedRestaurant = {}
}

export const setCategories = (state, categories) => {
  Vue.set(state.selectedRestaurant, 'categories', categories)
  // state.selectedRestaurant.categories = categories
}

export const addCategory = (state, category) => {
  category.products = []
  if (typeof state.selectedRestaurant.categories === 'undefined') {
    state.selectedRestaurant.categories = []
  }
  state.selectedRestaurant.categories.push(category)
}

export const modifyCategory = (state, category) => {
  let categories = state.selectedRestaurant.categories
  categories.forEach((element, index) => {
    if (element.id === category.id) {
      categories[index].name = category.name
    }
  })
}

export const removeCategory = (state, categoryToDelete) => {
  state.selectedRestaurant.categories = state.selectedRestaurant.categories.filter(function (category) {
    return category.id !== categoryToDelete
  })
}

export const addProduct = (state, product) => {
  state.selectedRestaurant.categories.find(category => {
    if (category.id === product.category_id) {
      if (isEmpty(category.products)) {
        category.products = []
      }
      category.products.push(product)
    }
  })
}
