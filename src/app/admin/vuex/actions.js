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
