import Vue from 'vue'
import { SessionStorage } from 'quasar'
import { sessionVars } from 'helpers/config'

export const setMyRestaurants = (state, restaurants) => {
  state.myRestaurants = restaurants
}

export const setSelectedRestaurant = (state, restaurant) => {
  state.selectedRestaurant = restaurant
  SessionStorage.set(sessionVars.selectedRest, restaurant)
}

export const deleteRestaurant = (state, restId) => {
  state.myRestaurants = state.myRestaurants.filter(rest => rest.id !== restId)
}

export const unsetVars = (state) => {
  state.selectedRestaurant = {}
  SessionStorage.remove(sessionVars.selectedRest)
  state.selectedCategories = {}
  SessionStorage.remove(sessionVars.selectedCat)
}

export const setCategories = (state, categories) => {
  let remappedCats = {}
  categories.map(category => {
    remappedCats[category.id] = category
  })
  Vue.set(state, 'selectedCategories', remappedCats)
  SessionStorage.set(sessionVars.selectedCat, state.selectedCategories)
}

export const setCategoriesFromSession = (state, categories) => {
  Vue.set(state, 'selectedCategories', categories)
}

export const addCategory = (state, category) => {
  category.products = []
  Vue.set(state.selectedCategories, category.id, category)
  SessionStorage.set(sessionVars.selectedCat, state.selectedCategories)
}

export const modifyCategory = (state, category) => {
  state.selectedCategories[category.id] = Object.assign(state.selectedCategories[category.id], category)
  SessionStorage.set(sessionVars.selectedCat, state.selectedCategories)
}

export const removeCategory = (state, categoryId) => {
  let newCats = state.selectedCategories
  delete newCats[categoryId]
  state.selectedCategories = Object.assign({}, newCats)
  SessionStorage.set(sessionVars.selectedCat, state.selectedCategories)
}

export const addProduct = (state, product) => {
  state.selectedCategories[product.category_id].products.push(product)
  SessionStorage.set(sessionVars.selectedCat, state.selectedCategories)
}

export const modifyProduct = (state, product) => {
  let products = state.selectedCategories[product.category_id].products
  products.forEach((prod, prodIndex) => {
    if (prod.id === product.id) {
      Vue.set(products, prodIndex, product)
    }
  })
  SessionStorage.set(sessionVars.selectedCat, state.selectedCategories)
}

export const removeProduct = (state, { prodId, catId }) => {
  let prods = state.selectedCategories[catId].products
  state.selectedCategories[catId].products = Object.assign({}, prods.filter(prod => prod.id !== prodId))
  SessionStorage.set(sessionVars.selectedCat, state.selectedCategories)
}
