// import axios from 'axios'
import { SessionStorage } from 'quasar'
import lastOrders from 'src/helpers/orders.json'

export const fetchOrder = ({ commit }) => {
  if (SessionStorage.has('order')) {
    commit('fetchOrder', SessionStorage.get.item('order'))
  }
}

export const fetchLastOrders = ({ commit }) => {
  if (!SessionStorage.has('lastOrders')) {
    commit('setLastOrders', lastOrders)
  }
}

export const setCity = ({ commit }, city) => {
  commit('setCity', city)
  commit('storeOrder')
}

export const setStreet = ({ commit }, street) => {
  commit('setStreet', street)
  commit('storeOrder')
}

// Ha az utcánál nyomjuk a gombot
export const resetStreet = ({ commit }) => {
  commit('resetStreet')
  commit('resetHouseNumber')
  commit('resetOrderDesc')
  commit('storeOrder')
}

export const setHouseNumber = ({ commit }, houseNumber) => {
  commit('setHouseNumber', houseNumber)
  commit('storeOrder')
}

// Ha várost váltunk
export const resetAddress = ({ commit }) => {
  commit('resetAddress')
  commit('storeOrder')
}

export const setOrderDesc = ({ commit }, description) => {
  commit('setOrderDesc', description)
  commit('storeOrder')
}
