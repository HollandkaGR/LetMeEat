import axios from 'axios'
import restaurant from 'src/helpers/restaurant.json'

export const fetchEttermek = ({dispatch}) => {
  // return axios.get('/api/ettermek').then(response => {
  //   commit('setEttermek', response.data.data)
  // }).catch((errors) => {
  //   return Promise.reject(new Error('Csatlakozási hiba'))
  // })

  // let delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time))
  dispatch('setEttermek', restaurant)
    .then(() => {
      return Promise.resolve()
    })
    .catch(() => {
      console.log('actions/fetchEttermek hiba')
    })
}

export const setEttermek = ({commit}, payload) => {
  commit('setEttermek', payload)
}

export const resetEttermek = ({commit}) => {
  return commit('resetEttermek')
}

export const setSelectedEtterem = ({commit}, etterem) => {
  return commit('setSelectedEtterem', etterem)
}

export const searchForEtterem = ({commit, state}, searchString) => {
  let filteredEttermek = state.ettermek.filter(etterem => {
    return etterem.name.toUpperCase().includes(searchString.toUpperCase())
  })
  if (filteredEttermek) {
    commit('setFilteredEttermek', filteredEttermek)
  }
  else {
    commit('resetFilteredEttermek')
  }
}

export const fetchProducts = ({commit}, payload) => {
  return axios.get('/api/products/' + payload.restId).then(response => {
    return Promise.resolve(response.data)
  }).catch((errors) => {
    return Promise.reject(new Error('Csatlakozási hiba'))
  })
}
