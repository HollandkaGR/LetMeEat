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

export const saveRestaurant = ({commit}, payload) => {
  return axios.post('restaurant/new', payload.data)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      payload.context.errors = error.response.data
      return Promise.reject(new Error(error))
    })
}
