import { isEmpty } from 'lodash'
import { setHttpToken } from './../../../helpers'
import router from './../../../router'
import localforage from 'localforage'
import axios from 'axios'

export const register = ({ dispatch }, { payload, context }) => {
  return axios.post('/register', payload).then(response => {
    return dispatch('setToken', response.data.meta.token).then(() => {
      dispatch('fetchUser')
    }).then(() => {
      return Promise.resolve(response.data.data.first_name)
    })
  }).catch((errors) => {
    context.errors = errors.response.data.errors
    return Promise.reject(new Error('Regisztrációs hiba!'))
  })
}

export const login = ({ dispatch, state }, { payload, context }) => {
  return axios.post('/api/login', payload)
    .then(response => {
      dispatch('setToken', response.data.meta.token)
      return dispatch('fetchUser')
        .then(() => {
          if (isEmpty(this.errors)) {
            return localforage.getItem('intended').then((name) => {
              if (isEmpty(name)) {
                router.replace({ name: 'index' })
              }
              else {
                localforage.removeItem('intended')
                router.replace({ name: name })
              }
            })
          }
        })
        .then(() => {
          return Promise.resolve(response.data.data)
        })
    }).catch((errors) => {
      if (errors.response.data.errors !== null) {
        context.errors = errors.response.data.errors
      }
      else {
        return Promise.reject(new Error('Kapcsolódási hiba, próbálja később!'))
      }
    })
}

export const updateUser = ({ commit }, { payload, context }) => {
  return axios.post('/user/update', payload)
    .then((response) => {
      commit('setUserData', response.data.data)
      return Promise.resolve()
    }).catch((errors) => {
      context.errors = errors.response.data.errors
      return Promise.reject(new Error('Módosítási hiba!'))
    })
}

export const logout = ({ dispatch }) => {
  return axios
    .post('/api/logout')
    .then(() => {
      dispatch('clearAuth')
    })
    .catch(() => {
      dispatch('clearAuth')
    })
}

export const fetchUser = ({commit, dispatch}) => {
  return axios.get('/api/me').then((response) => {
    commit('setAuthenticated', true)
    commit('setUserData', response.data.data)
    return Promise.resolve(response.data.data)
  }).catch(() => {
    dispatch('clearAuth')
    return Promise.reject(new Error('Token expired'))
  })
}

export const setToken = ({ commit, dispatch }, token) => {
  if (isEmpty(token)) {
    return dispatch('checkTokenExists').then((token) => {
      setHttpToken(token)
    })
  }
  commit('setToken', token)
  setHttpToken(token)
}

export const checkTokenExists = ({ commit, dispatch }, token) => {
  return localforage.getItem('authToken').then((token) => {
    if (isEmpty(token)) {
      return Promise.reject(new Error('NO_STORAGE_TOKEN'))
    }
    return Promise.resolve(token)
  })
}

export const clearAuth = ({ commit }) => {
  commit('setAuthenticated', false)
  commit('setUserData', null)
  commit('setToken', null)
  setHttpToken(null)
}
