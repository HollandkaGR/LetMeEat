import axios from 'axios'

export const setOrderModalRef = ({commit}, modalRef) => {
  commit('setOrderModalRef', modalRef)
}

export const fetchEttermek = ({dispatch, commit}) => {
  return axios.get('/api/ettermek').then(response => {
    dispatch('setEttermek', response.data.data)
    commit('setTimestamp', response.data.timestamp)
    return Promise.resolve()
  }).catch((errors) => {
    return Promise.reject(new Error('Csatlakozási hiba'))
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
