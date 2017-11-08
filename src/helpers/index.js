import { isEmpty } from 'lodash'
import { Loading, QSpinnerFacebook } from 'quasar'
import { Popup } from './toasterConfig'
import moment from 'moment'

export const setHttpToken = token => {
  if (window.axios == null) {
    window.axios = require('axios')
  }
  if (isEmpty(token)) {
    window.axios.defaults.headers.common['Authorization'] = null
  }
  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const showLoadingScreen = (text) => {
  Loading.show({
    spinner: QSpinnerFacebook,
    spinnerSize: 250,
    spinnerColor: 'white',
    message: text
  })
}

export const hideLoadingScreen = () => {
  Loading.hide()
}

export const showPopup = (message, type) => {
  return new Popup(message, type)
}

// Az értékeket jelenítjük meg - 'de-DE' = . szeparátor
// A stylust a BaseLayoutban állítjuk
export const currencyFormat = value => {
  return '<span class="price">' + new Intl.NumberFormat('de-DE').format(value).replace('.', ' ') + '<span class="currencyFormat"> Ft</span></span>'
}

export const salePrice = (prodPrice, percent) => {
  return Math.round(prodPrice * (100 - percent) / 100)
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

export const restaurantIsOpen = (weekDay, openHours) => {
  let format = 'HH:mm'
  let now = moment()
  return now.isBetween(moment(openHours[weekDay].from, format), moment(openHours[weekDay].to, format))
}

export const week = () => {
  return [
    'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'
  ]
}

// Ha át akarunk alakítani egy kapott adathalmazt a q-select számára
export const convertDataToSelect = (data, labelName, valueName) => {
  return data.map(item => {
    return {
      label: item[labelName],
      value: item[valueName]
    }
  })
}
