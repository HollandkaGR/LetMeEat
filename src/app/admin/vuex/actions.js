import axios from 'axios'

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
      payload.context.errors = error.response.data
      return Promise.reject(new Error(error))
    })
}

export const updateRestaurant = ({dispatch, state}, payload) => {
  return axios.post('restaurant/update', state.selectedRestaurant)
    .then((response) => {
      dispatch('setSelectedRestaurant', response.data.data)
      return Promise.resolve()
    })
    .catch(error => {
      payload.context.errors = error.response.data
      return Promise.reject(new Error(error))
    })
}

export const deleteRestaurant = ({ dispatch }, restId) => {
  return axios.post('restaurant/delete', restId)
    .then(() => {
      return Promise.resolve()
    })
    .catch(error => {
      return Promise.reject(new Error(error))
    })
}

export const resetSelectedRestaurant = ({ commit }) => {
  commit('resetSelectedRestaurant')
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

export const newCategory = ({ commit }, payload) => {
  console.log(payload)
  return axios.post('restaurant/categories/new', payload)
    .then(response => {
      commit('addCategory', response.data)
      return Promise.resolve()
    })
    .catch(error => {
      return Promise.reject(new Error(error))
    })
}
