import axios from 'axios'

export const fetchEttermek = ({dispatch}) => {
  // return axios.get('/api/ettermek').then(response => {
  //   commit('setEttermek', response.data.data)
  // }).catch((errors) => {
  //   return Promise.reject(new Error('Csatlakozási hiba'))
  // })
  let ettermek = [
    {
      id: 1,
      name: 'Pizzaboy',
      categories: ['Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'],
      img: '1600x900.png',
      rating: 1,
      open: '16:00',
      close: '16:17',
      isOpen: false
    },
    {
      id: 2,
      name: 'Flekken',
      categories: ['Levesek', 'Előételek', 'Pizzák'],
      img: '1600x900.png',
      rating: 2,
      open: '9:30',
      close: '21:30',
      isOpen: false
    },
    {
      id: 3,
      name: 'Aranygaluska',
      categories: ['Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'],
      img: '1600x900.png',
      rating: 4,
      open: '9:30',
      close: '22:30',
      isOpen: false
    },
    {
      id: 4,
      name: 'Apolló étterem',
      categories: ['Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'],
      img: '1600x900.png',
      rating: 3,
      open: '9:30',
      close: '22:00',
      isOpen: false
    },
    {
      id: 5,
      name: 'Főnix pizzéria',
      categories: ['Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'],
      img: '1600x900.png',
      rating: 3,
      open: '9:30',
      close: '22:00',
      isOpen: false
    }
  ]
  // let delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time))
  dispatch('setEttermek', ettermek)
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
