import moment from 'moment'

export const getEttermek = (state) => {
  return state.ettermek
}

export const getSelectedEtterem = (state) => {
  return state.selectedEtterem
}

export const getServerTimestamp = (state) => {
  return state.timestamp
}

export const getCurrentDay = (state) => {
  return moment.unix(state.timestamp).weekday() - 1
}

export const getOrderModalRef = (state) => {
  return state.orderModalRef
}
