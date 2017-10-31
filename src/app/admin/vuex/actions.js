import axios from 'axios'
import { SessionStorage } from 'quasar'
import { sessionVars } from 'helpers/config'

export const register = ({ dispatch }, { payload, context }) => {
}

export const fetchMyRestaurants = ({ commit }) => {
  return axios.get('restaurant/owned')
    .then(response => {
      commit('setMyRestaurants', response.data)
      return Promise.resolve()
    })
    .catch(error => {
      return Promise.reject(new Error(error))
    })
}

export const fetchPossibleCities = ({ commit }) => {
  return axios.get('restaurant/cities')
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(new Error(error))
    })
}

export const saveRestaurant = ({dispatch, state}, payload) => {
  return axios.post('restaurant/new', state.selectedRestaurant)
    .then(response => {
      dispatch('setSelectedRestaurant', response.data)
      return Promise.resolve()
    })
    .catch(error => {
      payload.context.errors = error.response.data.errors
      return Promise.reject(new Error(error))
    })
}

export const updateRestaurant = ({dispatch, state}, payload) => {
  return axios.patch('restaurant/update', payload.data)
    .then((response) => {
      dispatch('setSelectedRestaurant', response.data.data)
      return Promise.resolve(response.data.data)
    })
    .catch(error => {
      payload.context.errors = error.response.data.errors
      return Promise.reject(new Error(error))
    })
}

export const deleteRestaurant = ({ commit }, restId) => {
  return axios.delete('restaurant/delete/' + restId)
    .then(() => {
      commit('deleteRestaurant', restId)
      return Promise.resolve()
    })
    .catch(error => {
      return Promise.reject(new Error(error))
    })
}

export const unsetVars = ({ commit }) => {
  commit('unsetVars')
  return Promise.resolve()
}

export const isSelectedRestaurant = ({dispatch}) => {
  if (SessionStorage.has(sessionVars.selectedRest)) {
    dispatch('setSelectedRestaurant', SessionStorage.get.item(sessionVars.selectedRest))
  }
  return Promise.resolve()
}

export const setSelectedRestaurant = ({ commit }, restaurant) => {
  commit('setSelectedRestaurant', restaurant)
  return Promise.resolve()
}

export const fetchCategories = ({ commit }, payload) => {
  return axios.get('restaurant/categories/' + payload.restId)
    .then(response => {
      commit('setCategories', response.data)
      return Promise.resolve()
    })
    .catch(error => {
      return Promise.reject(new Error(error))
    })
}

export const isSelectedCategories = ({commit}) => {
  if (SessionStorage.has(sessionVars.selectedCat)) {
    commit('setCategoriesFromSession', SessionStorage.get.item(sessionVars.selectedCat))
  }
  return Promise.resolve()
}

export const newCategory = ({ commit }, payload) => {
  // console.log(payload)
  return axios.post('restaurant/categories/new', payload.data)
    .then(response => {
      commit('addCategory', response.data.data)
      return Promise.resolve()
    })
    .catch(error => {
      payload.context.errors = error.response.data.errors
      return Promise.reject(new Error(error))
    })
}

export const updateCategory = ({ commit }, payload) => {
  return axios.patch('restaurant/categories/update', payload.data)
    .then(response => {
      commit('modifyCategory', response.data.data)
      return Promise.resolve()
    })
    .catch(error => {
      payload.context.errors = error.response.data.errors
      return Promise.reject(new Error(error))
    })
}

export const deleteCategory = ({ commit }, payload) => {
  return axios.delete('restaurant/categories/delete/' + payload.catId)
    .then(response => {
      commit('removeCategory', payload.catId)
      return Promise.resolve()
    })
    .catch((error) => {
      console.log(error)
      return Promise.reject(new Error('Hiba a törlés során'))
    })
}

export const newProduct = ({ commit }, payload) => {
  return axios.post('restaurant/product/new', payload.data)
    .then(response => {
      commit('addProduct', response.data.data)
      return Promise.resolve()
    })
    .catch(error => {
      console.log(error)
      payload.context.errors = error.response.data.errors
      return Promise.reject(new Error(error))
    })
}

export const updateProduct = ({ commit }, payload) => {
  return axios.patch('restaurant/product/update', payload.data)
    .then(response => {
      commit('modifyProduct', response.data.data)
      return Promise.resolve()
    })
    .catch(error => {
      console.log(error)
      payload.context.errors = error.response.data.errors
      return Promise.reject(new Error(error))
    })
}

export const removeProduct = ({ commit }, payload) => {
  return axios.delete('restaurant/product/delete/' + payload.prodId)
    .then(response => {
      commit('removeProduct', payload)
      return Promise.resolve()
    })
    .catch(error => {
      console.log(error)
      return Promise.reject(new Error(error))
    })
}
