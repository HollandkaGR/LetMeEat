import { isEmpty } from 'lodash'
import { Loading, QSpinnerFacebook } from 'quasar'
import { Popup } from './toaster'

export const setHttpToken = token => {
  if (window.axios == null) {
    window.axios = require('axios')
  }
  if (isEmpty(token)) {
    window.axios.defaults.headers.common['Authorization'] = null
  }
  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const showLoadingScreen = () => {
  return Loading.show({
    spinner: QSpinnerFacebook,
    spinnerSize: 250,
    spinnerColor: 'white'
  })
}

export const showPopup = (message, type) => {
  return new Popup(message, type)
}

export const productCounter = () => {
  let resultArray = []
  for (var i = 1; i <= 5; i++) {
    resultArray.push({
      label: i + '',
      value: i + ''
    })
  }
  return resultArray
}

export const sampleFromArray = (array, numberOfSample = 1) => {
  let size = array.length
  let sampleNumber = size < numberOfSample ? size : numberOfSample
  let returnArray = []

  if (size === sampleNumber) {
    return array
  }

  for (var i = 0; i < sampleNumber; i++) {
    let index = Math.floor(Math.random() * (array.length - 1))
    returnArray.push(array[index])
    array.splice(index, 1)
  }
  console.log(returnArray)
}
